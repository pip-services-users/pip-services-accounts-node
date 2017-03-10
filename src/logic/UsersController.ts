let _ = require('lodash');
let async = require('async');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';
import { NotFoundError } from 'pip-services-runtime-node';
import { BadRequestError } from 'pip-services-runtime-node';

import { IUsersPersistence } from '../persistence/IUsersPersistence';
import { IUsersBusinessLogic } from './IUsersBusinessLogic';
import { UsersCommandSet } from './UsersCommandSet';

import { Version1 as ActivitiesV1 } from 'pip-clients-activities-node';

export class UsersController extends AbstractController implements IUsersBusinessLogic {
	/**
	 * Unique descriptor for the UsersController component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Controllers, "pip-services-users", "*", "*"
	);
    
    private EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	private _db: IUsersPersistence;
    protected _activities: ActivitiesV1.IActivitiesClient;
    
    constructor() {
        super(UsersController.Descriptor);
    }

    public link(components: ComponentSet): void {
        // Locate reference to users persistence component
        this._db = <IUsersPersistence>components.getOneRequired(
        	new ComponentDescriptor(Category.Persistence, "pip-services-users", '*', '*')
    	);
        
        this._activities = <ActivitiesV1.IActivitiesClient>components.getOneOptional(
        	new ComponentDescriptor(Category.Clients, "pip-services-activities", '*', '1.0')
    	);

        super.link(components);

        // Add commands
        let commands = new UsersCommandSet(this);
        this.addCommandSet(commands);
    }
    
    protected readUser(correlationId: string, userId: string, email: string, callback) {
        this._db.getUserByIdOrEmail(
            correlationId,
            userId,
            email,
            (err, item) => {
                if (item == null && err == null) {
                    err = new NotFoundError(
                        this, 'UserNotFound', 'User ' + (email || userId) +  ' was not found')
                        .withDetails(email || userId);
                }
                callback(err, item);
            }
        );
    }
     
    protected logActivity(correlationId: string, activity: any) {
        if (this._activities) {
            this._activities.logPartyActivity(
                correlationId,
                activity,
                (err) => {
                    if (err) this.error('Failed while logging user activity', err);
                }
            );
        }
    }
    
    public getUsers(correlationId: string, filter: FilterParams, paging: PagingParams, callback) {
        this._db.getUsers(correlationId, filter, paging, callback);
    }   

    public findUser(correlationId: string, userId: string, email: string, callback) {
        this._db.getUserByIdOrEmail(correlationId, userId, email, callback);
    }   

    public getUserById(correlationId: string, userId: string, callback) {
        this._db.getUserById(correlationId, userId, callback);
    }   

    private validateUser(user, callback) {
        if (user.email == null) {
            callback(new BadRequestError(this, 'NoUserEmail', 'Missing user primary email'));
            return false;
        }

        if (!this.EMAIL_REGEX.test(user.email)) {
            callback(new BadRequestError(this, 'WrongUserEmail', 'Invalid user primary email').withDetails(user.email));
            return false;
        }

        if (user.name == null) {
            callback(new BadRequestError(this, 'NoUserName', 'Missing user name'));
            return false;
        }

        return true;
    }

    public createUser(correlationId: string, user: any, callback) {
        let newUser = _.pick(user, 'id', 'name', 'email', 
            'time_zone', 'language', 'theme', 'custom_hdr', 'custom_dat'
        );
        let createdUser;

        // Validate user
        if (!this.validateUser(newUser, callback))
            return;

        async.series([
        // Verify if email already registered
            (callback) => {
                this._db.getUserByEmail(
                    correlationId,
                    newUser.email,
                    (err, data) => {
                        if (data) {
                            callback(
                                new BadRequestError(
                                    this, 
                                    'EmailAlreadyRegistered', 
                                    'Email ' + data.email + ' is already registered'
                                ).withDetails(data.email)
                            );
                            return;
                        }
                        callback();
                    }
                );
            },
        // Create user object
            (callback) => {                
                this._db.createUser(
                    correlationId,
                    newUser, 
                    (err, data) => {
                        createdUser = data;
                        callback(err);
                    }
                );
            }
        ], (err) => {
            callback(err, createdUser);
        });
    }

    public renameUser(correlationId: string, userId: string, newEmail: string, newName: string, callback) {
        let user: any = {};
        
        if (newEmail) user.email = newEmail;
        if (newName) user.name = newName;
        
        this.updateUser(
            correlationId,
            userId,
            user,
            callback
        );
    }

    public updateUser(correlationId: string, userId: string, user: any, callback) {
        let newUser = _.pick(user,
            'name', 'email', 'language', 'time_zone', 'theme', 'active'
        );
        let oldUser, updatedUser;

        async.series([
        // Verify if email already registered
            (callback) => {
                this._db.getUserByEmail(
                    correlationId,
                    newUser.email,
                    (err, data) => {
                        if (data && data.id != userId) {
                            callback(
                                new BadRequestError(
                                    this, 
                                    'EmailAlreadyRegistered', 
                                    'Email ' + newUser.email + ' is already registered'
                                ).withDetails(newUser.email)
                            );
                            return;
                        }
                        
                        if (data && data.id == userId)
                            oldUser = data;

                        callback();
                    }
                );
            },
        // Get the user
            (callback) => {
                if (oldUser) {
                    callback();
                    return;
                }
                
                this._db.getUserById(
                    correlationId,
                    userId, 
                    (err, data) => {
                        oldUser = data;
                        if (oldUser == null && err == null) {
                            err = new NotFoundError(
                                this, 
                                'UserNotFound', 
                                'User ' + userId + ' was not found'
                            ).withDetails(userId);
                        }
                        callback(err);
                    }
                );
            },
        // Change name and other fields and save
            (callback) => {
                updatedUser = _.assign(oldUser, newUser);

                this._db.updateUser(
                    correlationId,
                    userId,
                    updatedUser,
                    callback
                );
            },
            // Log activity
            (callback) => {
                this.logActivity(
                    correlationId,
                    {
                        type: 'settings changed',
                        party: updatedUser
                    }
                );

                callback();
            }
        ], (err) => {
            callback(err, updatedUser);
        });
    }

    public deleteUser(correlationId: string, userId: string, callback) {
        this._db.deleteUser(correlationId, userId, callback);
    }   
        
}

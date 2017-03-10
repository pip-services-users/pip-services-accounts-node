let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';
import { IUsersPersistence } from './IUsersPersistence';

export class UsersMongoDbPersistence extends MongoDbPersistence implements IUsersPersistence {
	/**
	 * Unique descriptor for the UsersMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-users", "mongodb", "*"
	);

    constructor() {
        super(UsersMongoDbPersistence.Descriptor, require('./UserModel'));
    }

    public getUsers(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let filterParams = filter || new FilterParams();

        let criteria = _.pick(filterParams, 'email', 'name');

        // Process search keyword
        if (filterParams.has('search')) {
            let search = filterParams.get('search');
            let searchRegex = new RegExp(search, 'i');

            criteria.$or = [
                { name: { $regex: searchRegex} },
                { email: { $regex: searchRegex} }
            ];
        }

        // Process active keyword
        if (filterParams.has('active'))
            criteria.active = filterParams.getBoolean('active');
        
        this.getPage(criteria, paging, '-created', { custom_dat: 0, email_config: 0 }, callback); 
    }

    public getUserById(correlationId: string, userId: string, callback: any) {
        this.getById(userId, callback);
    }

    public getUserByEmail(correlationId: string, email: string, callback: any) {
        this._model.findOne(
            {
                email: email
            }, 
            (err, items) => {
                items = this._converter(items);
                callback(err, items);
            }
        );
    }

    public getUserByIdOrEmail(correlationId: string, userId: string, email: string, callback: any) {
        let criteria: any = {};

        if (userId) criteria._id = userId;
        if (email) criteria.email = email;

        this._model.findOne(
            criteria, 
            (err, items) => {
                items = this._converter(items);
                callback(err, items);
            }
        );
    }

    public createUser(correlationId: string, user: any, callback: any) {
        let item = _.omit(user, '_id');            

        item._id = user.id || this.createUuid();
        item.active = true;
        item.created = new Date();

        this.create(item, callback);
    }

    public updateUser(correlationId: string, userId: string, user: any, callback: any) {
        user = _.omit(user, '_id');            
        this.update(userId, user, callback);
    }

    public deleteUser(userId: string, callback) {
        this.delete(userId, callback);
    }

}

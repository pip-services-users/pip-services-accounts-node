let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { Converter } from 'pip-services-runtime-node';

import { IUsersPersistence } from './IUsersPersistence';

export class UsersFilePersistence extends FilePersistence implements IUsersPersistence {
	/**
	 * Unique descriptor for the UsersFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-users", "file", "*"
	);
    
    constructor(descriptor?: ComponentDescriptor) {
        super(descriptor || UsersFilePersistence.Descriptor);
    }
    
    private validateUser(item) {
        return _.pick(item, 'id', 'name', 'email',  
            'created', 'active', 'time_zone', 'language', 'theme', 'custom_hdr', 'custom_dat');
    }        
        
    public getUsers(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let filterParams = <any>filter || {};

        let email = filterParams.email;
        let name = filterParams.name;
        let active = Converter.toBoolean(filterParams.active);
        let search = filterParams.search ? new RegExp(filterParams.search, 'i') : null;
                
        let filterFunc = (item) => {
            if (filterParams.email && email != item.email) 
                return false;
            if (filterParams.name && name != item.name) 
                return false;
            if (filterParams.active && active != item.active) 
                return false;
            if (filterParams.search && !search.test(item.email) && !search.test(item.name)) 
                return false;
                
            return true; 
        };

        this.getPage(filterFunc, paging, null, null, callback);
    }

    public getUserById(correlationId: string, userId: string, callback: any) {
        this.getById(userId, (err, item) => {
            if (err) callback(err);
            else {
                callback(null, item);
            }
        });
    }

    public getUserByEmail(correlationId: string, email: string, callback: any) {
        let item = _.find(
            this._items, 
            (item) => item.email == email
        );
        
        callback(null, item); 
    }

    public getUserByIdOrEmail(correlationId: string, userId: string, email: string, callback: any) {
        let item = _.find(
            this._items, 
            (item) => item.id == userId || item.email == email
        );
        
        callback(null, item); 
    }

    public createUser(correlationId: string, user: any, callback: any) {
        let item = this.validateUser(user);

        item.id = user.id || this.createUuid();
        item.active = true;
        item.created = new Date();

        this.create(item, callback);
    }

    public updateUser(correlationId: string, userId: string, user: any, callback: any) {
        user = this.validateUser(user);
        user = _.omit(user, 'id');
        
        this.getById(userId, (err, item) => {
            if (err || item == null) {
                callback(err, null);
                return;
            } 
            
            _.assign(item, user);
            
            this.save((err) => {
                 if (err) callback(err);
                 else callback(null, item);
            });
        });
    }

    public deleteUser(correlationId: string, userId: string, callback) {
        this.delete(userId, callback);
    }
}

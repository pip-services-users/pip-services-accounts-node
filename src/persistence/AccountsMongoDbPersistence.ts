let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { AccountV1 } from '../data/version1/AccountV1';
import { IAccountsPersistence } from './IAccountsPersistence';

export class AccountsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<AccountV1, string> 
    implements IAccountsPersistence {

    constructor() {
        super('accounts');
        super.ensureIndex({ login: 1 }, { unique: true });
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            criteria.push({ "$or": [
                { login: { $regex: searchRegex } },
                { name: { $regex: searchRegex } }
            ]});
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        // Filter ids
        let ids = filter.getAsObject('ids');
        if (_.isString(ids))
            ids = ids.split(',');
        if (_.isArray(ids))
            criteria.push({ _id: { $in: ids } });

        let name = filter.getAsNullableString('name');
        if (name != null)
            criteria.push({ name: name });

        let login = filter.getAsNullableString('login');
        if (login != null)
            criteria.push({ login: login });

        let active = filter.getAsNullableBoolean('active');
        if (active != null)
            criteria.push({ active: active });

        let fromTime = filter.getAsNullableDateTime('from_create_time');
        if (fromTime != null)
            criteria.push({ create_time: { $gte: fromTime } });

        let toTime = filter.getAsNullableDateTime('to_create_time');
        if (toTime != null)
            criteria.push({ create_time: { $lt: toTime } });

        let deleted = filter.getAsBooleanWithDefault('deleted', false);
        if (!deleted)
            criteria.push({ $or: [ { deleted: false }, { deleted: { $exists: false } } ] });
                
        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-create_time', { custom_dat: 0 }, callback);
    }

    public getOneByLogin(correlationId: string, login: string,
        callback: (err: any, item: AccountV1) => void): void {
        this._collection.findOne(
            {
                login: login
            }, 
            (err, item) => {
                if (!err)
                    this._logger.trace(correlationId, "Retrieved from %s with login = %s", this._collection, login);

                item = this.convertToPublic(item);
                callback(err, item);
            }
        );
    }

    public getOneByIdOrLogin(correlationId: string, idOrLogin: string,
        callback: (err: any, item: AccountV1) => void): void {
        this._collection.findOne(
            {
                $or: [
                    { _id: idOrLogin },
                    { login: idOrLogin }
                ]
            }, 
            (err, item) => {
                if (!err)
                    this._logger.trace(correlationId, "Retrieved from %s by %s", this._collection, idOrLogin);

                item = this.convertToPublic(item);
                callback(err, item);
            }
        );
    }

    public create(correlationId: string, item: AccountV1, callback?: (err: any, item: AccountV1) => void): void {
        if (item == null) {
            if (callback) callback(null, null);
            return;
        }

        item = _.clone(item);
        item.active = item.active || true;
        item.create_time = new Date();

        super.create(correlationId, item, callback);
    }

}

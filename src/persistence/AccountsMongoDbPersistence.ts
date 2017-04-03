let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';

import { AccountV1 } from '../data/version1/AccountV1';
import { IAccountsPersistence } from './IAccountsPersistence';
import { AccountsMongoDbSchema } from './AccountsMongoDbSchema';

export class AccountsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<AccountV1, string> 
    implements IAccountsPersistence {

    constructor() {
        super('accounts', AccountsMongoDbSchema());
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            criteria.push({ name: { $regex: searchRegex } });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

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
            criteria.push({ time: { $gte: fromTime } });

        let toTime = filter.getAsNullableDateTime('to_create_time');
        if (toTime != null)
            criteria.push({ time: { $lt: toTime } });

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-create_time', { custom_dat: 0 }, callback);
    }

    public getOneByLogin(correlationId: string, login: string,
        callback: (err: any, item: AccountV1) => void): void {
        this._model.findOne(
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
        this._model.findOne(
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

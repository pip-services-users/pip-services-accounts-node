let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';

import { AccountV1 } from '../data/version1/AccountV1';
import { IAccountsPersistence } from './IAccountsPersistence';
import { GridFSBucketReadStream } from 'mongodb';

export class AccountsCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<AccountV1, string> 
    implements IAccountsPersistence {

    constructor() {
        super('accounts');
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let ids = filter.getAsObject('ids');
        let name = filter.getAsNullableString('name');
        let login = filter.getAsNullableString('login');
        let active = filter.getAsNullableBoolean('active');
        let fromCreateTime = filter.getAsNullableDateTime('from_create_time');
        let toCreateTime = filter.getAsNullableDateTime('to_create_time');
        let deleted = filter.getAsBooleanWithDefault('deleted', false);
        
        // Process ids filter
        if (_.isString(ids))
            ids = ids.split(',');
        if (!_.isArray(ids))
            ids = null;

        let filters: string[] = [];
        if (id != null)
            filters.push("id='" + id + "'");
        if (ids != null)
            filters.push("id IN ['" + ids.join("','") + "']");
        if (name != null)
            filters.push("name='" + name + "'");
        if (login != null)
            filters.push("login='" + login + "'");
        if (active != null)
            filters.push("active=" + (active ? 'TRUE' : 'FALSE'));
        if (search != null)
            filters.push("(name LIKE '%" + search + "%' OR login LIKE '%" + login + "%')");
        if (fromCreateTime != null)
            filters.push("create_time>='" + fromCreateTime + "'");
        if (toCreateTime != null)
            filters.push("create_time<'" + toCreateTime + "'");
        if (!deleted)
            filters.push("(deleted=FALSE or deleted IS MISSING)");

        return filters.length > 0 ? filters.join(" AND ") : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<AccountV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneByLogin(correlationId: string, login: string,
        callback: (err: any, item: AccountV1) => void): void {
        let loginFilter = "login='" + login + "'";
        super.getListByFilter(correlationId, loginFilter, null, null, (err, items) => {
            if (err) {
                callback(err, null);
                return;
            }

            let item = items && items.length > 0 ? items[0] : null;

            if (item != null)
                this._logger.trace(correlationId, "Retrieved item by %s", login);
            else
                this._logger.trace(correlationId, "Cannot find item by %s", login);

            callback(null, item);
        });
    }

    public getOneByIdOrLogin(correlationId: string, idOrLogin: string,
        callback: (err: any, item: AccountV1) => void): void {

        let loginFilter = "id='" + idOrLogin +  "' OR login='" + idOrLogin + "'";
        super.getListByFilter(correlationId, loginFilter, null, null, (err, items) => {
            if (err) {
                callback(err, null);
                return;
            }

            let item = items && items.length > 0 ? items[0] : null;

            if (item != null)
                this._logger.trace(correlationId, "Retrieved item by %s", idOrLogin);
            else
                this._logger.trace(correlationId, "Cannot find item by %s", idOrLogin);

            callback(null, item);
        });
    }

    public create(correlationId: string, item: AccountV1, callback?: (err: any, item: AccountV1) => void): void {
        if (item == null) {
            if (callback) callback(null, null);
            return;
        }

        let loginFilter = "login='" + item.login + "'";
        super.getListByFilter(correlationId, loginFilter, null, null, (err, items) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (items != null && items.length > 0) {
                let err = new BadRequestException(correlationId, 'ALREADY_EXIST', 'User account ' + item.login + ' already exist')
                    .withDetails('login', item.login);
                callback(err, null);
                return;
            }

            item = _.clone(item);
            item.active = item.active || true;
            item.create_time = new Date();

            super.create(correlationId, item, callback);
        });
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class AccountsMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.name, search))
            return true;
        if (this.matchString(item.login, search))
            return true;
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
        return (item) => {
            if (id != null && id != item.id)
                return false;
            if (ids && _.indexOf(ids, item.id) < 0)
                return false;
            if (name != null && name != item.name)
                return false;
            if (login != null && login != item.login)
                return false;
            if (active != null && active != item.active)
                return false;
            if (fromCreateTime != null && item.create_time >= fromCreateTime)
                return false;
            if (toCreateTime != null && item.create_time < toCreateTime)
                return false;
            if (!deleted && item.deleted)
                return false;
            if (search != null && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneByLogin(correlationId, login, callback) {
        let items = this._items.filter((x) => { return x.login == login; });
        let item = items.length > 0 ? items[0] : null;
        if (item != null)
            this._logger.trace(correlationId, "Retrieved item by %s", login);
        else
            this._logger.trace(correlationId, "Cannot find item by %s", login);
        callback(null, item);
    }
    getOneByIdOrLogin(correlationId, idOrLogin, callback) {
        let items = this._items.filter((x) => { return x.id == idOrLogin || x.login == idOrLogin; });
        let item = items.length > 0 ? items[0] : null;
        if (item != null)
            this._logger.trace(correlationId, "Retrieved item by %s", idOrLogin);
        else
            this._logger.trace(correlationId, "Cannot find item by %s", idOrLogin);
        callback(null, item);
    }
    create(correlationId, item, callback) {
        if (item == null) {
            if (callback)
                callback(null, null);
            return;
        }
        let existingItem = _.find(this._items, (x) => x.login == item.login);
        if (existingItem != null) {
            let err = new pip_services3_commons_node_2.BadRequestException(correlationId, 'ALREADY_EXIST', 'User account ' + item.login + ' already exist')
                .withDetails('login', item.login);
            callback(err, null);
        }
        item = _.clone(item);
        item.active = item.active || true;
        item.create_time = new Date();
        super.create(correlationId, item, callback);
    }
}
exports.AccountsMemoryPersistence = AccountsMemoryPersistence;
//# sourceMappingURL=AccountsMemoryPersistence.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_couchbase_node_1 = require("pip-services3-couchbase-node");
class AccountsCouchbasePersistence extends pip_services3_couchbase_node_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('accounts');
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
        let filters = [];
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, 'create_time DESC', null, callback);
    }
    getOneByLogin(correlationId, login, callback) {
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
    getOneByIdOrLogin(correlationId, idOrLogin, callback) {
        let loginFilter = "id='" + idOrLogin + "' OR login='" + idOrLogin + "'";
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
    create(correlationId, item, callback) {
        if (item == null) {
            if (callback)
                callback(null, null);
            return;
        }
        let loginFilter = "login='" + item.login + "'";
        super.getListByFilter(correlationId, loginFilter, null, null, (err, items) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (items != null && items.length > 0) {
                let err = new pip_services3_commons_node_2.BadRequestException(correlationId, 'ALREADY_EXIST', 'User account ' + item.login + ' already exist')
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
exports.AccountsCouchbasePersistence = AccountsCouchbasePersistence;
//# sourceMappingURL=AccountsCouchbasePersistence.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_mongodb_node_1 = require("pip-services-mongodb-node");
const AccountsMongoDbSchema_1 = require("./AccountsMongoDbSchema");
class AccountsMongoDbPersistence extends pip_services_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('accounts', AccountsMongoDbSchema_1.AccountsMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            criteria.push({ "$or": [
                    { login: { $regex: searchRegex } },
                    { name: { $regex: searchRegex } }
                ] });
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
            criteria.push({ time: { $gte: fromTime } });
        let toTime = filter.getAsNullableDateTime('to_create_time');
        if (toTime != null)
            criteria.push({ time: { $lt: toTime } });
        let deleted = filter.getAsBooleanWithDefault('deleted', false);
        if (!deleted)
            criteria.push({ $or: [{ deleted: false }, { deleted: { $exists: false } }] });
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-create_time', { custom_dat: 0 }, callback);
    }
    getOneByLogin(correlationId, login, callback) {
        this._model.findOne({
            login: login
        }, (err, item) => {
            if (!err)
                this._logger.trace(correlationId, "Retrieved from %s with login = %s", this._collection, login);
            item = this.convertToPublic(item);
            callback(err, item);
        });
    }
    getOneByIdOrLogin(correlationId, idOrLogin, callback) {
        this._model.findOne({
            $or: [
                { _id: idOrLogin },
                { login: idOrLogin }
            ]
        }, (err, item) => {
            if (!err)
                this._logger.trace(correlationId, "Retrieved from %s by %s", this._collection, idOrLogin);
            item = this.convertToPublic(item);
            callback(err, item);
        });
    }
    create(correlationId, item, callback) {
        if (item == null) {
            if (callback)
                callback(null, null);
            return;
        }
        item = _.clone(item);
        item.active = item.active || true;
        item.create_time = new Date();
        super.create(correlationId, item, callback);
    }
}
exports.AccountsMongoDbPersistence = AccountsMongoDbPersistence;
//# sourceMappingURL=AccountsMongoDbPersistence.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsGrpcConverterV1 = void 0;
let _ = require('lodash');
let messages = require('../../../../src/protos/accounts_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
class AccountsGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_node_4.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        AccountsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: AccountsGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_node_5.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (_.isFunction(values.toObject))
            values = values.toObject();
        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (_.isFunction(map.set)) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        AccountsGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_node_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromAccount(account) {
        if (account == null)
            return null;
        let obj = new messages.Account();
        obj.setId(account.id);
        obj.setLogin(account.login);
        obj.setName(account.name);
        obj.setAbout(account.about);
        obj.setCreateTime(pip_services3_commons_node_2.StringConverter.toString(account.create_time));
        obj.setDeleted(account.deleted);
        obj.setActive(account.active);
        obj.setTimeZone(account.time_zone);
        obj.setLanguage(account.language);
        obj.setTheme(account.theme);
        obj.setCustomHdr(AccountsGrpcConverterV1.toJson(account.custom_hdr));
        obj.setCustomDat(AccountsGrpcConverterV1.toJson(account.custom_dat));
        return obj;
    }
    static toAccount(obj) {
        if (obj == null)
            return null;
        let account = {
            id: obj.getId(),
            login: obj.getLogin(),
            name: obj.getName(),
            about: obj.getAbout(),
            create_time: pip_services3_commons_node_3.DateTimeConverter.toDateTime(obj.getCreateTime()),
            deleted: obj.getDeleted(),
            active: obj.getActive(),
            time_zone: obj.getTimeZone(),
            language: obj.getLanguage(),
            theme: obj.getTheme(),
            custom_hdr: AccountsGrpcConverterV1.fromJson(obj.getCustomHdr()),
            custom_dat: AccountsGrpcConverterV1.fromJson(obj.getCustomDat())
        };
        return account;
    }
    static fromAccountPage(page) {
        if (page == null)
            return null;
        let obj = new messages.AccountPage();
        obj.setTotal(page.total);
        let data = _.map(page.data, AccountsGrpcConverterV1.fromAccount);
        obj.setDataList(data);
        return obj;
    }
    static toAccountPage(obj) {
        if (obj == null)
            return null;
        let data = _.map(obj.getDataList(), AccountsGrpcConverterV1.toAccount);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.AccountsGrpcConverterV1 = AccountsGrpcConverterV1;
//# sourceMappingURL=AccountsGrpcConverterV1.js.map
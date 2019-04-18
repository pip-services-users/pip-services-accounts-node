let _ = require('lodash');
let messages = require('../../../../src/protos/accounts_v1_pb');

import { DataPage } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';
import { ErrorDescriptionFactory } from 'pip-services-commons-node';
import { ErrorDescription } from 'pip-services-commons-node';
import { ApplicationExceptionFactory } from 'pip-services-commons-node';

import { AccountV1 } from '../../data/version1/AccountV1';

export class AccountGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();

        obj.getType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        AccountGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);

        return obj;
    }

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: AccountGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        for (let propName in values) {
            if (values.hasOwnProperty(propName))
                map[propName] = values[propName];
        }
    }

    public static getMap(map: any): any {
        let values = {};
        AccountGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromAccount(account: AccountV1): any {
        if (account == null) return null;

        let obj = new messages.Account();

        obj.setId(account.id);
        obj.setLogin(account.login);
        obj.setName(account.name);
        obj.setAbout(account.about);

        obj.setCreateTime(StringConverter.toString(account.create_time))
        obj.setDeleted(account.deleted);
        obj.setActive(account.active);
        
        obj.setTimeZone(account.time_zone);
        obj.setLanguage(account.language);
        obj.setTheme(account.theme);

        obj.setCustomHdr(AccountGrpcConverterV1.toJson(account.custom_hdr));
        obj.setCustomDat(AccountGrpcConverterV1.toJson(account.custom_dat));

        return obj;
    }

    public static toAccount(obj: any): AccountV1 {
        let account: AccountV1 = {
            id: obj.getId(),
            login: obj.getLogin(),
            name: obj.getName(),
            about: obj.getAbout(),
            create_time: DateTimeConverter.toDateTime(obj.getCreateTime()),
            deleted: obj.getDeleted(),
            active: obj.getActive(),
            time_zone: obj.getTimeZone(),
            language: obj.getLanguage(),
            theme: obj.getTheme(),
            custom_hdr: AccountGrpcConverterV1.fromJson(obj.getCustomHdr()),
            custom_dat: AccountGrpcConverterV1.fromJson(obj.getCustomDat())
        };

        return account;
    }

    public static fromAccountPage(page: DataPage<AccountV1>): any {
        if (page == null) return null;

        let obj = new messages.AccountPage();

        obj.setTotal(page.total);
        let data = _.map(page.data, AccountGrpcConverterV1.fromAccount);
        obj.setDataList(data);

        return obj;
    }

    public static toAccountPage(obj: any): DataPage<AccountV1> {
        if (obj == null) return null;

        let data = _.map(obj.getDataList(), AccountGrpcConverterV1.toAccount);
        let page: DataPage<AccountV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }

}
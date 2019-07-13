import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';
import { AccountV1 } from '../data/version1/AccountV1';
import { IAccountsPersistence } from './IAccountsPersistence';
export declare class AccountsCouchbasePersistence extends IdentifiableCouchbasePersistence<AccountV1, string> implements IAccountsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<AccountV1>) => void): void;
    getOneByLogin(correlationId: string, login: string, callback: (err: any, item: AccountV1) => void): void;
    getOneByIdOrLogin(correlationId: string, idOrLogin: string, callback: (err: any, item: AccountV1) => void): void;
    create(correlationId: string, item: AccountV1, callback?: (err: any, item: AccountV1) => void): void;
}

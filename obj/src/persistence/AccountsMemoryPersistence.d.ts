import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { AccountV1 } from '../data/version1/AccountV1';
import { IAccountsPersistence } from './IAccountsPersistence';
export declare class AccountsMemoryPersistence extends IdentifiableMemoryPersistence<AccountV1, string> implements IAccountsPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<AccountV1>) => void): void;
    getOneByLogin(correlationId: string, login: string, callback: (err: any, item: AccountV1) => void): void;
    getOneByIdOrLogin(correlationId: string, idOrLogin: string, callback: (err: any, item: AccountV1) => void): void;
    create(correlationId: string, item: AccountV1, callback?: (err: any, item: AccountV1) => void): void;
}

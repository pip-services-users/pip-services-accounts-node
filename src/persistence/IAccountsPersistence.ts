import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { AccountV1 } from '../data/version1/AccountV1';

export interface IAccountsPersistence extends IGetter<AccountV1, string>, IWriter<AccountV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<AccountV1>) => void): void;

    getOneById(correlationId: string, id: string,
        callback: (err: any, item: AccountV1) => void): void;

    getOneByLogin(correlationId: string, login: string,
        callback: (err: any, item: AccountV1) => void): void;

    getOneByIdOrLogin(correlationId: string, idOrLogin: string,
        callback: (err: any, item: AccountV1) => void): void;

    create(correlationId: string, user: AccountV1,
        callback: (err: any, item: AccountV1) => void): void;

    update(correlationId: string, user: AccountV1,
        callback: (err: any, item: AccountV1) => void): void;

    deleteById(correlationId: string, userId: string,
        callback: (err: any, item: AccountV1) => void): void;
}

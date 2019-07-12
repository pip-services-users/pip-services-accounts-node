import { DataPage } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { AccountV1 } from '../../data/version1/AccountV1';
export declare class AccountGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
<<<<<<< HEAD
    private static toJson;
    private static fromJson;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
=======
    private static toJson(value);
    private static fromJson(value);
>>>>>>> 47b7a62324bf4a9b54a4f4ad95349fdf7296ea10
    static fromAccount(account: AccountV1): any;
    static toAccount(obj: any): AccountV1;
    static fromAccountPage(page: DataPage<AccountV1>): any;
    static toAccountPage(obj: any): DataPage<AccountV1>;
}

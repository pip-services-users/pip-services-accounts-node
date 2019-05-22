import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class AccountsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getAccounts(call, callback);
    private getAccountById(call, callback);
    private getAccountByLogin(call, callback);
    private getAccountByIdOrLogin(call, callback);
    private createAccount(call, callback);
    private updateAccount(call, callback);
    private deleteAccountById(call, callback);
    register(): void;
}

import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class AccountsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getAccounts;
    private getAccountById;
    private getAccountByLogin;
    private getAccountByIdOrLogin;
    private createAccount;
    private updateAccount;
    private deleteAccountById;
    register(): void;
}

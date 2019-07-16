let _ = require('lodash');
let services = require('../../../../src/protos/accounts_v1_grpc_pb');
let messages = require('../../../../src/protos/accounts_v1_pb');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { AccountV1 } from '../../data/version1/AccountV1';
import { AccountV1Schema } from '../../data/version1/AccountV1Schema';
import { IAccountsController } from '../../logic/IAccountsController';
import { AccountsGrpcConverterV1 } from './AccountsGrpcConverterV1';

export class AccountsGrpcServiceV1 extends GrpcService {
    private _controller: IAccountsController;
	
    public constructor() {
        super(services.AccountsService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-accounts", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IAccountsController>('controller');
    }
    
    private getAccounts(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        AccountsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = AccountsGrpcConverterV1.toPagingParams(call.request.getPaging());

        this._controller.getAccounts(
            correlationId,
            filter,
            paging,
            (err, result) => {
                let error = AccountsGrpcConverterV1.fromError(err);
                let page = err == null ? AccountsGrpcConverterV1.fromAccountPage(result) : null;

                let response = new messages.AccountPageReply();
                response.setError(error);
                response.setPage(page);

                callback(err, response);
            }
        );
    }

    private getAccountById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let accountId = call.request.getAccountId();

        this._controller.getAccountById(
            correlationId,
            accountId,
            (err, result) => {
                let error = AccountsGrpcConverterV1.fromError(err);
                let account = err == null ? AccountsGrpcConverterV1.fromAccount(result) : null;

                let response = new messages.AccountObjectReply();
                response.setError(error);
                response.setAccount(account);

                callback(err, response);
            }
        );
    }

    private getAccountByLogin(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let login = call.request.getLogin();

        this._controller.getAccountByLogin(
            correlationId,
            login,
            (err, result) => {
                let error = AccountsGrpcConverterV1.fromError(err);
                let account = err == null ? AccountsGrpcConverterV1.fromAccount(result) : null;

                let response = new messages.AccountObjectReply();
                response.setError(error);
                if (result)
                    response.setAccount(account);

                callback(err, response);
            }
        );
    }

    private getAccountByIdOrLogin(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let login = call.request.getLogin();

        this._controller.getAccountByIdOrLogin(
            correlationId,
            login,
            (err, result) => {
                let error = AccountsGrpcConverterV1.fromError(err);
                let account = err == null ? AccountsGrpcConverterV1.fromAccount(result) : null;

                let response = new messages.AccountObjectReply();
                response.setError(error);
                if (result)
                    response.setAccount(account);

                callback(err, response);
            }
        );
    }
    
    private createAccount(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let account = AccountsGrpcConverterV1.toAccount(call.request.getAccount());

        this._controller.createAccount(
            correlationId,
            account,
            (err, result) => {
                let error = AccountsGrpcConverterV1.fromError(err);
                let account = err == null ? AccountsGrpcConverterV1.fromAccount(result) : null;

                let response = new messages.AccountObjectReply();
                response.setError(error);
                if (result)
                    response.setAccount(account);

                callback(err, response);
            }
        );
    }

    private updateAccount(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let account = AccountsGrpcConverterV1.toAccount(call.request.getAccount());

        this._controller.updateAccount(
            correlationId,
            account,
            (err, result) => {
                let error = AccountsGrpcConverterV1.fromError(err);
                let account = err == null ? AccountsGrpcConverterV1.fromAccount(result) : null;

                let response = new messages.AccountObjectReply();
                response.setError(error);
                if (result)
                    response.setAccount(account);

                callback(err, response);
            }
        );
    }

    private deleteAccountById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let accountId = call.request.getAccountId();

        this._controller.deleteAccountById(
            correlationId,
            accountId,
            (err, result) => {
                let error = AccountsGrpcConverterV1.fromError(err);
                let account = err == null ? AccountsGrpcConverterV1.fromAccount(result) : null;

                let response = new messages.AccountObjectReply();
                response.setError(error);
                if (result)
                    response.setAccount(account);

                callback(err, response);
            }
        );
    }    
        
    public register() {
        this.registerMethod(
            'get_accounts', 
            null,
            this.getAccounts
        );

        this.registerMethod(
            'get_account_by_id', 
            null,
            this.getAccountById
        );

        this.registerMethod(
            'get_account_by_login', 
            null,
            this.getAccountByLogin
        );

        this.registerMethod(
            'get_account_by_id_or_login', 
            null,
            this.getAccountByIdOrLogin
        );

        this.registerMethod(
            'create_account', 
            null,
            this.createAccount
        );

        this.registerMethod(
            'update_account', 
            null,
            this.updateAccount
        );

        this.registerMethod(
            'delete_account_by_id',
            null, 
            this.deleteAccountById
        );
    }
}

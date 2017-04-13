import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

import { AccountV1Schema } from '../data/version1/AccountV1Schema';
import { IAccountsBusinessLogic } from './IAccountsBusinessLogic';

export class AccountsCommandSet extends CommandSet {
    private _logic: IAccountsBusinessLogic;

    constructor(logic: IAccountsBusinessLogic) {
        super();

        this._logic = logic;

        // Register commands to the business logic
		this.addCommand(this.makeGetAccountsCommand());
		this.addCommand(this.makeGetAccountByIdCommand());
		this.addCommand(this.makeGetAccountByLoginCommand());
		this.addCommand(this.makeGetAccountByIdOrLoginCommand());
		this.addCommand(this.makeCreateAccountCommand());
		this.addCommand(this.makeUpdateAccountCommand());
		this.addCommand(this.makeDeleteAccountByIdCommand());
    }

	private makeGetAccountsCommand(): ICommand {
		return new Command(
			"get_accounts",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getAccounts(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetAccountByIdCommand(): ICommand {
		return new Command(
			"get_account_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('account_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let accountId = args.getAsNullableString("account_id");
                this._logic.getAccountById(correlationId, accountId, callback);
            }
		);
	}

	private makeGetAccountByLoginCommand(): ICommand {
		return new Command(
			"get_account_by_login",
			new ObjectSchema(true)
				.withRequiredProperty('login', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let accountId = args.getAsNullableString("login");
                this._logic.getAccountByLogin(correlationId, accountId, callback);
            }
		);
	}

	private makeGetAccountByIdOrLoginCommand(): ICommand {
		return new Command(
			"get_account_by_id_or_login",
			new ObjectSchema(true)
				.withRequiredProperty('id_or_login', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let idOrLogin = args.getAsNullableString("id_or_login");
                this._logic.getAccountByIdOrLogin(correlationId, idOrLogin, callback);
            }
		);
	}

	private makeCreateAccountCommand(): ICommand {
		return new Command(
			"create_account",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let account = args.get("account");
                this._logic.createAccount(correlationId, account, callback);
            }
		);
	}

	private makeUpdateAccountCommand(): ICommand {
		return new Command(
			"update_account",
			new ObjectSchema(true)
				.withRequiredProperty('account', new AccountV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let account = args.get("account");
                this._logic.updateAccount(correlationId, account, callback);
            }
		);
	}
	
	private makeDeleteAccountByIdCommand(): ICommand {
		return new Command(
			"delete_account_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('account_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let accountId = args.getAsNullableString("account_id");
                this._logic.deleteAccountById(correlationId, accountId, callback);
			}
		);
	}

}
import { CommandSet } from 'pip-services3-commons-node';
import { IAccountsController } from './IAccountsController';
export declare class AccountsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IAccountsController);
    private makeGetAccountsCommand;
    private makeGetAccountByIdCommand;
    private makeGetAccountByLoginCommand;
    private makeGetAccountByIdOrLoginCommand;
    private makeCreateAccountCommand;
    private makeUpdateAccountCommand;
    private makeDeleteAccountByIdCommand;
}

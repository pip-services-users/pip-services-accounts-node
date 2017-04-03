import { CommandSet } from 'pip-services-commons-node';
import { IAccountsBusinessLogic } from './IAccountsBusinessLogic';
export declare class AccountsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IAccountsBusinessLogic);
    private makeGetAccountsCommand();
    private makeGetAccountByIdCommand();
    private makeGetAccountByLoginCommand();
    private makeGetAccountByIdOrLoginCommand();
    private makeCreateAccountCommand();
    private makeUpdateAccountCommand();
    private makeDeleteAccountByIdCommand();
}

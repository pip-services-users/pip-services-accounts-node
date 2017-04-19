import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { AccountsServiceFactory } from '../build/AccountsServiceFactory';

export class AccountsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("accounts", "User accounts function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-accounts', 'controller', 'default', '*', '*'));
        this._factories.add(new AccountsServiceFactory());
    }
}

export const handler = new AccountsLambdaFunction().getHandler();
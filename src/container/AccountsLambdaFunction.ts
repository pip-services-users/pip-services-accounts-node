import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { AccountsFactory } from '../build/AccountsFactory';

export class AccountsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("accounts", "User accounts function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-accounts', 'controller', 'default', '*', '*'));
        this._factories.add(new AccountsFactory());
    }
}

export const handler = new AccountsLambdaFunction().getHandler();
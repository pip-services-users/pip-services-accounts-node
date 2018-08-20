import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { AccountsServiceFactory } from '../build/AccountsServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class AccountsProcess extends ProcessContainer {

    public constructor() {
        super("accounts", "User accounts microservice");
        this._factories.add(new AccountsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}

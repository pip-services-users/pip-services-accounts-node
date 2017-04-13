import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { AccountsFactory } from '../build/AccountsFactory';

export class AccountsProcess extends ProcessContainer {

    public constructor() {
        super("accounts", "User accounts microservice");
        this._factories.add(new AccountsFactory);
    }

}

import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { AccountsFactory } from '../build/AccountsFactory';

export class AccountsProcess extends ProcessContainer {

    protected initReferences(references: IReferences): void {
        super.initReferences(references);

        // Factory to statically resolve Accounts components
        references.put(AccountsFactory.Descriptor, new AccountsFactory());
    }

    public runWithArguments(args: string[]): void {
        return this.runWithArgumentsOrConfigFile("accounts", args, "./config/config.yaml");
    }

}

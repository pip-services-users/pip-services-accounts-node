import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { AccountsMemoryPersistence } from './AccountsMemoryPersistence';
import { AccountV1 } from '../data/version1/AccountV1';
export declare class AccountsFilePersistence extends AccountsMemoryPersistence {
    protected _persister: JsonFilePersister<AccountV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}

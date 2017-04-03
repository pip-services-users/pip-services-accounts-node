import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';

import { AccountsMemoryPersistence } from './AccountsMemoryPersistence';
import { AccountV1 } from '../data/version1/AccountV1';

export class AccountsFilePersistence extends AccountsMemoryPersistence {
	protected _persister: JsonFilePersister<AccountV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<AccountV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}
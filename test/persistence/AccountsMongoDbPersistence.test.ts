import { YamlConfigReader } from 'pip-services-commons-node';

import { AccountsMongoDbPersistence } from '../../src/persistence/AccountsMongoDbPersistence';
import { AccountsPersistenceFixture } from './AccountsPersistenceFixture';

suite('AccountsMongoDbPersistence', ()=> {
    let persistence: AccountsMongoDbPersistence;
    let fixture: AccountsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml');
        let dbConfig = config.getSection('mongodb');

        persistence = new AccountsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new AccountsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});
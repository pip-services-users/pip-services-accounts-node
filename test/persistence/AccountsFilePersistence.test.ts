import { ConfigParams } from 'pip-services3-commons-node';

import { AccountsFilePersistence } from '../../src/persistence/AccountsFilePersistence';
import { AccountsPersistenceFixture } from './AccountsPersistenceFixture';

suite('AccountsFilePersistence', ()=> {
    let persistence: AccountsFilePersistence;
    let fixture: AccountsPersistenceFixture;
    
    setup((done) => {
        persistence = new AccountsFilePersistence('./data/accounts.test.json');

        fixture = new AccountsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });
});
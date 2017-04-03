import { AccountsMemoryPersistence } from '../../src/persistence/AccountsMemoryPersistence';
import { AccountsPersistenceFixture } from './AccountsPersistenceFixture';

suite('AccountsMemoryPersistence', ()=> {
    let persistence: AccountsMemoryPersistence;
    let fixture: AccountsPersistenceFixture;
    
    setup((done) => {
        persistence = new AccountsMemoryPersistence();
        fixture = new AccountsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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
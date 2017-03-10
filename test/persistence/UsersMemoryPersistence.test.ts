import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { UsersMemoryPersistence } from '../../src/persistence/UsersMemoryPersistence';
import { UsersPersistenceFixture } from './UsersPersistenceFixture';

suite('UsersFilePersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new UsersMemoryPersistence();
        db.configure(new ComponentConfig());
        
        fixture = new UsersPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done);
    });
    
    teardown((done) => {
        db.close(done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});
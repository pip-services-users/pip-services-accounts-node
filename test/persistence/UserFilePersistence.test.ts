import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { UsersFilePersistence } from '../../src/persistence/UsersFilePersistence';
import { UsersPersistenceFixture } from './UsersPersistenceFixture';

let config = ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/users.test.json',
        data: []
    }
});

suite('UsersFilePersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new UsersFilePersistence();
        db.configure(config);

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
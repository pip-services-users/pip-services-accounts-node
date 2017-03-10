import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { UsersMongoDbPersistence } from '../../src/persistence/UsersMongoDbPersistence';
import { UsersPersistenceFixture } from './UsersPersistenceFixture';

let options = new DynamicMap(require('../../../config/config'));
let dbOptions = ComponentConfig.fromValue(options.getNullableMap('persistence'));

suite('UsersMongoDbPersistence', ()=> {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return; 
    
    let db = new UsersMongoDbPersistence();
    db.configure(dbOptions);

    let fixture = new UsersPersistenceFixture(db);

    suiteSetup((done) => {
        db.link(new ComponentSet());
        db.open(done);
    });
    
    suiteTeardown((done) => {
        db.close(done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});
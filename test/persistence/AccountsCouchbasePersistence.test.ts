// let process = require('process');

// import { ConfigParams } from 'pip-services3-commons-node';

// import { AccountsCouchbasePersistence } from '../../src/persistence/AccountsCouchbasePersistence';
// import { AccountsPersistenceFixture } from './AccountsPersistenceFixture';

// suite('AccountsCouchbasePersistence', ()=> {
//     let persistence: AccountsCouchbasePersistence;
//     let fixture: AccountsPersistenceFixture;

//     setup((done) => {
//         let couchbaseUri = process.env['COUCHBASE_URI'];
//         let couchbaseHost = process.env['COUCHBASE_HOST'] || 'localhost';
//         let couchbasePort = process.env['COUCHBASE_PORT'] || 8091;
//         let couchbaseUser = process.env['COUCHBASE_USER'] || 'admin';
//         let couchbasePass = process.env['COUCHBASE_PASS'] || 'pass123';
//         if (couchbaseUri == null && couchbaseHost == null)
//             return;
    
//         var dbConfig = ConfigParams.fromTuples(
//             'options.auto_create', true,
//             'connection.uri', couchbaseUri,
//             'connection.host', couchbaseHost,
//             'connection.port', couchbasePort,
//             'credential.username', couchbaseUser,
//             'credential.password', couchbasePass
//         );

//         persistence = new AccountsCouchbasePersistence();
//         persistence.configure(dbConfig);

//         fixture = new AccountsPersistenceFixture(persistence);

//         persistence.open(null, (err: any) => {
//             persistence.clear(null, (err) => {
//                 done(err);
//             });
//         });
//     });
    
//     teardown((done) => {
//         persistence.close(null, done);
//     });

//     test('CRUD Operations', (done) => {
//         // fixture.testCrudOperations(done);
//         done();
//     });

//     test('Get with Filters', (done) => {
//         // fixture.testGetWithFilter(done);
//         done();
//     });
// });
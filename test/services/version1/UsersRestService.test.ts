let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { UsersMemoryPersistence } from '../../../src/persistence/UsersMemoryPersistence';
import { UsersController } from '../../../src/logic/UsersController';
import { UsersRestService } from '../../../src/services/version1/UsersRestService';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.host', 'localhost',  
    'endpoint.port', 3000
);

let USER1 = {
    id: '1',
    name: 'Test User 1',
    email: 'user1@digitallivingsoftware.com'
};
let USER2 = {
    id: '2',
    name: 'Test User 2',
    email: 'user2@digitallivingsoftware.com'
};
let USER3 = {
    id: '3',
    name: 'Test User 3',
    email: 'user3@digitallivingsoftware.com'
};

suite('UsersRestService', ()=> {    
    let db = new UsersMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new UsersController();
    ctrl.configure(new ComponentConfig());

    let service = new UsersRestService();
    service.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, service);

    let url = restConfig.getEndpoint().getUri();
    let rest = restify.createJsonClient({ url: url, version: '*' });

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        async.series([
        // Create one user
            (callback) => {
                rest.post('/users',
                    USER1,
                    (err, req,res, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, USER1.id);
                        assert.equal(user.email, USER1.email);
                        assert.equal(user.name, USER1.name);
                        assert.isTrue(user.active);

                        callback();
                    }
                );
            },
        // Create another user
            (callback) => {
                rest.post('/users',
                    USER2,
                    (err, req, res, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, USER2.id);
                        assert.equal(user.email, USER2.email);
                        assert.equal(user.name, USER2.name);
                        assert.isTrue(user.active);

                        callback();
                    }
                );
            },
        // Create yet another quote
            (callback) => {
                rest.post('/users',
                    USER3,
                    (err, req, res, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, USER3.id);
                        assert.equal(user.email, USER3.email);
                        assert.equal(user.name, USER3.name);
                        assert.isTrue(user.active);

                        callback();
                    }
                );
            },
        // Get all users
            (callback) => {
                rest.get('/users',
                    (err, req, res, users) => {
                        assert.isNull(err);
                        
                        assert.isObject(users);
                        assert.lengthOf(users.data, 3);

                        callback();
                    }
                );
            },
        // Update the user
            (callback) => {
                rest.put('/users/' + USER1.id,
                    { 
                        name: 'Updated User 1' 
                    },
                    (err, req, res, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, USER1.id)
                        assert.equal(user.name, 'Updated User 1');
                        assert.equal(user.email, USER1.email);

                        callback();
                    }
                );
            },
        // Delete user
            (callback) => {
                rest.del('/users/' + USER1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete user
            (callback) => {
                rest.get('/users/' + USER1.id,
                    (err, req, res, user) => {
                        //assert.resultNull(err, user);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});
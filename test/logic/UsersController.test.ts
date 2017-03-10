let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { UsersMemoryPersistence } from '../../src/persistence/UsersMemoryPersistence';
import { UsersController } from '../../src/logic/UsersController';

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

suite('UsersController', ()=> {    
    let db = new UsersMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new UsersController();
    ctrl.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Create New User', (done) => {
        ctrl.createUser(
            null,
            USER1,
            (err, user) => {
                assert.isNull(err);
                
                assert.isObject(user);
                assert.equal(user.name, USER1.name);
                assert.equal(user.email, USER1.email);

                done();
            }
        );
    });

    test('Fail to Create User with the Same Email', (done) => {
        async.series([
        // Sign up
            (callback) => {
                ctrl.createUser(
                    null,
                    USER1,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);

                        callback();
                    }
                );
            },
        // Try to sign up again
            (callback) => {
                ctrl.createUser(
                    null,
                    USER1,
                    (err, user) => {
                        assert.isNotNull(err);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Get Users', (done) => {
        let user1, user2;

        async.series([
        // Create user #1
            (callback) => {
                ctrl.createUser(
                    null,
                    USER1,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        user1 = user;

                        callback(err, user);
                    }
                );
            },
        // Create user #2
            (callback) => {
                ctrl.createUser(
                    null,
                    USER2,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        user2 = user;

                        callback(err, user);
                    }
                );
            },
        // Get a single user
            (callback) => {
                ctrl.getUserById(
                    null,
                    user1.id,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, user1.id);
                        assert.equal(user.email, user1.email);

                        callback();
                    }
                );
            },
        // Find user by email
            (callback) => {
                ctrl.findUser(
                    null,
                    null,
                    user2.email,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.id, user2.id);
                        assert.equal(user.email, user2.email);

                        callback();
                    }
                );
            },
        // Get all users
            (callback) => {
                ctrl.getUsers(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, users) => {
                        assert.isNull(err);
                        
                        assert.isObject(users);
                        // +3 more predefined users
                        assert.lengthOf(users.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Update User Settings', (done) => {
        let user1;

        async.series([
        // Sign up
            (callback) => {
                ctrl.createUser(
                    null,
                    USER1,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        user1 = user;

                        callback(err, user);
                    }
                );
            },
        // Update user
            (callback) => {
                ctrl.updateUser(
                    null,
                    user1.id,
                    {
                        name: "New Name"
                    },
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.name, "New Name");

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Rename User', (done) => {
        let user1;

        async.series([
        // Sign up
            (callback) => {
                ctrl.createUser(
                    null,
                    USER1,
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        user1 = user;

                        callback(err, user);
                    }
                );
            },
        // Rename user
            (callback) => {
                ctrl.renameUser(
                    null,
                    user1.id,
                    'test@test.com',
                    'New Test Name',
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isObject(user);
                        assert.equal(user.email, 'test@test.com');
                        assert.equal(user.name, 'New Test Name');

                        callback();
                    }
                );
            }
        ], done);
    });
    
});
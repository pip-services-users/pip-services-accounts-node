let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { UsersMemoryPersistence } from '../../../src/persistence/UsersMemoryPersistence';
import { UsersController } from '../../../src/logic/UsersController';
import { UsersSenecaService } from '../../../src/services/version1/UsersSenecaService';

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

suite('UsersSenecaService', ()=> {        
    let db = new UsersMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new UsersController();
    ctrl.configure(new ComponentConfig());

    let service = new UsersSenecaService();
    service.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, service, seneca);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        async.series([
        // Create one user
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'users',
                        cmd: 'create_user',
                        user: USER1
                    },
                    (err, user) => {
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
                seneca.getSeneca().act(
                    {
                        role: 'users',
                        cmd: 'create_user',
                        user: USER2
                    },
                    (err, user) => {
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
                seneca.getSeneca().act(
                    {
                        role: 'users',
                        cmd: 'create_user',
                        user: USER3
                    },
                    (err, user) => {
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
                seneca.getSeneca().act(
                    {
                        role: 'users',
                        cmd: 'get_users',
                        filter: {}
                    },
                    (err, users) => {
                        assert.isNull(err);
                        
                        assert.isObject(users);
                        assert.lengthOf(users.data, 3);

                        callback();
                    }
                );
            },
        // Update the user
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'users',
                        cmd: 'update_user',
                        user_id: USER1.id,
                        user: { name: 'Updated User 1' }
                    },
                    (err, user) => {
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
                seneca.getSeneca().act(
                    {
                        role: 'users',
                        cmd: 'delete_user',
                        user_id: USER1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete user
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'users',
                        cmd: 'get_user_by_id',
                        user_id: USER1.id
                    },
                    (err, user) => {
                        assert.isNull(err);
                        
                        assert.isNull(user || null);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});
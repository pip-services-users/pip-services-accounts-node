let _ = require('lodash');
let assert = require('chai').assert;

import { UsersSenecaPlugin } from '../../src/run/UsersSenecaPlugin';

let buildConfig = {
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};
suite('UsersSenecaPlugin', ()=> {    
    let seneca;
    let plugin = new UsersSenecaPlugin();

    suiteSetup((done) => {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    
    suiteTeardown((done) => {
        seneca.close(done);
    });
                             
    test('Ping', (done) => {
        seneca.act(
            {
                role: 'users',
                cmd: 'get_users' 
            },
            (err, users) => {
                assert.isNull(err);
                assert.isObject(users);                
                done();
            }
        );
    });
});
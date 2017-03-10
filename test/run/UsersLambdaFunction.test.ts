let _ = require('lodash');
let assert = require('chai').assert;

import { MicroserviceConfig } from 'pip-services-runtime-node';
import { UsersLambdaFunction } from '../../src/run/UsersLambdaFunction';

let buildConfig = MicroserviceConfig.fromValue({
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
    }
});

suite('UsersLambdaFunction', ()=> {    
    let lambda = new UsersLambdaFunction();

    suiteSetup((done) => {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    
    suiteTeardown((done) => {
        lambda.stop(done);
    });
                
    test('Ping', (done) => {
        lambda.getHandler()(
            {
                cmd: 'get_users' 
            },
            {
                done: (err, users) => {
                    assert.isNull(err);
                    assert.isObject(users);                
                    done();
                }
            }
        );
    });
});
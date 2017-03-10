"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var UsersLambdaFunction_1 = require('../../src/run/UsersLambdaFunction');
var buildConfig = pip_services_runtime_node_1.MicroserviceConfig.fromValue({
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
suite('UsersLambdaFunction', function () {
    var lambda = new UsersLambdaFunction_1.UsersLambdaFunction();
    suiteSetup(function (done) {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    suiteTeardown(function (done) {
        lambda.stop(done);
    });
    test('Ping', function (done) {
        lambda.getHandler()({
            cmd: 'get_users'
        }, {
            done: function (err, users) {
                assert.isNull(err);
                assert.isObject(users);
                done();
            }
        });
    });
});

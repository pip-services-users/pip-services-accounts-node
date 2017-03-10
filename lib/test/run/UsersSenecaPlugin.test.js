"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var UsersSenecaPlugin_1 = require('../../src/run/UsersSenecaPlugin');
var buildConfig = {
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
suite('UsersSenecaPlugin', function () {
    var seneca;
    var plugin = new UsersSenecaPlugin_1.UsersSenecaPlugin();
    suiteSetup(function (done) {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    suiteTeardown(function (done) {
        seneca.close(done);
    });
    test('Ping', function (done) {
        seneca.act({
            role: 'users',
            cmd: 'get_users'
        }, function (err, users) {
            assert.isNull(err);
            assert.isObject(users);
            done();
        });
    });
});

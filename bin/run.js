/**
 * @file Users process launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var UsersProcessRunner = require('../lib/src/run/UsersProcessRunner').UsersProcessRunner;

var runner = new UsersProcessRunner();
runner.startWithDefaultConfig('../config/config.json');
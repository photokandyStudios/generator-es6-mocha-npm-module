/*global describe, beforeEach, it */
'use strict';

var fs = require('fs');
var path = require('path');
var helpers = require('yeoman-generator').test;
var test = require('tape');

test('module generator', function (t) {
    var app;

    function setup (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            app = helpers.createGenerator('es6-mocha-npm-module:app', [
                '../../app'
            ]);
            done();
        });
    }

    t.test('creates expected files', function (t) {

        setup(function () {
            var expected = [
                // add files you expect to exist here.
                '.gitignore',
                '.npmignore',
                '.babelrc',
                'babelhook.js',
                'README.md',
                'CHANGELOG.md',
                'LICENSE',
                'package.json',
                'test/index.js',
                'src/index.js'
            ];

            helpers.mockPrompt(app, {
                'appname' : 'mymodule',
                'license' : 'MIT',
                'stage'   : 0
            });

            app.options['skip-install'] = true;

            app.run({}, function () {
                var pkg;

                expected.forEach(function (file) {
                    t.ok(fs.existsSync(file), 'file exists.');
                });

                pkg = require('./temp/mymodule/package.json');

                t.equal(pkg.name, 'mymodule');

                t.end();
            });
        })
    });

});

const exec = require('mz/child_process').exec;
const request = require('supertest-as-promised');
const expect = require('chai').expect;
const base64 = require('base-64');

const app = require('../server/index');

describe('builds application', function () {
  it('builds to "build" directory', function () {
    // Disable mocha time-out because this takes a lot of time
    this.timeout(0);

    // Run process
    return exec('npm run build');
  });
});

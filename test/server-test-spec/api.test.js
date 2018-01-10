const exec = require('mz/child_process').exec;
const request = require('supertest-as-promised');
const expect = require('chai').expect;
const base64 = require('base-64');
const fork = require('child_process').fork;

// Set some environment variables first:
process.env.SERVER_AUTH_URL = 'http://localhost:3002/auth';
process.env.SERVER_API_GW_URL = 'http://localhost:3002';
process.env.BI_UI_TEST_ADMIN_USERNAME = "admin";
process.env.BI_UI_TEST_ADMIN_PASSWORD = "admin";
process.env.BI_UI_TEST_USER_USERNAME = "test";
process.env.BI_UI_TEST_USER_PASSWORD = "test";
process.env.NODE_ENV = 'test';

// Run the gateway - remember to kill it afterwards
// We need NODE_ENV to be 'test' which means that we have to fork the apiGateway script
// ourselves, which means we can easily kill it after the test has run.
const gateway = fork(require('../../server/apiGateway'));

const app = require('../../server/index');

describe('node server api', function () {
  let adminToken;

  function login(done) {
    return request(app)
      .post('/auth/login')
      .type('application/json')
      .set('Authorization', `Basic ${base64.encode('admin:admin')}`)
      .send({
        'username': 'admin',
      })
      .then(res => {
        expect('Content-Type', 'application/json; charset=utf-8')
        const resp = JSON.parse(res.text);
        adminToken = resp.accessToken;
        expect(200);
        done()
      });
  }

  // Before we start the tests, we need to log a user in
  before(function(done) {
    login(done);
  })

  it('gets information from the /api/info endpoint', function () {
    return request(app)
      .get('/api/info')
      .type('application/json')
      .set('Authorization', adminToken)
      .expect(200)
      .then(res => {
        const json = JSON.parse(res.text);
        // Check we get the right keys back
        const lastUpdate = 'lastUpdate' in json;
        const version = 'version' in json;
        expect(lastUpdate).to.be.equal(true);
        expect(version).to.be.equal(true);
      });
  });
});

gateway.kill('SIGINT');

const exec = require('mz/child_process').exec;
const request = require('supertest-as-promised');
const expect = require('chai').expect;
const base64 = require('base-64');
const fork = require('child_process').fork;

// Set some environment variables first:
process.env.SERVER_AUTH_URL = 'http://localhost:3002/auth';
process.env.SERVER_API_GW_URL = 'http://localhost:3002';
process.env.NODE_ENV = 'test';

// Run the gateway - remember to kill it afterwards
const gateway = fork(require('../../server/apiGateway'));

const app = require('../../server/index');

describe('node server authentication', function () {
  let adminToken;
  let userToken;

  it('logs a local user in (admin)', function () {
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
      });
  });

  it('checks the users token (admin)', function () {
    return request(app)
      .post('/auth/checkToken')
      .type('application/json')
      .set('Authorization', adminToken)
      .expect(200)
      .then(res => {
        const json = JSON.parse(res.text);
        expect(json.username).to.be.equal('admin');
        expect(json.role).to.be.equal('admin');
        expect(json.accessToken).to.be.equal(adminToken);
      });
  });

  it('logs a local user out (admin)', function () {
    return request(app)
      .post('/auth/logout')
      .type('application/json')
      .set('Authorization', adminToken)
      .expect(200);
  });

  it('logs a local user in (test)', function () {
    return request(app)
      .post('/auth/login')
      .type('application/json')
      .set('Authorization', `Basic ${base64.encode('test:test')}`)
      .send({
        'username': 'test',
      })
      .then(res => {
        expect('Content-Type', 'application/json; charset=utf-8')
        const resp = JSON.parse(res.text);
        userToken = resp.accessToken;
        expect(200);
      });
  });

  it('checks the users token (test)', function () {
    return request(app)
      .post('/auth/checkToken')
      .type('application/json')
      .set('Authorization', userToken)
      .expect(200)
      .then(res => {
        const json = JSON.parse(res.text);
        expect(json.username).to.be.equal('test');
        expect(json.role).to.be.equal('admin');
        expect(json.accessToken).to.be.equal(userToken);
      });
  });

  it('logs a local user out (test)', function () {
    return request(app)
      .post('/auth/logout')
      .type('application/json')
      .set('Authorization', userToken)
      .expect(200);
  });

  it('will not log a user in with incorrect credentials', function () {
    return request(app)
      .post('/auth/login')
      .type('application/json')
      .set('Authorization', `Basic ${base64.encode('jonDoe:jonDoe')}`)
      .send({
        'username': 'jonDoe',
      })
      .expect(401);
  });

  it('will return 401 for an invalid token', function () {
    return request(app)
      .post('/auth/checkToken')
      .type('application/json')
      .set('Authorization', 'abc123')
      .expect(401);
  });
});

gateway.kill('SIGINT');

const exec = require('mz/child_process').exec;
const request = require('supertest-as-promised');
const expect = require('chai').expect;
const base64 = require('base-64');

const app = require('../server/app');

describe('builds application', function () {
  it('builds to "build" directory', function () {
    // Disable mocha time-out because this takes a lot of time
    this.timeout(0);

    // Run process
    return exec('npm run build');
  });
});

describe('routes and authentication work', function () {
  let adminToken;
  let userToken;

  it('responds to / with the index.html', function () {
    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(res => expect(res.text).to.contain('<div id="root"></div>'));
  });

  it('responds to favicon.icon request', function () {
    return request(app)
      .get('/favicon.ico')
      .expect('Content-Type', 'image/x-icon')
      .expect(200);
  });

  it('responds to any route with the index.html', function () {
    return request(app)
      .get('/foo/bar')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(res => expect(res.text).to.contain('<div id="root"></div>'));
  });

  it('logs a local user in (admin)', function () {
    return request(app)
      .post('/login')
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
      .post('/checkToken')
      .type('application/json')
      .send({
        'accessToken': adminToken
      })
      .expect(200);
  });

  it('logs a local user out (admin)', function () {
    return request(app)
      .post('/logout')
      .type('application/json')
      .send({
        'accessToken': adminToken
      })
      .expect(200);
  });

  it('logs a local user in (test)', function () {
    return request(app)
      .post('/login')
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
      .post('/checkToken')
      .type('application/json')
      .send({
        'accessToken': userToken
      })
      .expect(200);
  });

  it('logs a local user out (test)', function () {
    return request(app)
      .post('/logout')
      .type('application/json')
      .send({
        'token': userToken
      })
      .expect(200);
  });

  it('will not log a user in with incorrect credentials', function () {
    return request(app)
      .post('/login')
      .type('application/json')
      .send({
        'username': 'jonDoe',
        'password': 'qwerty'
      })
      .expect(401);
  });

  it('will return 401 for an invalid token', function () {
    return request(app)
      .post('/checkToken')
      .type('application/json')
      .send({
        'token': 'abc'
      })
      .expect(401);
  });
});

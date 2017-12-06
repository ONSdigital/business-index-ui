const exec = require('mz/child_process').exec;
const request = require('supertest-as-promised');
const expect = require('chai').expect;
const base64 = require('base-64');

describe('builds application', function () {
  it('builds to "build" directory', function () {
    // Disable mocha time-out because this takes a lot of time
    this.timeout(0);

    // Run process
    return exec('npm run build');
  });
});

process.env.SERVE_HTML = 'true';
const app = require('../server/index');

describe('static assets are served (react /build dir)', function () {

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
});
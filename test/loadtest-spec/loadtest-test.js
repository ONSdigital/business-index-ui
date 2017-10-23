const loadtest = require('loadtest');

const HOST = (process.env.HOST || 'http://localhost:3001');
const REQUESTS = (process.env.REQUESTS || 1000);
const REQ_PER_SECOND = (process.env.REQ_PER_SECOND || 500);
const DURATION = 10;
const BUFFER = 5; // Incase the loadtest over runs duration

describe("loadtest suite of stress tests", function() {

  it("tests the /info route", function(done) {
    const options = {
        method: 'GET',
        url: `${HOST}/info`,
        concurrency: 40,
        maxRequests: REQUESTS
    };
    loadtest.loadTest(options, function(error, result) {
      if (error) {
        expect(1).toBeLessThan(0); // Fail the test
        done();
      } else {
        expect(result.rps).toBeGreaterThan(REQ_PER_SECOND);
        done();
      }
    });
  }, (DURATION + BUFFER) * 1000);

  it("tests the /login route", function(done) {
    const options = {
        method: 'POST',
        contentType: 'application/json',
        url: `${HOST}/login`,
        concurrency: 50,
        maxRequests: REQUESTS,
        body: { username: 'test', password: 'test' }
    };
    loadtest.loadTest(options, function(error, result) {
      if (error) {
        expect(1).toBeLessThan(0); // Fail the test
        done();
      } else {
        expect(result.rps).toBeGreaterThan(REQ_PER_SECOND);
        done();
      }
    });
  }, (DURATION + BUFFER) * 1000);

  it("tests the /checkToken route", function(done) {
    const options = {
        method: 'POST',
        contentType: 'application/json',
        url: `${HOST}/checkToken`,
        concurrency: 50,
        maxRequests: REQUESTS,
        body: { token: '12345' }
    };
    loadtest.loadTest(options, function(error, result) {
      if (error) {
        expect(1).toBeLessThan(0); // Fail the test
        done();
      } else {
        expect(result.rps).toBeGreaterThan(REQ_PER_SECOND);
        done();
      }
    });
  }, (DURATION + BUFFER) * 1000);
});

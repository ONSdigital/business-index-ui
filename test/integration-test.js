const selenium = require('selenium-webdriver');
const exec = require('mz/child_process').exec;
const request = require("request");
const URL = process.env.UI_URL;

describe('Selenium testing of routes and login page', function() {
    // Open localhost before each test is run
    beforeEach(function(done) {
        this.driver = new selenium.Builder().
            withCapabilities(selenium.Capabilities.chrome()).
            build();
        this.driver.get(URL).then(done);
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    // Firstly, check the base url returns an OK 200 status code
    it("base url returns status code 200", function(done) {
      request.get(URL, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    // Not logged in yet so if we go to /Support, we should be taken back to
    // the login page. Can check this by looking at the banner text, is "local"
    // for logged in page and 'Statistical Business Register' for the login page.
    it("Support url will return user to login page if not logged in", function(done) {
      this.driver.get(URL + '/Support');
      var element = this.driver.findElement(selenium.By.className('banner-text'));
      element.getText().then(function(text) {
        expect(text).toBe('Statistical Business Register');
        done();
      });
    });

    // Test that the banner text in the header shows "Business Index" and not
    // "Example UI".
    it('Should be on the home page', function(done) {
        var element = this.driver.findElement(selenium.By.className('banner-text'));
        element.getText().then(function(text) {
          expect(text).toBe('Statistical Business Register');
          done();
        });
    });
});

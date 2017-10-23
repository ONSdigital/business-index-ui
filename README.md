# bi-ui

[![phase](https://img.shields.io/badge/phase-BETA-orange.svg)](https://img.shields.io/badge/phase-BETA-orange.svg) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](./LICENSE)

The following tutorials were used to help with the deployment using Node.js, the login with redux and the isolation of bootstrap styles: [Node](https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d#.mt6bbdd8m
), [Login](https://github.com/mxstbr/login-flow) and [Bootstrap Isolation](https://formden.com/blog/isolate-bootstrap).

## Environment Setup for the UI

1. Install NPM, it is included with Node.js ([Download](https://nodejs.org/en/))

2. For testing locally, set the following environment variables (use `vim ~/.profile`):

```shell
export BI_UI_TEST_ADMIN_USERNAME=admin
export BI_UI_TEST_ADMIN_PASSWORD=admin
export BI_UI_TEST_USER_USERNAME=test
export BI_UI_TEST_USER_PASSWORD=test
export JWT_SECRET=SECRET
```

## Running the Demo UI:

1. Clone this repo, install dependencies and start NPM

```shell
git clone https://github.com/ONSdigital/bi-ui.git
cd bi-ui
npm install
npm start
```

The NPM start command uses the following commands:

```shell
npm run build
SERVE_HTML=true ENV=local node server
```

This will run Node and React on localhost:3001, since Node is serving
`index.html`, hot-reloading will not work.

To use hot-reloading, use `npm restart` which runs `react-scripts start`, this
will start React on port 3000. To start the server, use `ENV=local node server/index.js`.

## Running the API

* [business-index-api](https://github.com/ONSdigital/business-index-api):

```shell
elasticsearch
sbt "api/run -Denvironment=local"
```

## Testing

Running `npm test` will run all the tests described below.

### Unit

All code in /utils will have associated unit tests in [/test/utils-spec](./test/utils-spec). Jasmine uses a [config file](./test/utils-unit-tests.js) which is necessary to get the tests working with ES6.

### Component

Jasmine, Enzyme and redux-mock-store are used for the component tests, which can be found in [/test/component-tests](./test/component-tests).

### Integration

The Selenium integration tests can be found in [/test/integration-test.js](./test/integration-test.js).

This test will only work if the UI is already running. You can point Selenium at the UI by providing a `UI_URL` environment variable, this is set to `http://localhost:3000` in the `npm test` command.

For the Jasmine test to work, chromedriver is required, install this with the following command:

```shell
brew install chromedriver
```

### Server

The [server tests](./test/server.test.js) test all the routes of the node server. The environment variable `SERVE_HTML=true` needs to be passed into the server to tell it to serve the bundled React code.

### Stress

The [stress tests](./test/loadtest-spec/loadtest-test.js) use [loadtest](https://github.com/alexfernandez/loadtest) alongside Jasmine. If you have the node server running, you can run the following command to run the stress tests:

`HOST=http://localhost:3001 REQUESTS=5000 npm run-script test-load`

To run the stress tests and the node server together, use the following:

`node server/ & HOST=http://localhost:3001 REQUESTS=5000 npm run-script test-load`

The node server will carry on running afterwards, you can shut it down with `killall node`.

## Useful Extensions

* [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) - for testing Node routes

* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related) - for viewing props & state of React components

* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) - for seeing what is happening in your Redux store

## Logging into the Demo UI:

Username and password are `test` or `admin`.

## Troubleshooting

### Using Bootstrap

If you wish to use any React component that requires Bootstrap CSS/JS, do the following:

```html
<div className="bootstrap-iso">
  <your code here>
</div>
```

More details on this can be found [here](https://github.com/ONSdigital/sbr-ui/pull/50).

## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md) for details.

## License

Copyright ©‎ 2017, Office for National Statistics (https://www.ons.gov.uk)

Released under MIT license, see [LICENSE](./LICENSE) for details.

# bi-ui

[![phase](https://img.shields.io/badge/phase-BETA-orange.svg)](https://img.shields.io/badge/phase-BETA-orange.svg) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](./LICENSE)

The `bi-ui` allows a user to query the [business-index-api](https://github.com/ONSdigital/business-index-api). This project uses React.js and Redux on the frontend and Node.js for serving the static React.js files and for managing user sessions.

The following tutorials were used to help with the deployment using Node.js, the login with redux and the isolation of `sdc-global-design-patterns` styles: [Node](https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d#.mt6bbdd8m
), [Login](https://github.com/mxstbr/login-flow) and [SDC Styles Isolation](https://formden.com/blog/isolate-bootstrap).

### Table of Contents
**[1. Environment Setup](#environment-setup-for-the-ui)**<br>
**[2. Running the UI](#running-the-ui)**<br>
**[3. Running the API](#running-the-api)**<br>
**[4. Testing](#testing)**<br>
**[5. Useful Extensions](#useful-extensions)**<br>
**[6. Logging into the UI](#logging-into-the-ui)**<br>
**[7. Troubleshooting](#troubleshooting)**<br>
**[8. Contributing](#contributing)**<br>
**[9. License](#license)**<br>

## Environment Setup for the UI

Install NPM, it is included with Node.js ([Download](https://nodejs.org/en/))

## Running the UI:

1. Clone this repo and install dependencies

```shell
git clone https://github.com/ONSdigital/bi-ui.git
cd bi-ui
npm install
```

2. Start the `Node.js` server

```shell
npm run start:server
```

3. Start the `React.js` development server (with hot reloading)

```shell
npm run start:react
```

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

## Logging into the UI:

Username and password are `test` or `admin`.

## Troubleshooting

### Using SDC Patterns

If you want to use any patterns from the [sdc-global-design-patterns library](https://onsdigital.github.io/sdc-global-design-patterns/index.html), you need to wrap your code in the following `div`:

```javascript
<div className="sdc-isolation">
  ...
</div>
```

If you want to use the sdc patterns inside a grid, it's probably a good idea to use the grid in the sdc pattern library, as many of the components inherit styles, so when using the external style library grid, you'll run into lots of problems with your sdc components inheriting the wrong colour/size etc.

## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md) for details.

## License

Copyright ©‎ 2017, Office for National Statistics (https://www.ons.gov.uk)

Released under MIT license, see [LICENSE](./LICENSE) for details.

# bi-ui

[![phase](https://img.shields.io/badge/phase-BETA-orange.svg)](https://img.shields.io/badge/phase-BETA-orange.svg) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](./LICENSE)

The `bi-ui` allows a user to query the [business-index-api](https://github.com/ONSdigital/business-index-api). This project uses React.js and Redux on the frontend and Node.js for serving the static React.js files and for managing user sessions.

The following tutorials were used to help with the deployment using Node.js and the login with redux: [Node](https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d#.mt6bbdd8m
) and [Login](https://github.com/mxstbr/login-flow).

### Table of Contents
**[1. Environment Setup](#environment-setup-for-the-ui)**<br>
**[2. Running the UI](#running-the-ui)**<br>
**[3. Running the API](#running-the-api)**<br>
**[4. Testing](#testing)**<br>
**[5. Useful Extensions](#useful-extensions)**<br>
**[6. Logging into the UI](#logging-into-the-ui)**<br>
**[7. Contributing](#contributing)**<br>
**[8. License](#license)**<br>

## Environment Setup for the UI

Install NPM, it is included with Node.js ([Download](https://nodejs.org/en/))

## Running the UI:

Clone this repo and install dependencies

```shell
git clone https://github.com/ONSdigital/bi-ui.git
cd bi-ui
npm install
```

### Development Setup

1. Start the `React.js` development server (which uses hot reloading):

```shell
npm run start:react
```

2. Start the `Node.js` server:

```shell
npm run start:server
```

3. Go to [localhost:3000](http://localhost:3000) to see bi-ui.

### Docker Setup

1. Build and run the UI inside a Docker container.

```shell
docker build -t bi-ui .
docker run -p 3001:3001 bi-ui
```

2. Go to [localhost:3001](http://localhost:3001) to see bi-ui.

## Running the API

* [business-index-api](https://github.com/ONSdigital/business-index-api):

```shell
elasticsearch
sbt "api/run -Denvironment=local"
```

## Testing

Running `npm test` will run all the unit, server and load tests.

## Useful Extensions

* [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) - for testing Node routes

* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related) - for viewing props & state of React components

* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) - for seeing what is happening in your Redux store

## Logging into the UI

Username and password are `test` or `admin`.

### Login credentials for DEV, TEST and BETA

The login to the UI deployed to CF is handled differently. Relevant documentation can be found on Confluence.

## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md) for details.

## License

Copyright ©‎ 2017, Office for National Statistics (https://www.ons.gov.uk)

Released under MIT license, see [LICENSE](./LICENSE) for details.

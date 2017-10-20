# Business Index User Interface Deployment

This README will hold details of the deployment process.

## Blue-Green-Deploy

Information regarding blue-green-deploys can be found [here](https://docs.cloudfoundry.org/devguide/deploy-apps/blue-green.html).

Most of the shell script for the blue-green-deploy is from [here](http://www.fabian-keller.de/blog/blue-green-deployment-with-cloudfoundry), however there is an additional feature in the blue-green-deploy process.

### First Deploy

The blue-green-deploy script will first check if an app with the same name is present in CloudFoundry using `cf app ${APP_NAME}`, if an app is not present, that line of shell script will return an error code, thus failing the Jenkins build. This is turned off using `set +e`, before using `$?` to get the status of the previous command.

If the app is there, the blue-green deployment process will be followed, otherwise the first deploy will push the app to CloudFoundry in the normal way.

```shell
# Use set +e/-e to turn on/off an exit code failing the script
# This is needed as if no app is present, the command will fail
set +e
cf app "${APP_NAME}"
APP_PRESENT=$?
set -e

# If the app is already there, do the blue/green deployment
# Otherwise, do the initial deployment
if [ "$APP_PRESENT" = "0" ]
then
  // Do blue-green-deploy
  ...
else
  // Do normal deploy
  ...
fi
```

## Common CloudFoundry Problems

### Error: no space left on device

If you get a `no space left on device` error whilst pushing the app to CloudFoundry, it is likely due to the caching of `node_modules`. Run the following in the cf-cli to disable `node_modules` caching:

```shell
cf set-env <App-Name> NODE_MODUES_CACHE false
```

Also, ensure `NODE_MODULES_CACHE: false` is set in the `env` section of the `manifest.yml`.

To reduce the amount of space used by the `node_modules` on CloudFoundry, we use a seperate `package.json` for the server. Since we run `npm run build` and push the `/build` folder to CloudFoundry, we do not need React to run the build. Therefore we only push the `node_modules` and `package.json` for the server to CloudFoundry.

### Buildpack errors

Use the `cf buildpacks` command to see a list of available build packs.

If you specify a buildpack that isn't present, then CloudFoundry will try to find it online, which won't work. If this is left blank then CloudFoundry will detect the platform and use the appropriate buildpack.

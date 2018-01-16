# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# Need to be able to specify running it as a DEV
# e.g. Need hot reloading
# Note: need .dockerignore file to ignore node modules

FROM node:6.11.5

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3001
ENV SERVE_HTML true
ENV NPM_CONFIG_LOGLEVEL info
# 'npm start' will create the static build files and then serve them
CMD [ "npm", "start" ]

# what to do about long wait after running 'npm run build'?


# Commands
# docker build -t bi-ui .
# docker images 
# docker run -p 3001:3001 -d bi-ui
# docker ps
# docker logs <container id>

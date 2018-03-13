# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:6.11.5

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001

ENV NODE_ENV development
ENV SERVE_HTML true
ENV NPM_CONFIG_LOGLEVEL info
ENV SERVER_AUTH_URL http://localhost:3002/auth
ENV SERVER_API_GW_URL http://localhost:3002
ENV API_URL http://localhost:9000
ENV BI_UI_TEST_ADMIN_USERNAME admin
ENV BI_UI_TEST_ADMIN_PASSWORD admin
ENV BI_UI_TEST_USER_USERNAME test
ENV BI_UI_TEST_USER_PASSWORD test
ENV REACT_APP_ENV local
ENV REACT_APP_AUTH_URL http://localhost:3001
ENV REACT_APP_API_URL http://localhost:3001/api

# 'npm start' will create the static build files and then serve them
CMD [ "npm", "start" ]

# Useful Docker Commands:
# docker build -t bi-ui .
# docker images 
# docker run -p 3001:3001 -d bi-ui
# docker ps
# docker logs <container id>
# docker attach <container id>

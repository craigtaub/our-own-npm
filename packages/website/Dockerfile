FROM node:14-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add ssh support for scp
# RUN apk update && apk add openssh-client bash
# RUN service ssh start

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . ./
# COPY . ./packages/website
# ADD . /usr/src/app

# Exports
EXPOSE 3000
CMD [ "npm", "run", "start.dev" ]

# Install node version
FROM node:14.15.4-alpine3.12

# Add node
RUN apk add --no-cache bash

# Install Nestjs
RUN npm install -g @nestjs/cli

# Add user `node`
USER node

# Add workspace ${user}/app
WORKDIR /home/node/app

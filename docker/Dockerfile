FROM node:22-alpine AS base

RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY package*.json yarn.lock ./

RUN yarn cache clean
RUN rm -rf node_modules
RUN yarn install --frozen-lockfile

COPY . .

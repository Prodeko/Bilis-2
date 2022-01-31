FROM node:16 AS test

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

FROM cypress/included:9.3.1 AS cypress

WORKDIR /usr/src/app

COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json



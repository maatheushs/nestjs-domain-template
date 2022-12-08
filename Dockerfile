ARG NODE_VERSION=node:19.1
ARG ALPINE_VERSION=alpine3.15

FROM ${NODE_VERSION}-${ALPINE_VERSION} as base

WORKDIR /home/node/app

RUN npm install -g npm@9.1.2

# Development image
FROM base as development

RUN apk add bash

USER node

# Builder image
FROM base as builder

COPY --chown=node:node . .

RUN npm install && \
    npm run build

# Production image
FROM base as production

RUN chown -R node:node .

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=builder /home/node/app/dist ./dist

USER node

ENV NODE_ENV production
RUN npm install --omit=dev

EXPOSE 3000

CMD npm run start:prod
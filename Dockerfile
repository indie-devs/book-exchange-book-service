FROM node:lts AS development
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma

RUN yarn add glob rimraf

RUN yarn -D

COPY . .
RUN yarn prisma:client
RUN yarn build

FROM node:lts as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/package.json ./
COPY --from=development /usr/src/app/yarn.lock ./
COPY --from=development /usr/src/app/dist ./dist
COPY ./prisma/ ./prisma/
COPY ./start-docker.sh ./start-docker.sh

CMD ["./start-docker.sh"]
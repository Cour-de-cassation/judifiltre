FROM node:14-alpine

WORKDIR /backend

COPY package.json /backend/

COPY yarn.lock /backend/

RUN yarn

COPY . /backend/

EXPOSE 8080

CMD ["yarn", "startDev"]

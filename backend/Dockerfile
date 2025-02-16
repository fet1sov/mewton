# Docker file
FROM node:18-alpine as builder
RUN npm cache clean –force

RUN apk add --no-cache openssl

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install

RUN npm run build
RUN npm run db:prod

# Start the serving backend part
CMD ["npm", "run", "start:prod"]

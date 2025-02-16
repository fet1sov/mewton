# Docker file
FROM node:18-alpine as builder
RUN npm cache clean –force

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install

RUN npm run build

# Start the serving backend part
CMD ["node", "dist/main.js"]

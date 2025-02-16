# Docker file
FROM node:18-alpine as builder
RUN npm cache clean –force

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN npm install -g serve

RUN npm run build

# Start the serving frontend part
CMD ["serve", "-s", "dist", "-l", "5173"]
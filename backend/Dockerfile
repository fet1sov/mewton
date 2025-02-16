# Docker file
FROM node:20-alpine as builder
RUN npm cache clean –force

RUN apk add --no-cache openssl

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install

RUN npm run build

# Start the serving backend part
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
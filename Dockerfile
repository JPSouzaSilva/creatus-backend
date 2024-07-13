FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 8080

ENTRYPOINT [ "npm", "run", "start:dev" ]
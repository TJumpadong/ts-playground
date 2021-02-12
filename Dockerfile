FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json .
RUN npm install --production

COPY --from=build /usr/src/app/dist dist

EXPOSE 3000
CMD ["npm", "start"]
FROM node:16-alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install --no-cache-dir
RUN npx update-browserslist-db@latest

COPY . /app
CMD ["npm", "start"]
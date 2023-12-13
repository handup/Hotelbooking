FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install --production

COPY . /app

CMD ["npm", "run", "start"]

FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json /app/
# ensures that only the dependencies (and not the devDependencies) are installed,
RUN npm install --production

COPY . /app

CMD ["npm", "run", "start"]

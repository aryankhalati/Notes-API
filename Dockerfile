FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

ENV NODE_ENV=production

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
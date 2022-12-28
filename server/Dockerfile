FROM node:16

WORKDIR /notyappapi

COPY package.json ./

RUN npm install

RUN npm install -g concurrently

COPY . .

RUN npm run build

RUN npm run prisma:generate

ENV PORT=8080

EXPOSE 8080

CMD ["npm","run","start:prod"]

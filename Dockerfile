FROM node:12
WORKDIR /app
ENV PORT=8080
COPY package.json /app
RUN npm install
COPY . .
CMD node index.js

FROM node:14
WORKDIR /opt/app
ADD package.json package.json
RUN npm rebuild bcrypt --build-from-source
RUN npm install
ADD . .
RUN npm run build
CMD ["node", "./dist/main.js"]

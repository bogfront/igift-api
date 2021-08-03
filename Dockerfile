FROM node:14
WORKDIR /opt/app
ADD package.json package.json
RUN yarn
ADD . .
RUN yarn build
#RUN npm prune --production
CMD ["node", "./dist/main.js"]

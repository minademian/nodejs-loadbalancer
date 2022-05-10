FROM node:16
WORKDIR /home/node/app
COPY package.json /home/node/app
COPY src/video-server /home/node/app
RUN npm install
RUN npm run start-video-servers
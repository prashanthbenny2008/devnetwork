#Docker for React

#Build react
FROM node:16

#Working directory
WORKDIR /usr/src/app

COPY package*.json ./

#Install deps
RUN npm install --silent

##Copy local files to app folder
COPY . .

#Define PORT
EXPOSE 3000

#npm start
CMD ["npm", "start"]
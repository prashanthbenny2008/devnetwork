#  Dockerfile for Node Express Backend

FROM node:16

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package, package-lock to workdir 
COPY package*.json /

# Install Dependencies
RUN npm install --silent

# Copy app source code
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
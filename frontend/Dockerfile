# base image
FROM node:12.16.1-alpine
WORKDIR /app/frontend
# install and cache app dependencies
COPY package*.json ./
RUN yarn
COPY . .

# start app
CMD ["yarn", "start"]
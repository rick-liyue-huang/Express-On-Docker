FROM node:18
WORKDIR /app
COPY package.json .
# . direct to /app, before RUN
RUN npm install
COPY . ./
# 5 layers for building docker
# cache the layers, and re cache from the changed layer
EXPOSE 3000
CMD ["npm", "run", "dev"]
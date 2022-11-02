FROM node:18
WORKDIR /app
COPY package.json .
# . direct to /app, before RUN
# RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi 

COPY . ./
# 5 layers for building docker
# cache the layers, and re cache from the changed layer
ENV PORT 4000
EXPOSE $PORT
# CMD ["npm", "run", "dev"]
CMD [ "node", "index.js" ]
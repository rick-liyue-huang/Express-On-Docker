FROM node:18  
WORKDIR /app
# this two layers never changed
COPY package.json .
RUN npm install
# this is at build time
COPY . ./
# five layers form previous five lines
EXPOSE 3000
CMD ["node", "index.js"]
# run in container. this is runtime
# will run `docker build .` to execute the dockefile
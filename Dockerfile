FROM node

# Create app directory
WORKDIR /usr/src/app

ENV GRAPH_URL REPLACE_ME

ENV API_USER REPLACE_ME

ENV API_KEY REPLACE_ME

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD sh /usr/src/app/script.sh
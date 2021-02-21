# base image
FROM node:14.15.5

# set working directory
WORKDIR */app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#COPY package*.json ./
COPY package.json .
COPY package-lock.json ./

# concat multiple run instructions
# sort them alphabetically
RUN npm install \
    npm audit fix
#RUN yarn install

COPY . ./
# ADD . .
#EXPOSE 3000

CMD ["npm", "start"]
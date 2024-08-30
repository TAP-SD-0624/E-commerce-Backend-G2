FROM node:20.14

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /app

COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD [ "npm", "run" ,"setDockerInit"]


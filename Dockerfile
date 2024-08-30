# Use the official Node.js image with the correct version
# smaller image: FROM node:20.14-alpine
FROM node:20.14.0

# Declaring env
ENV NODE_ENV development

# Set the creators
LABEL authors="Menna, Amer, Feras, Ramzi"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the source code into the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# Command to run your app
CMD ["npm", "run", "start"]
# Use a smaller Alpine-based Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your app's code
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Start the app
CMD ["npm", "start"]

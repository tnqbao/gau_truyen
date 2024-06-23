# Start with a node base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./src ./src
COPY ./public ./public

# Build the React application
RUN npm run build

# Install the 'serve' package globally to serve the build files
RUN npm install -g serve

# Remove node_modules to reduce image size
RUN rm -rf node_modules

# Expose port 3000
EXPOSE 3000

# Start the application using 'serve'
CMD ["serve", "-s", "build"]

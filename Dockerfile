# Start with a node base image
FROM node:18-alpine AS builder

# Set the environment to production
ENV NODE_ENV production

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use nginx to serve the application
FROM nginx:latest

# Set the environment to production
ENV NODE_ENV production

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove the default nginx static files
RUN rm -rf ./*

# Copy built files from the builder stage
COPY --from=builder /app/build .

# Expose port 80
EXPOSE 80

# Start the application using nginx
CMD ["nginx", "-g", "daemon off;"]

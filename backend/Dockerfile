# Use the official Node.js image
FROM node:20.11.1

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all remaining files
COPY . .

# Expose port 4000 (make sure your app actually listens on this port)
EXPOSE 4000

# Run the backend using npm run dev
CMD ["npm", "run", "dev"]

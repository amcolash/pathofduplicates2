# Dependency Stage
FROM mhart/alpine-node:12

# Create app directory
WORKDIR /usr/src/app

# For caching purposes, install deps without other changed files
COPY package.json package-lock.json ./

# Install deps
RUN DISABLE_OPENCOLLECTIVE=true npm ci --production

# Copy source code
COPY . ./

# Build prod-react code
RUN npm run build

# Set things up
EXPOSE 8002

# Start the server
ENTRYPOINT ["node", "index.js"]
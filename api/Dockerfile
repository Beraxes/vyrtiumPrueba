# Stage 1: Build the NestJS application
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app/api

# Install build tools required for native Node.js modules like bcrypt
# apk add --no-cache build-base will install g++, make, python3, etc.
RUN apk add --no-cache build-base python3

# Copy package.json and yarn.lock to install dependencies
COPY api/package.json api/yarn.lock ./

# Install dependencies using yarn
# We use --frozen-lockfile to ensure the exact versions from yarn.lock are installed
RUN yarn install --frozen-lockfile

# Copy the rest of the API source code
COPY api/src ./src
COPY api/nest-cli.json ./nest-cli.json
COPY api/tsconfig.json ./tsconfig.json
COPY api/tsconfig.build.json ./tsconfig.build.json
COPY api/public ./public

# Build the NestJS application
# The build output will be in the 'dist' directory
RUN yarn build

# Stage 2: Create a lightweight production image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app/api

# Copy only necessary files from the builder stage
# Copy built application
COPY --from=builder /app/api/dist ./dist
# Copy the entire node_modules directory from the builder stage,
# which now includes correctly compiled native modules like bcrypt.
COPY --from=builder /app/api/node_modules ./node_modules
# Copy public assets if needed by the runtime (e.g., if serving static files from NestJS)
COPY api/public ./public

# No need to run yarn install --production here, as node_modules are copied directly.
# This ensures that the native modules compiled in the builder stage are used.

# Expose the port the NestJS application will run on
EXPOSE 3001

# Set environment variables for the production environment
ENV NODE_ENV=production

# Command to run the NestJS application directly
CMD ["node", "dist/main"]

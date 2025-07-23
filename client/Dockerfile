# Stage 1: Install dependencies
FROM node:22-alpine AS deps

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY client/package.json client/yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Stage 2: Build the Next.js application
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the client source code
# Make sure to include next.config.js and other necessary files
COPY client/ ./

ARG NEXT_PUBLIC_API_URL
# Set it as an environment variable for the build command
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
# -----------------------------

# Build the Next.js application
# The NEXT_PUBLIC_API_URL will be available at runtime from docker-compose
RUN yarn build

# Stage 3: Production image
FROM node:22-alpine AS runner

# Set the working directory
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy the standalone build output from the builder stage
# This is why 'output: standalone' in next.config.js is required
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

# Expose the port the Next.js application will run on
EXPOSE 3000

# Command to run the Next.js application
CMD ["node", "server.js"]

# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY api/package.json api/yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY api/ ./
RUN yarn build

# Stage 3: Runtime
FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY api/package.json ./
# Expose the port the NestJS application will run on
EXPOSE 3001
CMD ["node", "dist/main.js"]


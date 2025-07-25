# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY client/package.json client/yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY client/ ./
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN yarn build

# Stage 3: Runtime (Serve static)
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY client/package.json ./
EXPOSE 3000
CMD ["yarn", "start"]

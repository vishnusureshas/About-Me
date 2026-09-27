# --- Backend: Express + Mongoose + ioredis ---
FROM node:20-alpine AS base
WORKDIR /app
# curl for healthcheck
RUN apk add --no-cache curl

# Install deps first for better layer caching
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

# Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]

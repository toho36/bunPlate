# Use Bun's official image as base
FROM oven/bun:1 AS base

# Set working directory
WORKDIR /app

# Install dependencies into temp directory
# This will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from temp directory
# Then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV SKIP_ENV_VALIDATION=1

# Generate Prisma client
RUN bunx prisma generate

# Build the application
RUN bun run build

# Copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/.next .next
COPY --from=prerelease /app/public public
COPY --from=prerelease /app/package.json .
COPY --from=prerelease /app/next.config.ts .
COPY --from=prerelease /app/prisma prisma

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000/tcp

# Set environment
ENV PORT=3000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Run the application
CMD ["bun", "start"]
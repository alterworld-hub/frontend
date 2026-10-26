# Build natively: output is plain JS, so no emulation is needed for other platforms.
FROM --platform=$BUILDPLATFORM docker.io/library/node:24-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build

# Server bundle is self-contained (only node built-ins); runtime needs dist + srvx (no deps).
FROM gcr.io/distroless/nodejs24-debian13:nonroot
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/srvx ./node_modules/srvx
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node_modules/srvx/bin/srvx.mjs", "--prod", "--port=3000", "--static=../client", "dist/server/index.js"]

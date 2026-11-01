# Guest website: Vite build served as static files by nginx.
# VITE_* values are inlined at build time from the .env.production the deploy
# script places in the build context (or from build args, see below).
FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.34.9 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# Overrides .env.production when passed (the local docker-compose does);
# left unset otherwise, so the env file wins.
ARG VITE_API_BASE_URL
RUN pnpm run build

FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

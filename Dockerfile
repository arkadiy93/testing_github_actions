FROM node:18.14.2-bullseye-slim as build-stage
WORKDIR /app

COPY ./ /app/

RUN npm install pnpm -g

RUN pnpm install --silent --ignore-scripts --frozen-lockfile
RUN pnpm run build

FROM nginx:1.23.3
WORKDIR /app
COPY --from=build-stage /app/dist /usr/share/nginx/html
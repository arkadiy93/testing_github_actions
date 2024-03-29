FROM node:18.14.2-bullseye-slim as build-stage
WORKDIR /app

COPY ./ /app/

RUN npm install pnpm -g

RUN pnpm install --silent --ignore-scripts --frozen-lockfile
RUN pnpm run build

FROM nginxinc/nginx-unprivileged:1.23.3
WORKDIR /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/conf.d/default.conf


USER 0
COPY generate-config.sh /tmp
RUN chmod +x /tmp/generate-config.sh \
    && mv /tmp/generate-config.sh /app \
    && chown root:root /app/generate-config.sh


RUN chown -R nginx /etc/nginx/conf.d \
  && chown -R nginx /app

USER 101
EXPOSE 5003

CMD ["/bin/bash", "-c", "/app/generate-config.sh && nginx -g 'daemon off;'"]
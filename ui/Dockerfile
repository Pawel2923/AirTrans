FROM node:lts-alpine3.19

WORKDIR /ui/
COPY package.json package-lock.json /ui/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine3.17
COPY nginx-ssl.conf /etc/nginx/conf.d/default.conf.template
COPY --from=0 /ui/dist /usr/share/nginx/html
EXPOSE 80 443
CMD ["/bin/sh", "-c", "envsubst '$REACT_DOCKER_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
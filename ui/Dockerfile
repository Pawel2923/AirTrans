FROM node:lts-alpine3.19

WORKDIR /ui/
COPY package.json package-lock.json /ui/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine3.17
COPY nginx.conf /etc/nginx/conf.d/nginx.conf.template
COPY nginx-ssl.conf /etc/nginx/conf.d/nginx-ssl.conf.template
COPY --from=0 /ui/dist /usr/share/nginx/html
EXPOSE 80 443
CMD ["/bin/sh", "-c", "if [ \"$USE_SSL\" = \"true\" ]; then envsubst '$REACT_DOCKER_PORT' < /etc/nginx/conf.d/nginx-ssl.conf.template > /etc/nginx/conf.d/default.conf; else envsubst '$REACT_DOCKER_PORT' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf; fi && exec nginx -g 'daemon off;'"]
FROM node:lts-alpine3.19

WORKDIR /ui
COPY package.json .
RUN npm install
COPY . .

# Build
RUN npm run build

FROM nginx:stable-alpine3.17
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY --from=0 /ui/dist /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD /bin/sh -c "envsubst '\$REACT_DOCKER_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
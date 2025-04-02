FROM node:lts-alpine3.19 AS builder
WORKDIR /ui
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM builder AS development
CMD ["npm", "run", "dev"]

FROM nginx:stable-alpine3.17 AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf.template
COPY --from=0 /ui/dist /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT
CMD /bin/sh -c "envsubst '\$REACT_DOCKER_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
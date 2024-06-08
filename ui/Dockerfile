FROM node:lts-alpine3.19

WORKDIR /ui
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL, TZ=Europe/Warsaw

# Build
RUN npm run build

FROM nginx:stable-alpine3.17
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /ui/dist /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD ["nginx", "-g", "daemon off;"]
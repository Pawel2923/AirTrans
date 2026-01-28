FROM node:lts-alpine3.19 AS builder

WORKDIR /api
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:lts-alpine3.19

WORKDIR /api

COPY --from=builder /api/node_modules ./node_modules
COPY package.json .
COPY . .

USER node

CMD ["npm", "start"]

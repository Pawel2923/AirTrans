FROM node:lts-alpine3.19 AS builder

WORKDIR /api
COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .
RUN npm run build

FROM node:lts-alpine3.19

WORKDIR /api

COPY --from=builder /api/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /api/dist ./dist
COPY --from=builder /api/routes ./routes
COPY --from=builder /api/views ./views
COPY --from=builder /api/files ./files

CMD ["npm", "start"]

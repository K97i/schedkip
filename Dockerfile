# BUILD
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN npm prune --production

# RUN
FROM node:24-alpine AS runner

WORKDIR /app

USER node

COPY --chown=node:node --from=builder /app/build ./build
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package.json ./package.json

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "build"]
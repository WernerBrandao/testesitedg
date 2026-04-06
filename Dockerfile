FROM node:20-slim AS builder
WORKDIR /app

ARG VITE_API_URL
ARG VITE_OAUTH_PORTAL_URL
ARG VITE_APP_ID

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_OAUTH_PORTAL_URL=$VITE_OAUTH_PORTAL_URL
ENV VITE_APP_ID=$VITE_APP_ID

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# BACKEND BUILD
RUN npm run build:server

# FRONTEND BUILD - Rodar do diretório correto
WORKDIR /app/client
RUN npm run build:client

# Volta para /app
WORKDIR /app

# STAGE 2: RUNTIME
FROM node:20-slim
WORKDIR /app

# Copia os arquivos buildados
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist-client/index.html ./public/index.html
COPY --from=builder /app/client/dist-client/assets ./public/assets
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/server/index.js"]

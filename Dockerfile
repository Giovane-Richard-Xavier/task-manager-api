FROM node:20-slim

RUN apt-get update && apt-get install -y openssl bash

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x .docker/entrypoint.sh

ENTRYPOINT ["/home/node/app/.docker/entrypoint.sh"]


# FROM node:lts-alpine

# RUN apk add --no-cache bash

# WORKDIR /home/node/app

# # Copiar apenas package.json / package-lock.json (ou yarn lock) para usar cache
# COPY package.json package-lock.json ./

# RUN npm install -g @nestjs/cli

# # Copia todo o código (incluindo prisma, src, etc)
# COPY . .

# # Garantir bash no entrypoint se necessário
# RUN chmod +x .docker/entrypoint.sh

# ENTRYPOINT ["/home/node/app/.docker/entrypoint.sh"]

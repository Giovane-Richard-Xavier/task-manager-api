# Imagem estável compatível com Prisma
FROM node:20-slim

# Instalar OpenSSL (obrigatório pro Prisma)
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main.js"]

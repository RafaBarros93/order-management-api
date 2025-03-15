# Usa uma imagem base do Node.js
FROM node:20

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Limpa o cache do npm e instala as dependências
RUN npm cache clean --force
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta que o aplicativo vai rodar
EXPOSE 3000

# Comando para rodar o aplicativo
CMD [ "npm", "run", "start:dev"]

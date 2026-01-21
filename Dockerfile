# VULNERABILIDAD 1: Imagen base antigua con CVEs conocidos
FROM node:14-alpine

# VULNERABILIDAD 2: Ejecutar como root (sin USER)
WORKDIR /app

# VULNERABILIDAD 3: Copiar archivos sensibles
COPY package*.json ./

# VULNERABILIDAD 4: Instalar paquetes con versiones vulnerables
RUN npm install

# VULNERABILIDAD 5: Exponer credenciales
ENV API_KEY=sk-1234567890abcdef
ENV DATABASE_PASSWORD=password123

COPY . .

# VULNERABILIDAD 6: Exponer puerto sin restricción
EXPOSE 3000

# VULNERABILIDAD 7: Ejecutar como root
CMD ["node", "src/index.js"]
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --force
ENV NEXT_PUBLIC_API_URL=http://localhost:8000
COPY . .
RUN npm run build
EXPOSE 3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "start"]
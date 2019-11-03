### build
FROM node:10-alpine as build
LABEL author="Umar Mohammed"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- --prod

### runtime
FROM nginx:alpine
COPY --from=build /app/dist/ngClient /usr/share/nginx/html

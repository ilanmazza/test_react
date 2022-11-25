# build environment
FROM node:18.12.1-slim as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
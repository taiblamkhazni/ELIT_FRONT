# Stage 1
FROM node:16-alpine as prod
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --max_old_space_size=2048
RUN npm install -g serve

#Stage Nginix

FROM nginx:alpine AS build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=prod /app/build /usr/share/nginx/html
COPY --from=prod /app/nginx/conf.d /etc/nginx/conf.d/default.conf
EXPOSE 80
# run nginix with global directives and deamon off
CMD ["nginx", "-g", "daemon off;"]
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
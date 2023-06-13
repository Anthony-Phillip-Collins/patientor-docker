FROM node:18.16.0-bullseye-slim AS base
WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as build
RUN npm ci
ENV NODE_ENV=production
ENV REACT_APP_API_BASE_URL=http://localhost:8080/api/
COPY . .
RUN npm run build

FROM nginx:1.25.0-bullseye as prod
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# Containerized app

## Availbale URIs for both dev and prod

http://localhost:8080

http://localhost:8080/api/

http://localhost:8080/api/patients

http://localhost:8080/api/diagnosisCodes

## About

This app runs all services inside docker. Individual services are only accessible via internal ports. Since the frontend and backend are inside the same docker application they can connect to each other via `http://[APP_NAME]:[INTERNAL_PORT]`.  
Nginx is set up as a reverse proxy so that we can use http://localhost:8080/api/ as the api endpoint. This more secure that exposing the app's actuall address. Inside nginx.conf you can see that internally `location /api/` points to the app's actual address http://api:4000/api/.

## Scripts

### Production

Build  
`npm run docker:build`

Start  
`npm run docker:up`

Stop  
`npm run docker:down`

Log into MongoDB:  
`npm run docker:mongo`

List services:  
`npm run docker:ps`

Reload Nginx:  
`docker:nginx:reload`

### Development

Build  
`npm run docker:dev:build`

Start  
`npm run docker:dev:up`

Stop  
`npm run docker:dev:down`

Log into MongoDB:  
`npm run docker:dev:mongo`

List services:  
`npm run docker:dev:ps`

Reload Nginx:  
`docker:dev:nginx:reload`

Debug with busybox:  
`npm run docker:dev:debug`

#### Development Debug examples

```bash
docker compose -f docker-compose.dev.yml run --rm dev.debug-helper wget -O - http://dev.nginx:80

docker compose -f docker-compose.dev.yml run --rm dev.debug-helper wget -O - http://dev.nginx:80/api/

docker compose -f docker-compose.dev.yml run --rm dev.debug-helper wget -O - http://dev.api:4000

docker compose -f docker-compose.dev.yml run --rm dev.debug-helper wget -O - http://dev.mongo:27017
```

## Remove dangling images

```bash
docker image prune
```

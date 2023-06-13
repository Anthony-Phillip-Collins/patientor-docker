# Express application

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

# Visit counter

When running the server, visit http://localhost:4000, or give environment variable `PORT` to change the port.

# MongoDB

The application has /api/ crud which requires a MongoDB. Pass connection url with env `MONGO_URL`

# SETUP

### Production

Build  
`npm run docker:build`

Start  
`npm run docker:up`

Stop  
`npm run docker:down`

Log into MongoDB:  
`npm run docker:mongo`

### Development

Build  
`npm run docker:dev:build`

Start  
`npm run docker:dev:up`

Stop  
`npm run docker:dev:down`

Log into MongoDB:  
`npm run docker:dev:mongo`

Debug with busybox:  
`npm run debug:dev`

# Util

## Browse Mongo server

` npm run docker:mongo`

Show databases:

`show dbs`

Use database:

`use the_database`

Show collections:

`show collections`

Show all entries:

`db.todos.find({})`

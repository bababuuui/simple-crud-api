# simple-crud-api

# How to start the app

1. Run `npm install`

2. Create .env file in the root of the project.
"PORT" var has to be defined. Otherwise,  it will start server with port 3000.

3. Run the script 

prod mode: `npm run start:prod`

dev mode:`npm run start:dev`

multi mode: `npm run start:multi`

# How to run tests

`npm run test`



# How to validate load balancing ( multi mode):
Run it in terminal (bash)

``for i in `seq 1 200`; do curl -i "http://localhost:4000/api/users"; done``

In console, you will see something similar

`SERVER 1 GET /api/users`

`SERVER 3 GET /api/users`

`SERVER 2 GET /api/users`

`SERVER 4 GET /api/users`
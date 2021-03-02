# Pokefinder

You want to see a running demo? click [here](https://coronoz-pokefinder.herokuapp.com/)

## Dependencies
    If you want to run the environment locally you will need:
    - Docker
    - Docker Compose

## Starting the project
```bash
  cp client/.env.example client/.env
  cp server/.env.example server/.env
  docker-compose up
```
<p>After both client and server finished starting, you can access to the app through http://localhost:3000<p>

## Running the client linter
```bash
docker exec pokeapi_client npm run lint
```

## Running the server linter
```bash
  docker exec pokeapi_server npm run lint
```

## Running the server tests with coverage
```bash
  docker exec pokeapi_server npm run test-coverage
```

#Pokefinder

##Dependencies
    If you want to run the environment locally you will need:
    - Docker
    - Docker Compose

##Initiating the environment
```bash
  docker-compose up
```
Now you can access to the React client through http://localhost:3000 and the Node API through http://localhost:5000

##Running the server tests with coverage
```bash
  docker exec pokeapi_server npm run test-coverage
```

##Running the server linter
```bash
  docker exec pokeapi_server npm run lint
```

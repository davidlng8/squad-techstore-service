# squad-techstore-service
#### _REST API service connecting to PostgreSQL for relational data storage and CRUD Operations_

## Technology

*squad-techstore-service* uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [PostgreSQL] - a powerful, open source object-relational database

## Local Setup (Quick start)

Squad-techstore-service requires [Docker](https://www.docker.com/) v20+ to run. All application dependencies will be packaged within the docker containers.

```sh
cd squad-techstore-service
cp .env.example .env
docker compose up --build
```

After copying the .env file you may configure it to set your preferred ports and PostgreSQL authentication configurations.

Using any http client of your choice (Postman, cURL etc) you can begin querying against the API service in the following ways
- GET http://localhost:{PORT}/api-items - Get a list of all items
- GET http://localhost:{PORT}/api-items/{numeric ID} - Get a specific item by ID if it exists
- DELETE http://localhost:{PORT}/api-items/{numeric ID} - Get a specific item by ID if it exists
- PUT http://localhost:{PORT}/api-items/{numeric ID} - Update a specific item if it exists
   - Include the headers "Content-type" : "application/json"
   - Inlude a JSON body ```json {'name' : string, 'price' : number, 'description' : string}```
- POST http://localhost:{PORT}/api-items/ - Add a new item to the service DB
   - Include the headers "Content-type" : "application/json"
   - Inlude a JSON body ```json {'name' : string, 'price' : number, 'description' : string}```

### Running the unit tests

Once the App is started, either in the docker container or otherwise, you may run the unit tests using [Jest](https://jestjs.io/) + [Supertest](https://www.npmjs.com/package/supertest)

```sh
npm test
```

## License

MIT


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [node.js]: <http://nodejs.org>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [PostgreSQL]: <https://www.postgresql.org/>

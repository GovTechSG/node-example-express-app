## Node.js Example Project


### Running the App
Install all dependencies using `npm`.
```bash
npm install
```

Ensure that you have MongoDB running and listening to port 27017.
For ease of development, use the following `docker-compose` command.
```bash
docker-compose up mongo
```

Run the app by running the following command.
```bash
node bin/www.js
```

For development, it's useful to restart the application whenever you make changes. Using [`nodemon`](https://github.com/remy/nodemon) helps in this regard.

```bash
npm install --global nodemon

nodemon bin/www.js
```

Use the following `docker-compose` command to up the entire application stack.
```bash
docker-compose up
```

### Project Structure

The following table describes a standard directory structure for a web application. Refer to this [blog post](https://samloh84.github.io/blog/application-development/2018/12/06/anatomy-of-an-application.html).

| Path | Description |
|---|---|
| bin | Important binaries and scripts |
| config | Configuration files for the project |
| daos | Data access objects that couple the application to the ODM/ORM library |
| models | Domain Model definitions, usually written using the ODM/ORM library |  
| routes | The defined REST API routes and their business logic |
| services | Services used by the Express application
| util | Static utilities to store commonly used code |


### Application Setup

To start off from scratch, you can install the Express generator.
```bash
npm install --global express-generator

express new-app
```

#### Libraries

The following Express middleware are used:
| Library | Purpose | npm install |
|---|---|---|
| [morgan](https://www.npmjs.com/package/morgan)<br/>[<sub>Docs</sub>](https://github.com/expressjs/morgan) | Logs requests received by Express | `npm install --save morgan` |
| [multer](https://www.npmjs.com/package/multer)<br/>[<sub>Docs</sub>](https://github.com/expressjs/multer) | Processes multipart requests | `npm install --save multer` |
| [connect-rid](https://www.npmjs.com/package/connect-rid)<br/>[<sub>Docs</sub>](https://github.com/expressjs/connect-rid) | Adds a unique request ID to each header. Good for debugging. | `npm install --save connect-rid` |
| [serve-static](https://www.npmjs.com/package/serve-static)<br/>[<sub>Docs</sub>](https://github.com/expressjs/serve-static) | Enables Express to serve static files | `npm install --save serve-static` |
| [serve-favicon](https://www.npmjs.com/package/serve-favicon)<br/>[<sub>Docs</sub>](https://github.com/expressjs/serve-favicon) | Enables Express to serve a favicon file | `npm install --save serve-favicon` |

The following libraries are used:
| Library | Purpose | npm install |
|---|---|---|
| [Lodash](https://www.npmjs.com/package/lodash)<br/>[<sub>Docs</sub>](https://lodash.com/) | Utility functions for working with objects and arrays. | `npm install --save lodash` |
| [Moment.js](https://www.npmjs.com/package/moment)<br/>[<sub>Docs</sub>](http://momentjs.com/) | Utility functions for working with date and time. | `npm install --save moment` |
| [bluebird](https://www.npmjs.com/package/bluebird)<br/>[<sub>Docs</sub>](http://bluebirdjs.com/docs/getting-started.html) | My library of choice for working with Promises | `npm install --save bluebird` |
| [SuperAgent](https://www.npmjs.com/package/superagent)<br/>[<sub>Docs</sub>](https://visionmedia.github.io/superagent/) | Library for making HTTP requests | `npm install --save superagent` |
| [Mongoose](https://www.npmjs.com/package/mongoose)<br/>[<sub>Docs</sub>](https://mongoosejs.com/) | Object Document Mapper Library for working with MongoDB | `npm install --save mongoose` |
| [Sequelize](https://www.npmjs.com/package/sequelize)<br/>[<sub>Docs</sub>](https://sequelize.readthedocs.io/en/v3/) | Object relational Mapper Libary for working with SQL databases like PostgreSQL or MySQL | `npm install --save sequelize` |
| [Passport](https://www.npmjs.com/package/passport)<br/>[<sub>Docs</sub>](http://www.passportjs.org/) | Authentication Library to secure your endpoints | `npm install --save passport` |
| [Winston](https://www.npmjs.com/package/winston)<br/>[<sub>Docs</sub>](https://github.com/winstonjs/winston) | Logging Library | `npm install --save winston` |


It's good practice to have a [`.gitignore`](./.gitignore) that excludes `node_modules`, any IDE generated files, configuration and RSA private keys.

### Config
When writing an application that connects to a database, or interacts with a secured API, all of this information is usually stored in a configuration file. I usually write a config loader and import it into my services.

[`config/index.js`](./config/index.js)
 
[`config/config.js`](./config/config.js)

### Services

#### Mongoose ODM
When importing the config, I make sure to check environment variables for configuration overrides, as per the [12-Factor App](https://12factor.net/) spec. This is especially useful when packaging your web application in Docker containers as it enables you to modify configuration at runtime for different environments.

[`services/mongooseService.js`](./services/mongooseService.js)

#### Logging
I always setup a logging service to give me flexibility to send my logs to external log collection endpoints. As I frequently use Docker containers, and as per [12-Factor Application](https://12factor.net/) standards, I usually send all logs to `STDOUT``` and ```STDERR` by default.

[`services/loggingService.js`](./services/loggingService.js)


### Main App
I customize the Express app.js to include all my middleware. I also wire up the `routes` import, where all my controller logic will be placed for each REST API endpoint I define.
[`app.js`](./app.js)


### Models
I earlier setup a `models` import into my `services/mongooseService.js`. You can define rich models in Mongoose with validation, instance and static functions. For ease of creation of the schemas, I import and re-export them in an object that I can loop over to instantiate the Mongoose schemas.

[`models/index.js`](./models/index.js)

[`models/KeyValue.js`](./models/KeyValue.js)

### Routes

Most of the business logic of the application goes into my routes. Each route trigger a function in the dao or services layers and returns a JSON response. 

[`routes/index.js`](./routes/index.js)

The following is an example route that exposes a REST API for working with a domain object.

[`routes/store.js`](./routes/store.js)

### Express Starting Script
I also heavily modify the Express starting script, so that I can support TLS and import all my services. I also implement a listener to exit the application when the `SIGTERM` process signal is received, as per [12-Factor Application](https://12factor.net/) standards.

[`bin/www.js`](./bin/www.js)


### Docker and Docker Compose

 
#### Docker

I also usually write a Dockerfile to package the application. Following this [helpful guide from Node.JS](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

[`Dockerfile`](./Dockerfile)

A `.dockerignore``` file is useful to prevent the humongous ```node_modules` directory from being sent to the Docker host every time you build the Docker image.

[`.dockerignore`](./.dockerignore)


#### Docker Compose
It's also useful to create a `docker-compose.yml` to make it easier to build and run your application services.

[`docker-compose.yml`](./docker-compose.yml)

With the above docker-compose.yml in place, I can run the application together with a supporting MongoDB instance with the following command:
```bash
docker-compose up
```

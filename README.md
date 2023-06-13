<div align="center">
  <h2 align="center">Book A Spot</h2>
</div>

# Deskbird Assessment for Senior Backend Node Engineer 

## About The Project

Build a service in Node, which allows a user based on the permission level (admin or standard) to make CRUD operations for a parking spot booking.This is an ExpressJS application with the following features.

- Typescript all the way
- EsLint, Prettier and Husky integration
- Docker
- Sequelize integration
- Logging
- Error handling in a central place
- Request Validation
- Swagger API documentation
- Dependency Injection using TypeDI
- Setting up Test suites using Jest


## Technologies

The major technologies that were used to build this project are:

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Sequelize](https://sequelize.org/)
- [Docker](https://www.docker.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

Here goes the instructions to get the project up and running.

### Prerequisites

To run this project You will need the following things installed on your machine

- NodeJS
- NPM
- Docker 

### Run with Docker

It's super simple. If you already have Docker installed and running on your machine you can just run

```sh
docker-compose up
```

It will give you 3 things

1. The Express server in development mode (With hot reloading support)
2. A PostgreSQL database server, The credentials are

```sh
DB_HOST = database-layer;
DB_NAME = dbname;
DB_USER = dbuser;
DB_PASSWORD = dbpassword;
```

3. A Database investigation tool named `Adminer` - You can access it from `http://localhost:8080`

If you want to change or update any code you can just make the change and from the console you will see that the server is getting updated.

## Documentation
PS: Please note that the server is not currently hosted, so the URL will become active only after you start the server.
[You can find the full documentation here](https://express-typescript-boilerplate-documentation.vercel.app/)

## Project Structure

The project follows a specific directory structure to keep the code organized and maintainable. Here's an overview of each directory and its purpose:

`/routes`: This directory contains the route files. RegisterS the router in the `index.ts` file located in this directory.

`/controllers`: The /controllers directory is where you'll find the Controller files. These files contain the business logic of your application. 

`/service`: In the /service directory, you'll find the Service classes. These classes handle more specific and complex use cases of your application. They encapsulate and manage the business logic related to these functionalities.

`/repositories`: All the database-related operations reside in the `/repositories` directory.

`/models`: The `/models` directory is used for defining data models for the database.

By following this directory structure, you can easily locate and manage the different components of the project, improving the maintainability and scalability.

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
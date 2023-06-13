# Introducing: ParkEasy

ParkEasy is an ExpressJS application with the following features:

- Written in TypeScript
- Integrated with ESLint, Prettier, and Husky for code quality and formatting
- Dockerized for easy deployment
- Utilizes Sequelize as an ORM for interacting with the PostgreSQL database
- Implements logging for better error tracking and debugging
- Centralized error handling for consistent error responses
- Request validation for ensuring data integrity and security
- Includes Swagger API documentation
- Dependency Injection using TypeDI
- Test suites set up using Jest
- Optimized performance through indexing on the high-read model (Booking).

## Technologies

The major technologies that were used to build this project are:

- [NodeJS](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/)
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

If Docker is already installed and running on your machine, run the following command:

```sh
docker-compose up
```

This command will start the Express server in development mode with hot reloading support, a PostgreSQL database server, and a database investigation tool named Adminer accessible at `http://localhost:8080`.

If you want to change or update any code you can just make the change and from the console you will see that the server is getting updated.

## Documentation
Please note that the server is not currently hosted, so the URL will become active only after you start the server.
[You can find the full documentation here](http://localhost:4000/api-docs/)

## Testing the APIs

To perform testing, follow these steps:

- Seed the database with user data.
- Seed the parking spot data. This is necessary as a successful booking requires an existing parking spot.

By completing these steps, you can ensure a comprehensive testing environment for the functionality of the system.

## Project Structure

The project follows a specific directory structure to keep the code organized and maintainable. Here's an overview of each directory and its purpose:

`/src/routes`: Contains the route files. Register the router in the index.ts file located in this directory.

`/src/controllers`: Contains the Controller files. These files contain the business logic of your application

`/src/service`: Contains the Service classes. These classes handle specific and complex use cases of your application.

`/src/repositories`: Contains the database-related operations.

`/src/models`: Contains the data models for the database.

`/__test__` : Contains the test suite for the project. Use the command yarn test to run the tests.

Following this directory structure allows for easy organization and management of the different components of the project, improving maintainability and scalability.

## License

This project is licensed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>
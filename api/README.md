# BDEO Task Managment

Simple task management application.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Tests](#tests)


## Introduction
The objective of this project is to create a simple task management application where users can add new tasks, view a list of tasks, update existing tasks, and delete tasks. Each task can exist in one of three states: to-do, in-progress, or done.

The backend of the application is developed as a RESTful API, handling business logic and data persistence. It is built using TypeScript with the NestJS framework. The API implements CRUD endpoints for task management, ensuring proper request validation and error handling throughout.

For data storage, MongoDB is used, with a well-defined schema for the tasks collection to efficiently manage task data.

## Features
- CRUD operations for tasks.
- Input validations.
- API documentation with Swagger and Compodoc.
- Unit and e2e tests.

## Prerequisites
- Node.js (version 22.2.0)
- npm (version 10.7.0) or yarn (version 1.22.4)
- Docker and Docker Compose (for MongoDB database)

## Installation

### Install dependencies
```bash
npm install
# or if you use yarn
yarn install
```

### Configure Environment Variables
Create a .env file in the root of the project and set your environment variables. You can use .env.example as a template.

### Start the Database
To start the MongoDB database, use the image defined in docker-compose.yml.
```bash
docker-compose up
```

### Run the Application
```bash
npm run start
# or for development mode
npm run start:dev
```

## API Documentation

### Swagger
The API documentation is automatically generated with Swagger. To access the documentation, start the application and visit:
```bash
http://localhost:5000/api
```

### Compodoc
Additionally, the project uses Compodoc to generate documentation for the codebase. To generate and view the Compodoc documentation, run the following commands:

```bash
npm run compodoc
```

Once the Compodoc server is running, you can view the documentation by visiting:
```bash
http://localhost:8080
```


## Tests
Start the database for testing
```bash
docker-compose -f "docker-compose-test.yml" up
```

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```
# Task Management

A task management application with a client built in Angular 18 and a backend developed using NestJS.

## Introduction

Task Management is a task management application that allows users to create, update, delete, and manage tasks in different states: to-do, in-progress, and done. The project consists of an Angular frontend and a NestJS backend.

## Features

### Client:

- Task management (CRUD operations)
- Intuitive user interface
- Responsive design

### Backend:

- RESTful API to manage business logic and data persistence
- Mongo Database
- CRUD endpoints for tasks


## Prerequisites

- Node.js (version 14 or higher)
- npm (version 10.7.0) or yarn (version 1.22.4)
- Docker and Docker Compose (for MongoDB database)

## Installation
### Install dependencies

Clone the repository and install the dependencies for both the client and backend:

```bash
git clone https://github.com/pablokoll/task-management.git
cd task-management

```

## Configure Environment Variables

Create a .env file in the root of the backend project and set your environment variables. You can use .env.example as a template.

## Running the Application

## Start the Database
To start the MongoDB database, use Docker:
```bash
cd api
docker-compose up

```

### Client
Start the Angular development server:
```bash
cd client
npm run start
# Navigate to http://localhost:4200/

```

### Backend
Start the NestJS application:
```bash
cd api
npm run start
# or for development mode
npm run start:dev

```

## API Documentation

### Swagger
The API documentation is generated with Swagger. Start the backend application and visit:
```bash
http://localhost:5000/api

```

### Compodoc
Generate and view the documentation for the codebase with Compodoc:
```bash
npm run compodoc
# Navigate to http://localhost:8090 (frontend)
# Navigate to http://localhost:8080 (backend)

```

## Additional Help

For more help on Angular CLI, use ng help or check out the Angular CLI Overview and Command Reference page. For more help on NestJS, check out the NestJS Documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

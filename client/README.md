# Task Management (FRONTEND)

Task Management is a task management application built with Angular 18.0.5. This application allows users to create, update, and delete tasks, as well as change their status through an intuitive user interface.

## Features
- Task Management: Create, edit, delete, and change the status of tasks.
- Intuitive User Interface: User-friendly and easy to navigate.
- Responsive Design: Adapts to different screen sizes.


## Prerequisites
- Node.js (version 14 or higher)
- Angular CLI (version 18.0.5)
- A modern web browser (Chrome, Firefox, etc.)

## Installation

Clone the repository:
```bash
git clone https://github.com/pablokoll/task-management.git
cd task-management

```

Install dependencies:
```bash
cd task-management
npm install

```

## Development Server

Run ng serve to start the development server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

## Code Generation
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

## Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

## Running Unit Tests
Run ng test to execute the unit tests via Karma and Jasmine.

Project Structure
```
src/
├── app/
│   ├── components/          # Reusable components of the application
│   ├── models/              # Data models
│   ├── pages/               # Main pages of the application
│   ├── services/            # Business logic and API communication services
│   ├── shared/              # Shared resources (dto, interfaces, etc.)
│   └── app.module.ts        # Main module of the application
├── assets/                  # Static assets (images, fonts, etc.)
├── environments/            # Environment configurations (development, production)
├── index.html               # Main HTML file
├── main.ts                  # Main entry point of the application
└── styles.css               # Global styles

```

## Environment Variables

To manage environment variables without exposing them directly, use the environment.ts file. Ensure you have different configurations for development and production.

## Documentation
This project uses Compodoc for generating documentation. To generate and serve the documentation, run:

```bash
npm run compodoc

```

Navigate to http://localhost:8090/ to view the generated documentation.

## Additional Help
For more help on Angular CLI, use ng help or check out the Angular CLI Overview and Command Reference page.
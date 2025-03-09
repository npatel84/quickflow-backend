# QuickFlow Backend

The backend API service for QuickFlow, an enterprise-grade project management application with agentic capabilities.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: REST + GraphQL
- **Authentication**: JWT-based auth with Passport
- **Validation**: Class Validator & Class Transformer
- **Documentation**: Swagger/OpenAPI

## Features

- **User Authentication**: JWT-based authentication with register, login, and refresh token flows
- **Kanban Board Management**: Create, update, delete, and manage boards and columns
- **Task Management**: Complete CRUD for tasks with assignment, priority, and due dates
- **Comments System**: Discussion threads for tasks
- **Permissions**: Role-based access control for boards and tasks
- **GraphQL API**: Modern API with real-time subscription capabilities

## Database Schema

Key entities in the database:
- Users
- Boards
- Board Columns
- Tasks
- Comments
- Attachments

## Project Structure

```
src/
├── auth/             # Authentication-related components
├── boards/           # Board management
├── comments/         # Comment functionality
├── prisma/           # Database service and schema
├── tasks/            # Task management
├── users/            # User management
└── main.ts           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 15+

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/quickflow.git
cd quickflow-backend
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Set up environment variables in a `.env` file:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/quickflow_db?schema=public"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRATION="1d"
PORT=3030
```

4. Run Prisma migrations to set up the database:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run start:dev
# or
yarn start:dev
```

The API will be available at http://localhost:3030, with Swagger documentation at http://localhost:3030/api.

## API Documentation

API documentation is available through Swagger at `/api` when the server is running.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
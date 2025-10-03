# Areeba Exam Backend

A NestJS backend application built with TypeScript, using Fastify as the HTTP adapter, Prisma ORM for database operations with PostgreSQL, and pnpm as the package manager. The project includes class-validator and class-transformer for request validation and data transformation.

## Features

- 🚀 **NestJS** - Progressive Node.js framework
- ⚡ **Fastify** - Fast and low overhead web framework
- 🗄️ **Prisma ORM** - Next-generation ORM for PostgreSQL
- 📦 **pnpm** - Fast, disk space efficient package manager
- ✅ **class-validator** - Decorator-based validation
- 🔄 **class-transformer** - Transform plain objects to class instances
- 📘 **TypeScript** - Strongly typed programming language

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- PostgreSQL database

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sayad-mallllek/areeba-exam-backend.git
cd areeba-exam-backend
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:
```
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
PORT=3000
```

5. Generate Prisma Client:
```bash
pnpm prisma:generate
```

6. Run database migrations:
```bash
pnpm prisma:migrate
```

## Running the Application

### Development mode
```bash
pnpm start:dev
```

### Production mode
```bash
pnpm build
pnpm start:prod
```

### Debug mode
```bash
pnpm start:debug
```

## Prisma Commands

### Generate Prisma Client
```bash
pnpm prisma:generate
```

### Create and apply migrations
```bash
pnpm prisma:migrate
```

### Open Prisma Studio (Database GUI)
```bash
pnpm prisma:studio
```

## Project Structure

```
areeba-exam-backend/
├── prisma/
│   └── schema.prisma          # Prisma schema definition
├── src/
│   ├── dto/
│   │   └── create-user.dto.ts # Example DTO with validators
│   ├── prisma/
│   │   ├── prisma.module.ts   # Prisma module
│   │   └── prisma.service.ts  # Prisma service
│   ├── app.controller.ts      # Main controller
│   ├── app.module.ts           # Root module
│   ├── app.service.ts          # Main service
│   └── main.ts                 # Application entry point
├── .env.example                # Environment variables example
├── .prettierrc                 # Prettier configuration
├── nest-cli.json               # NestJS CLI configuration
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── tsconfig.build.json         # TypeScript build configuration
```

## API Endpoints

### GET /
Returns a welcome message.

### POST /users
Creates a new user (example endpoint).

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

## Technologies Used

- **NestJS** v11.x - Backend framework
- **Fastify** v5.x - HTTP server
- **Prisma** v6.x - ORM
- **PostgreSQL** - Database
- **TypeScript** v5.x - Programming language
- **class-validator** v0.14.x - Validation library
- **class-transformer** v0.5.x - Transformation library
- **pnpm** v10.x - Package manager

## License

ISC
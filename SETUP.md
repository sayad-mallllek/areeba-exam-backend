# Setup Guide

This guide will help you set up and run the Areeba Exam Backend application.

## Step-by-Step Setup

### 1. Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit the `.env` file and update with your PostgreSQL database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
PORT=3000
```

### 4. Generate Prisma Client

Before building or running the application, you need to generate the Prisma Client:

```bash
pnpm prisma:generate
```

This command will:
- Download the Prisma engines
- Generate the type-safe Prisma Client based on your schema

### 5. Set Up the Database

Create and apply database migrations:

```bash
pnpm prisma:migrate
```

This will:
- Create the database if it doesn't exist
- Apply all pending migrations
- Generate the Prisma Client

### 6. Build the Application

```bash
pnpm build
```

### 7. Run the Application

#### Development mode (with hot-reload)
```bash
pnpm start:dev
```

#### Production mode
```bash
pnpm start:prod
```

The application will start on `http://localhost:3000` (or the PORT specified in your .env file).

## Verification

Once the application is running, you can test it:

### Test the Welcome Endpoint
```bash
curl http://localhost:3000
```

Expected response:
```
Hello World! This is a NestJS backend with Fastify, Prisma, and pnpm!
```

### Test the User Creation Endpoint
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Troubleshooting

### Prisma Client Not Generated

If you see errors like "Module '@prisma/client' has no exported member 'PrismaClient'", run:

```bash
pnpm prisma:generate
```

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Verify your DATABASE_URL in the .env file
3. Check that the database exists or run `pnpm prisma:migrate` to create it

### Port Already in Use

If port 3000 is already in use, change the PORT in your .env file:

```env
PORT=3001
```

## Next Steps

- Explore the Prisma schema in `prisma/schema.prisma`
- View your database with Prisma Studio: `pnpm prisma:studio`
- Add more models to your schema
- Create new modules, controllers, and services using NestJS CLI
- Implement authentication and authorization
- Add more DTOs with class-validator decorators

## Useful Commands

```bash
# Format code
pnpm format

# Open Prisma Studio (Database GUI)
pnpm prisma:studio

# Create a new migration
pnpm prisma:migrate

# Reset database (⚠️ This will delete all data)
npx prisma migrate reset
```

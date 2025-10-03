# Quick Start Guide

Get the Areeba Exam Backend up and running in minutes!

## Prerequisites Check

```bash
# Check Node.js version (should be v18+)
node --version

# Check if pnpm is installed
pnpm --version

# If pnpm is not installed, install it globally
npm install -g pnpm
```

## Installation (5 minutes)

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
cp .env.example .env

# 3. Update DATABASE_URL in .env file with your PostgreSQL credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"

# 4. Generate Prisma Client
pnpm prisma:generate

# 5. Run migrations to create database tables
pnpm prisma:migrate
```

## Running the Application

```bash
# Start in development mode (with hot-reload)
pnpm start:dev
```

The application will be available at `http://localhost:3000`

## Test the API

### Test Welcome Endpoint
```bash
curl http://localhost:3000
```

Expected response:
```
Hello World! This is a NestJS backend with Fastify, Prisma, and pnpm!
```

### Test User Creation with Validation
```bash
# Valid request
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Invalid request (will fail validation)
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J",
    "email": "invalid-email",
    "password": "123"
  }'
```

## Key Features Demonstrated

✅ **NestJS Framework** - Modern, scalable Node.js framework
✅ **Fastify Adapter** - Fast HTTP server (see `src/main.ts`)
✅ **Prisma ORM** - Type-safe database access (see `prisma/schema.prisma`)
✅ **PostgreSQL** - Robust relational database
✅ **class-validator** - Request validation (see `src/dto/create-user.dto.ts`)
✅ **class-transformer** - Automatic DTO transformation
✅ **pnpm** - Fast, efficient package management

## Project Structure Overview

```
areeba-exam-backend/
├── src/
│   ├── main.ts                    # Application entry with Fastify
│   ├── app.module.ts              # Root module
│   ├── app.controller.ts          # Example controller
│   ├── app.service.ts             # Example service
│   ├── dto/
│   │   └── create-user.dto.ts    # DTO with class-validator
│   └── prisma/
│       ├── prisma.module.ts       # Prisma module
│       └── prisma.service.ts      # Prisma service
├── prisma/
│   └── schema.prisma              # Database schema
└── package.json                   # Dependencies and scripts
```

## Common Commands

```bash
# Development
pnpm start:dev          # Start with hot-reload
pnpm build              # Build for production
pnpm start:prod         # Start production server

# Prisma
pnpm prisma:generate    # Generate Prisma Client
pnpm prisma:migrate     # Create and apply migrations
pnpm prisma:studio      # Open database GUI

# Code Quality
pnpm format             # Format code with Prettier
```

## Next Steps

1. **Explore the Code**: Check out the example DTO in `src/dto/create-user.dto.ts`
2. **Add More Models**: Edit `prisma/schema.prisma` and run migrations
3. **Create New Endpoints**: Use NestJS CLI to generate resources
4. **View Database**: Run `pnpm prisma:studio` to see your data
5. **Read Full Documentation**: See `README.md` and `SETUP.md`

## Need Help?

- 📖 [NestJS Documentation](https://docs.nestjs.com)
- 📖 [Prisma Documentation](https://www.prisma.io/docs)
- 📖 [Fastify Documentation](https://fastify.dev)
- 📖 [class-validator Documentation](https://github.com/typestack/class-validator)

## Troubleshooting

**Port already in use?**
- Change `PORT` in `.env` file

**Database connection error?**
- Check `DATABASE_URL` in `.env` file
- Ensure PostgreSQL is running

**Prisma Client not found?**
- Run `pnpm prisma:generate`

For detailed troubleshooting, see `SETUP.md`.

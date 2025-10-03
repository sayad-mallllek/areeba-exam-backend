# Architecture Overview

## Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    Areeba Exam Backend                       │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐
│   TypeScript     │  │     NestJS       │  │    Fastify      │
│   (Language)     │  │   (Framework)    │  │  (HTTP Server)  │
└──────────────────┘  └──────────────────┘  └─────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐
│  class-validator │  │ class-transformer│  │     Prisma      │
│  (Validation)    │  │ (Transformation) │  │     (ORM)       │
└──────────────────┘  └──────────────────┘  └─────────────────┘

┌──────────────────┐  ┌──────────────────┐
│   PostgreSQL     │  │      pnpm        │
│   (Database)     │  │ (Package Manager)│
└──────────────────┘  └──────────────────┘
```

## Application Flow

```
┌──────────────┐
│   Client     │
│   Request    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│         Fastify HTTP Server          │
│  (Fast, low-overhead web framework)  │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│       NestJS Application Core        │
│   ┌──────────────────────────────┐   │
│   │    ValidationPipe            │   │
│   │  (class-validator)           │   │
│   └──────────┬───────────────────┘   │
│              │                        │
│              ▼                        │
│   ┌──────────────────────────────┐   │
│   │    Controllers               │   │
│   │  (Handle HTTP requests)      │   │
│   └──────────┬───────────────────┘   │
│              │                        │
│              ▼                        │
│   ┌──────────────────────────────┐   │
│   │    Services                  │   │
│   │  (Business Logic)            │   │
│   └──────────┬───────────────────┘   │
│              │                        │
│              ▼                        │
│   ┌──────────────────────────────┐   │
│   │    Prisma Service            │   │
│   │  (Database Access Layer)     │   │
│   └──────────┬───────────────────┘   │
└──────────────┼───────────────────────┘
               │
               ▼
      ┌────────────────┐
      │   PostgreSQL   │
      │    Database    │
      └────────────────┘
```

## Project Structure

```
areeba-exam-backend/
│
├── src/                           # Source code
│   ├── main.ts                    # Application bootstrap
│   │   ├── Creates NestJS app with Fastify
│   │   ├── Configures ValidationPipe globally
│   │   └── Starts server on specified port
│   │
│   ├── app.module.ts              # Root application module
│   │   └── Imports: PrismaModule
│   │
│   ├── app.controller.ts          # Example HTTP controller
│   │   ├── GET /                  # Returns welcome message
│   │   └── POST /users            # Creates user (demo)
│   │
│   ├── app.service.ts             # Example service
│   │   └── Business logic methods
│   │
│   ├── dto/                       # Data Transfer Objects
│   │   └── create-user.dto.ts    # User creation DTO
│   │       ├── Uses @IsNotEmpty()
│   │       ├── Uses @IsEmail()
│   │       ├── Uses @MinLength()
│   │       └── Validated automatically
│   │
│   └── prisma/                    # Prisma integration
│       ├── prisma.module.ts       # Global Prisma module
│       └── prisma.service.ts      # Prisma service
│           ├── Extends PrismaClient
│           ├── Connects on init
│           └── Disconnects on destroy
│
├── prisma/                        # Prisma configuration
│   └── schema.prisma              # Database schema
│       ├── Generator config
│       ├── Datasource (PostgreSQL)
│       └── Models (e.g., User)
│
├── Configuration Files
│   ├── tsconfig.json              # TypeScript configuration
│   ├── tsconfig.build.json        # Build-specific TS config
│   ├── nest-cli.json              # NestJS CLI configuration
│   ├── package.json               # Dependencies & scripts
│   ├── .prettierrc                # Code formatting rules
│   ├── .env.example               # Environment variables template
│   └── .gitignore                 # Git ignore rules
│
└── Documentation
    ├── README.md                  # Main documentation
    ├── SETUP.md                   # Detailed setup guide
    ├── QUICKSTART.md              # Quick start guide
    └── ARCHITECTURE.md            # This file
```

## Component Descriptions

### 1. NestJS Framework
- **Purpose**: Provides scalable application architecture
- **Features**: 
  - Modular structure
  - Dependency injection
  - Decorator-based routing
  - Middleware support

### 2. Fastify Adapter
- **Purpose**: High-performance HTTP server
- **Benefits**:
  - Fast request handling
  - Low overhead
  - Schema-based validation support
  - Better performance than Express

### 3. Prisma ORM
- **Purpose**: Type-safe database access
- **Features**:
  - Auto-generated type-safe client
  - Migration system
  - Query builder
  - Database GUI (Prisma Studio)
- **Integration**: Global module accessible everywhere

### 4. class-validator & class-transformer
- **Purpose**: Request validation and transformation
- **Usage**:
  - DTOs decorated with validation rules
  - Automatic validation in ValidationPipe
  - Type coercion and transformation
  - Custom validation messages

### 5. PostgreSQL
- **Purpose**: Primary data storage
- **Benefits**:
  - ACID compliance
  - Robust features
  - Excellent Prisma support

### 6. pnpm
- **Purpose**: Package management
- **Benefits**:
  - Faster than npm/yarn
  - Disk space efficient
  - Strict dependency resolution

## Request Lifecycle Example

```
POST /users with JSON body
       │
       ▼
1. Fastify receives HTTP request
       │
       ▼
2. NestJS routes to AppController
       │
       ▼
3. ValidationPipe validates CreateUserDto
   - Checks @IsNotEmpty()
   - Checks @IsEmail()
   - Checks @MinLength()
   - Transforms to class instance
       │
       ▼
4. If valid, calls AppService.createUser()
       │
       ▼
5. Service processes business logic
   (Could use PrismaService for DB operations)
       │
       ▼
6. Returns response via Fastify
       │
       ▼
7. Client receives JSON response
```

## Data Flow: Validation Example

```typescript
// 1. Client sends request
POST /users
Content-Type: application/json
{
  "name": "J",              // Too short (min 2)
  "email": "invalid",       // Not an email
  "password": "123"         // Too short (min 6)
}

// 2. ValidationPipe processes with class-validator
CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)    ❌ FAILS: "J" has length 1
  name: string;

  @IsNotEmpty()
  @IsEmail()       ❌ FAILS: "invalid" is not email
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)    ❌ FAILS: "123" has length 3
  password: string;
}

// 3. Returns validation error response
{
  "statusCode": 400,
  "message": [
    "name must be longer than or equal to 2 characters",
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

## Database Schema Example

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

After running `pnpm prisma:generate`, Prisma generates:

```typescript
// Available in code after generation
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Type-safe database queries
await prisma.user.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    password: "hashed_password"
  }
});

await prisma.user.findUnique({
  where: { email: "john@example.com" }
});
```

## Scalability Considerations

### Current Setup
- ✅ Modular architecture (easy to add modules)
- ✅ Type-safe at compile-time
- ✅ Fast HTTP server (Fastify)
- ✅ Efficient package management (pnpm)
- ✅ Database migrations for versioning

### Future Enhancements
- Add authentication (JWT, Passport)
- Add authorization (Guards, Roles)
- Add caching (Redis)
- Add rate limiting
- Add logging (Winston, Pino)
- Add testing (Jest, Supertest)
- Add API documentation (Swagger)
- Add GraphQL (optional alternative to REST)
- Add message queues (Bull, RabbitMQ)
- Add microservices communication

## Development Workflow

```
1. Define database schema in schema.prisma
   ↓
2. Run: pnpm prisma:migrate
   (Creates migration and updates database)
   ↓
3. Run: pnpm prisma:generate
   (Generates type-safe Prisma Client)
   ↓
4. Create DTOs with class-validator decorators
   ↓
5. Create controllers, services, modules
   ↓
6. Run: pnpm start:dev
   (Start with hot-reload)
   ↓
7. Test endpoints
   ↓
8. Run: pnpm build
   (Build for production)
   ↓
9. Run: pnpm start:prod
   (Start production server)
```

## Key Design Decisions

1. **Fastify over Express**: Chosen for better performance and lower overhead
2. **Prisma over TypeORM**: Chosen for better TypeScript support and developer experience
3. **pnpm over npm/yarn**: Chosen for speed and disk efficiency
4. **Global ValidationPipe**: Ensures all endpoints are validated by default
5. **Global PrismaModule**: Makes database access available everywhere
6. **DTO-first approach**: Type safety from client to database

## Performance Characteristics

- **Fastify**: ~30,000 requests/sec (vs Express ~15,000)
- **Prisma**: Type-safe, compiled queries
- **pnpm**: 2-3x faster install than npm
- **NestJS**: Optimized with Fastify adapter
- **TypeScript**: Compile-time checks prevent runtime errors

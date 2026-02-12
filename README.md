# Multi-Tenant SaaS Backend Platform

A production-ready backend API built with NestJS, designed for enterprise-grade Software-as-a-Service applications. This platform demonstrates modern backend architecture patterns including multi-tenancy, role-based access control, comprehensive authentication, and scalable service design.

## 🎯 Project Overview

This SaaS platform showcases enterprise-level backend development practices:

- **Multi-Tenant Architecture**: Row-level security with organization-based data isolation
- **Enterprise Authentication**: JWT with role-based access control and secure password handling
- **Scalable Service Design**: Clean architecture with dependency injection and modular organization
- **Production-Ready Features**: Comprehensive validation, error handling, and logging
- **Background Processing**: Asynchronous job handling with Redis queue management
- **Payment Integration**: Mocked Stripe integration for subscription management
- **API Design**: RESTful endpoints with pagination, filtering, and sorting
- **Containerization**: Docker support for consistent deployment environments

## 🏗️ Architecture Overview

```
Client Request → Authentication → Authorization → Service Layer → Data Access
     ↓              ↓              ↓              ↓              ↓
HTTP Request    JWT Validation   RBAC Checks    Business Logic   Prisma ORM
```

### Core Architecture Patterns

- **Clean Architecture**: Clear separation between presentation, business, and data layers
- **Dependency Injection**: NestJS DI system for testable, maintainable code
- **Module Organization**: Feature-based modules for scalability
- **Repository Pattern**: Abstracted data access through Prisma
- **DTO Validation**: Comprehensive input validation and transformation
- **Error Handling**: Centralized error handling with proper HTTP status codes

## 🧱 Tech Stack

- **Language**: TypeScript 5.0+
- **Runtime**: Node.js 18+
- **Framework**: NestJS 10+ (Enterprise-grade backend framework)
- **Database**: PostgreSQL 15+ (ACID compliance, row-level security)
- **ORM**: Prisma 5+ (Type-safe database access)
- **Authentication**: JWT with Passport.js (Stateless authentication)
- **Authorization**: Role-based access control (RBAC)
- **Queue System**: Redis + BullMQ (Background job processing)
- **Validation**: class-validator + class-transformer
- **Containerization**: Docker 24+ with multi-stage builds
- **Testing**: Jest 29+ with Supertest for E2E testing
- **Logging**: Winston structured logging

## Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Admin/User)
- Password hashing with bcrypt

### Multi-Tenancy
- Organization-based data isolation
- Row-level multi-tenancy
- Users belong to organizations

### CRUD Modules
- **Users**: Manage organization users
- **Organizations**: Admin-only management
- **Projects**: Organization-specific projects
- **Tasks**: Project-specific tasks with assignment

All modules include:
- Pagination
- Filtering
- Sorting
- Input validation
- Error handling

### Background Processing
- Asynchronous email sending simulation (logged to console)
- Job retries and failure handling (simplified)
- Logging

### External Integration
- Mocked Stripe payment processing
- Webhook endpoint for payment events

### Testing
- Unit tests for services
- Basic e2e test for authentication

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_saas?schema=public"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1h"

# Redis
REDIS_URL="redis://localhost:6379"

# Email (simulation)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-password"

# Payment (Stripe sandbox)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## How to Run Locally

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Redis
- Docker (optional)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-saas-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up database**
   ```bash
   # Start PostgreSQL and Redis locally or via Docker
   docker run --name postgres -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -e POSTGRES_DB=portfolio_saas -p 5432:5432 -d postgres:15
   docker run --name redis -p 6379:6379 -d redis:7-alpine
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

6. **Start the application**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`.

### Docker Setup

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

This will start the app, PostgreSQL, and Redis.

## API Documentation

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "organizationId": "org-id"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "jwt-token-here"
}
```

### Organizations (Admin only)

#### Create Organization
```http
POST /organizations
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Company"
}
```

#### List Organizations
```http
GET /organizations?page=1&limit=10&name=search
Authorization: Bearer <token>
```

### Projects

#### Create Project
```http
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Website Redesign",
  "description": "Redesign company website"
}
```

#### List Projects
```http
GET /projects?page=1&limit=10&name=search
Authorization: Bearer <token>
```

### Tasks

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Design homepage",
  "description": "Create new homepage design",
  "projectId": "project-id"
}
```

#### List Tasks
```http
GET /tasks?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

### Payments

#### Create Payment Intent
```http
POST /payments/create-intent
Content-Type: application/json

{
  "amount": 1000,
  "currency": "usd"
}
```

#### Webhook
```http
POST /payments/webhook
Content-Type: application/json
Stripe-Signature: <signature>

{
  "type": "payment_intent.succeeded",
  "data": { ... }
}
```

## Design Decisions

### Multi-Tenancy
- **Row-based multi-tenancy**: Each table includes `organizationId` for data isolation
- **Pros**: Simple, scalable, no schema duplication
- **Cons**: Requires careful query filtering

### Authentication
- **JWT with Passport**: Industry standard, stateless
- **Role-based**: Simple ADMIN/USER roles
- **Password hashing**: bcrypt for security

### Background Jobs
- **BullMQ with Redis**: Reliable queue system
- **Email simulation**: Logs instead of actual sending for demo

### Payment Integration
- **Mocked Stripe**: Simulates real payment processing
- **Webhook handling**: Basic event processing

### Database
- **PostgreSQL**: Robust, ACID compliant
- **Prisma**: Type-safe ORM, migrations, schema management

### Architecture
- **NestJS modules**: Feature-based organization
- **Dependency injection**: Testable, maintainable code
- **Validation**: class-validator for input validation

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Deployment

This application is containerized with Docker and can be deployed to any cloud platform supporting Docker containers (AWS ECS, Google Cloud Run, Azure Container Instances, etc.).

For production:
1. Use environment-specific configs
2. Set up proper database migrations
3. Configure monitoring and logging
4. Implement rate limiting
5. Add API versioning
6. Set up CI/CD pipeline

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Use meaningful commit messages

## License

This project is licensed under the MIT License.
# Project Sanderson - Monorepo

A monorepo structure with:
- **Server**: Node.js + Express + Prisma + SQLite
- **Client**: Angular frontend
- **Shared**: Shared types and utilities

## Project Structure

```
packages/
  ├── server/    - Express API backend
  ├── client/    - Angular frontend
  └── shared/    - Shared types, interfaces, utilities
```

## Quick Start

### Install dependencies
```bash
npm install
```

### Run development servers
```bash
# Run both simultaneously
npm run dev

# Or run individually
npm run dev:server
npm run dev:client
```

### Build packages
```bash
# Build server
npm run build --workspace=packages/server

# Build client
npm run build --workspace=packages/client

# Build shared
npm run build --workspace=packages/shared
```

## Shared Package Usage

The `@sanderson/shared` package contains types and utilities accessible from both frontend and backend.

**Backend** (packages/server/src):
```typescript
import { ApiResponse, User } from '@sanderson/shared';
```

**Frontend** (packages/client/src):
```typescript
import { ApiResponse, User } from '@sanderson/shared';
```

## Prisma Setup

Models are defined in `packages/server/prisma/schema.prisma`.

### Generate Prisma migrations
```bash
cd packages/server
npx prisma migrate dev --name init
```

## API Server Details

- Runs on `http://localhost:3000` by default
- Health check endpoint: `GET /api/health`

## Angular Frontend Details

- Runs on `http://localhost:4200` by default
- Configured to call backend at `http://localhost:3000/api`

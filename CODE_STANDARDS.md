# Code Standards & Quality Tools

This monorepo includes comprehensive code quality tools to maintain consistency and standards across the frontend, backend, and shared packages.

## Tools Installed

### Linting & Formatting
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatter
- **@angular-eslint** - Angular-specific linting rules
- **@typescript-eslint** - TypeScript-specific ESLint rules

### Testing
- **Jest** - Testing framework (backend/shared)
- **ng test** - Angular testing (built into Angular)

### Git Hooks
- **Husky** - Git hooks manager
- **lint-staged** - Run linters on staged files

## Available Commands

### Linting
```bash
# Lint all packages
npm run lint

# Fix linting errors automatically
npm run lint:fix

# Lint specific package
npm run lint --workspace=packages/server
npm run lint --workspace=packages/client
npm run lint --workspace=packages/shared
```

### Testing
```bash
# Run all tests once
npm run test

# Run tests with coverage
npm run test:cov

# Watch mode for specific package
npm run test:watch --workspace=packages/server
npm run test:watch --workspace=packages/client
npm run test:watch --workspace=packages/shared
```

### Code Formatting
```bash
# Format all code files
npm run format

# Format specific directory
prettier --write packages/server/src
```

## Pre-commit Hooks

Husky v10+ automatically runs the following checks before each commit:
- **Prettier** - Ensures code formatting consistency

**Note**: ESLint linting is run via `npm run lint` command (see Recommended Workflow below). It's not in pre-commit to fail faster and avoid blocking commits.

### Recommended Workflow:

```bash
# 1. Before committing, run linting
npm run lint

# 2. Fix any issues
npm run lint:fix
npm run format

# 3. Stage and commit (pre-commit will format files with Prettier)
git add .
git commit -m "your message"
```

If pre-commit formatting fails, fix with:
```bash
npm run format
git add .
git commit
```

## Adding Tests

### Backend (Jest)
Create test files with `.spec.ts` or `.test.ts` suffix:
```typescript
// packages/server/src/services/example.spec.ts
describe('Example Service', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

### Frontend (Angular/Karma)
Test files are created with `.spec.ts` suffix (handled by Angular CLI):
```bash
ng generate component my-component
# Creates my-component.spec.ts automatically
```

### Shared Package (Jest)
Same as backend, use `.spec.ts` or `.test.ts`:
```typescript
// packages/shared/src/types.spec.ts
describe('Shared Types', () => {
  it('should validate types', () => {
    // Add your type validation tests
  });
});
```

## ESLint Rules

### Common Rules
- No unused variables (with `_` prefix exception)
- No explicit `any` types
- Proper TypeScript type annotations

### Disabling Rules
If you need to disable a rule for a specific line:
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const value: any = something;
```

## Prettier Configuration

Default settings in `.prettierrc`:
- **Semi-colons**: Yes (`;`)
- **Single quotes**: Yes (`'`)
- **Print width**: 100 characters
- **Tab width**: 2 spaces
- **Trailing comma**: ES5 style

Override Prettier for specific files by adding patterns to `.prettierignore`.

## CI/CD Integration

For GitHub Actions, add to your workflow:
```yaml
- name: Lint
  run: npm run lint

- name: Test
  run: npm run test:cov

- name: Format Check
  run: npx prettier --check "packages/**/*.{ts,tsx,html,css,json}"
```

## Troubleshooting

### Pre-commit hook not running
```bash
# Re-initialize Husky
npx husky install
```

### ESLint can't find rules
```bash
# Reinstall dependencies
npm install
```

### TypeScript errors in IDE
Make sure your IDE has TypeScript support enabled and `tsconfig.json` is properly configured.

## Next Steps

1. Create unit tests for new features
2. Keep code formatted with `npm run format`
3. Review ESLint warnings before committing
4. Maintain >80% code coverage for critical paths

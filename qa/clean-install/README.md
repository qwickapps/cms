# Clean Install Validation

This directory contains validation tests to ensure `@qwickapps/cms` works correctly when installed in a fresh environment (not from monorepo).

## What It Tests

1. **Package Installation** - Verifies the package installs without errors
2. **TypeScript Compilation** - Validates all type definitions work
3. **Subpath Exports** - Tests all subpath exports (collections, blocks, plugins, etc.)
4. **Logging Module** - Validates optional logging dependencies work correctly
5. **Type Definitions** - Ensures TypeScript types are properly exported

## Running the Test

```bash
# From the package directory
./qa/clean-install/validate.sh
```

## Requirements

- Docker (for isolated environment testing)
- npm (for package creation)

## How It Works

1. Builds the package and creates an npm tarball
2. Spins up a fresh Docker container with Node.js
3. Installs the tarball with peer dependencies
4. Runs TypeScript type checking
5. Executes export verification tests
6. Reports success or failure

## Peer Dependencies Note

This package has many peer dependencies (Payload CMS, Next.js, React, etc.). The validation:
- Installs minimal peer dependencies needed for type checking
- Focuses on TypeScript compilation and export verification
- Does not test full runtime behavior (that requires a complete Payload/Next.js setup)

## When to Run

- Before publishing to npm
- After making changes to exports or types
- As part of CI/CD pipeline
- When debugging installation issues

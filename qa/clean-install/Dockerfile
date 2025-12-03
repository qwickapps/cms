# Clean Environment Test for @qwickapps/cms
# This Dockerfile simulates a fresh installation environment

FROM node:20-slim

ARG TARBALL

WORKDIR /app

# Copy and install the package tarball
COPY ${TARBALL} ./package.tgz
RUN npm init -y && \
    npm pkg set type="module"

# Install peer dependencies (minimal set for type checking)
# Note: We install stubs/types where possible to avoid full runtime dependencies
RUN npm install \
    react@19 \
    react-dom@19 \
    @types/react@19 \
    @types/react-dom@19 \
    next@15 \
    payload@3 \
    @payloadcms/next@3 \
    @payloadcms/db-postgres@3 \
    @payloadcms/richtext-lexical@3 \
    @payloadcms/ui@3 \
    @mui/material@6 \
    @mui/icons-material@6 \
    @emotion/react \
    @emotion/styled \
    @qwickapps/react-framework \
    @qwickapps/schema \
    --legacy-peer-deps

# Install the CMS package
RUN npm install ./package.tgz --legacy-peer-deps

# Copy test files
COPY qa/clean-install/test-cms.ts ./test-cms.ts
COPY qa/clean-install/tsconfig.json ./tsconfig.json

# Install TypeScript and tsx
RUN npm install typescript @types/node tsx --save-dev --legacy-peer-deps

# Run TypeScript type checking
RUN npx tsc --noEmit

# Run the test
RUN npx tsx test-cms.ts

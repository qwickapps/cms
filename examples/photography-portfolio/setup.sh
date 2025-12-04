#!/bin/bash

# ============================================
# Photography Portfolio - Interactive Setup
# ============================================
# A colorful, idempotent setup script that works with:
# - Docker (recommended)
# - Local PostgreSQL
# - Custom database URL
# ============================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Icons
CHECK="✓"
CROSS="✗"
ARROW="→"
CAMERA="📷"
DATABASE="🗄️"
ROCKET="🚀"

# Print functions
print_header() {
    echo ""
    echo -e "${MAGENTA}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${MAGENTA}${BOLD}   $CAMERA  Photography Portfolio - Setup   $CAMERA${NC}"
    echo -e "${MAGENTA}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_step() {
    echo -e "${CYAN}${BOLD}$ARROW $1${NC}"
}

print_success() {
    echo -e "${GREEN}  $CHECK $1${NC}"
}

print_error() {
    echo -e "${RED}  $CROSS $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}  ! $1${NC}"
}

print_info() {
    echo -e "${WHITE}  $1${NC}"
}

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Docker is running
docker_running() {
    docker info >/dev/null 2>&1
}

# Check if PostgreSQL is running locally
postgres_local_running() {
    pg_isready -q 2>/dev/null || psql -c "SELECT 1" postgres >/dev/null 2>&1
}

# Main setup
print_header

# Step 1: Check prerequisites
print_step "Checking prerequisites..."

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node -v)
    print_success "Node.js $NODE_VERSION"
else
    print_error "Node.js not found. Please install Node.js 20+"
    exit 1
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm -v)
    print_success "npm $NPM_VERSION"
else
    print_error "npm not found"
    exit 1
fi

echo ""

# Step 2: Database selection
print_step "Select database option:"
echo ""

# Detect available options
DOCKER_AVAILABLE=false
LOCAL_PG_AVAILABLE=false

if command_exists docker && docker_running; then
    DOCKER_AVAILABLE=true
fi

if command_exists psql || command_exists pg_isready; then
    LOCAL_PG_AVAILABLE=true
fi

# Display options
echo -e "  ${CYAN}1)${NC} ${BOLD}Docker PostgreSQL${NC} (recommended)"
if $DOCKER_AVAILABLE; then
    echo -e "     ${GREEN}Docker is available${NC}"
else
    echo -e "     ${YELLOW}Docker not detected${NC}"
fi

echo ""
echo -e "  ${CYAN}2)${NC} ${BOLD}Local PostgreSQL${NC}"
if $LOCAL_PG_AVAILABLE; then
    echo -e "     ${GREEN}PostgreSQL client found${NC}"
else
    echo -e "     ${YELLOW}PostgreSQL not detected${NC}"
fi

echo ""
echo -e "  ${CYAN}3)${NC} ${BOLD}Custom Database URL${NC}"
echo -e "     Enter your own connection string"

echo ""
read -p "$(echo -e ${WHITE}Select option [1-3]: ${NC})" DB_OPTION

case $DB_OPTION in
    1)
        # Docker PostgreSQL
        if ! $DOCKER_AVAILABLE; then
            print_error "Docker is not available. Please install Docker or choose another option."
            exit 1
        fi

        echo ""
        print_step "Starting Docker PostgreSQL..."

        # Check if container already exists
        if docker ps -a --format '{{.Names}}' | grep -q "photography-portfolio-db"; then
            if docker ps --format '{{.Names}}' | grep -q "photography-portfolio-db"; then
                print_success "PostgreSQL container already running"
            else
                docker start photography-portfolio-db >/dev/null 2>&1
                print_success "Started existing PostgreSQL container"
            fi
        else
            docker-compose -f docker-compose.dev.yml up -d
            print_success "Created and started PostgreSQL container"
        fi

        # Wait for database to be ready
        print_info "Waiting for database to be ready..."
        for i in {1..30}; do
            if docker exec photography-portfolio-db pg_isready -U postgres >/dev/null 2>&1; then
                print_success "Database is ready"
                break
            fi
            sleep 1
        done

        DATABASE_URL="postgresql://postgres:postgres@localhost:5433/photography"
        ;;

    2)
        # Local PostgreSQL
        echo ""
        print_step "Configuring local PostgreSQL..."

        # Ask for connection details
        echo ""
        read -p "$(echo -e ${WHITE}Database host [localhost]: ${NC})" PG_HOST
        PG_HOST=${PG_HOST:-localhost}

        read -p "$(echo -e ${WHITE}Database port [5432]: ${NC})" PG_PORT
        PG_PORT=${PG_PORT:-5432}

        read -p "$(echo -e ${WHITE}Database name [photography]: ${NC})" PG_DB
        PG_DB=${PG_DB:-photography}

        read -p "$(echo -e ${WHITE}Database user [postgres]: ${NC})" PG_USER
        PG_USER=${PG_USER:-postgres}

        read -s -p "$(echo -e ${WHITE}Database password: ${NC})" PG_PASS
        echo ""

        DATABASE_URL="postgresql://${PG_USER}:${PG_PASS}@${PG_HOST}:${PG_PORT}/${PG_DB}"

        # Try to create database if it doesn't exist
        if command_exists createdb; then
            createdb -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" "$PG_DB" 2>/dev/null || true
        fi
        ;;

    3)
        # Custom URL
        echo ""
        read -p "$(echo -e ${WHITE}Enter PostgreSQL connection URL: ${NC})" DATABASE_URL

        if [[ -z "$DATABASE_URL" ]]; then
            print_error "Database URL cannot be empty"
            exit 1
        fi
        ;;

    *)
        print_error "Invalid option"
        exit 1
        ;;
esac

echo ""

# Step 3: Create/update .env file
print_step "Configuring environment..."

# Generate a random secret if not exists
if [[ -f .env ]] && grep -q "PAYLOAD_SECRET" .env; then
    PAYLOAD_SECRET=$(grep "PAYLOAD_SECRET" .env | cut -d '=' -f2)
else
    PAYLOAD_SECRET=$(openssl rand -hex 32 2>/dev/null || head -c 32 /dev/urandom | xxd -p)
fi

cat > .env << EOF
# Database
DATABASE_URL=${DATABASE_URL}

# Payload CMS
PAYLOAD_SECRET=${PAYLOAD_SECRET}

# Public URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
EOF

print_success "Created .env file"

echo ""

# Step 4: Install dependencies
print_step "Installing dependencies..."

if [[ ! -d "node_modules" ]] || [[ ! -f "node_modules/.package-lock.json" ]]; then
    npm install --legacy-peer-deps 2>&1 | tail -5
    print_success "Dependencies installed"
else
    print_success "Dependencies already installed"
fi

echo ""

# Step 5: Seed database
print_step "Seeding database with demo content..."

# Run seed script
npm run seed 2>&1 | grep -E "(Created|Configured|Seed completed|Error)" | while read line; do
    if [[ "$line" == *"Error"* ]]; then
        print_warning "$line"
    else
        print_success "$line"
    fi
done

echo ""

# Success message
echo -e "${GREEN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}${BOLD}   $ROCKET  Setup Complete!   $ROCKET${NC}"
echo -e "${GREEN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${WHITE}${BOLD}Start the development server:${NC}"
echo -e "  ${CYAN}npm run dev${NC}"
echo ""
echo -e "${WHITE}${BOLD}Then open:${NC}"
echo -e "  ${CYAN}http://localhost:3000${NC}       $ARROW  View site"
echo -e "  ${CYAN}http://localhost:3000/admin${NC} $ARROW  Admin panel"
echo ""
echo -e "${WHITE}${BOLD}Demo credentials:${NC}"
echo -e "  Email:    ${CYAN}admin@photography.demo${NC}"
echo -e "  Password: ${CYAN}demo1234${NC}"
echo ""

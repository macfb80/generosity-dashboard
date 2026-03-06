#!/bin/bash

# Generosity™ Sales Engine Dashboard - Installation Script
# Run this script to set up the project for local development

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Generosity™ Sales Engine Dashboard - Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Node.js version
echo "✓ Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18+ required. You have: $(node -v)"
    exit 1
fi
echo "  Node.js version: $(node -v) ✓"
echo ""

# Install dependencies
echo "✓ Installing dependencies..."
npm install
echo ""

# Copy environment file
if [ ! -f .env.local ]; then
    echo "✓ Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "  📝 Remember to update NEXT_PUBLIC_API_BASE_URL if needed"
else
    echo "  .env.local already exists, skipping..."
fi
echo ""

# Verify critical files exist
echo "✓ Verifying project structure..."
REQUIRED_FILES=(
    "app/layout.tsx"
    "app/login/page.tsx"
    "app/app/overview/page.tsx"
    "middleware.ts"
    "lib/api.ts"
    "lib/auth.ts"
    "lib/types.ts"
    "lib/utils.ts"
    "components/layout/AppShell.tsx"
    "components/layout/Sidebar.tsx"
    "public/generosity-logo.svg"
)

MISSING_FILES=()
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo "  All critical files present ✓"
else
    echo "  ❌ Missing files:"
    for file in "${MISSING_FILES[@]}"; do
        echo "    - $file"
    done
    exit 1
fi
echo ""

# Run TypeScript check
echo "✓ Running TypeScript type check..."
npx tsc --noEmit || {
    echo "❌ TypeScript errors found. Fix them before proceeding."
    exit 1
}
echo "  Type check passed ✓"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Installation Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "  1. Review .env.local and update API_BASE_URL if needed"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
echo "For deployment to Vercel, see: DEPLOYMENT.md"
echo ""

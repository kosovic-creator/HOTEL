#!/bin/bash

# Hotel Monorepo Setup Script

echo "🏨 Hotel Monorepo Setup"
echo "======================"
echo ""

# Provera Node.js verzije
if ! command -v node &> /dev/null; then
    echo "❌ Node.js nije instaliran. Instalirajte Node.js 18+ i pokrenite ponovo."
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Instalacija zavisnosti
echo "📦 Instaliranje zavisnosti za sve workspace pakete..."
npm install

# Setup shared-prisma
echo ""
echo "🗄️  Podešavanje shared-prisma..."
cd shared-prisma

if [ ! -f .env ]; then
    echo "⚠️  .env fajl ne postoji u shared-prisma/"
    echo "📝 Kopiram .env.example u .env"
    cp .env.example .env
    echo "⚠️  VAŽNO: Ažurirajte shared-prisma/.env sa pravom DATABASE_URL!"
fi

cd ..

# Generisanje Prisma Client-a
echo ""
echo "🔧 Generisanje Prisma Client-a..."
npm run prisma:generate

echo ""
echo "✅ Setup je završen!"
echo ""
echo "📋 Sledeći koraci:"
echo "   1. Ažurirajte DATABASE_URL u shared-prisma/.env"
echo "   2. Pokrenite migracije: npm run prisma:migrate:dev"
echo "   3. Pokrenite aplikacije: npm run dev"
echo ""
echo "🚀 Spremno za rad!"

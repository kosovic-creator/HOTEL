# 🏨 Hotel Monorepo - Quick Start

## Instalacija (first time)

```bash
cd /Users/drasko/HOTEL

# Instalacija svih zavisnosti
npm install

# Generisanje Prisma Client-a
npm run prisma:generate
```

## Development

```bash
# Pokrenite obe aplikacije istovremeno
npm run dev
```

Aplikacije će biti dostupne na:
- **Admin**: http://localhost:3000
- **Gost**: http://localhost:4000

## Koristan komande

```bash
# Development
npm run dev            # Obe aplikacije
npm run dev:admin      # Samo admin
npm run dev:gost       # Samo gost

# Build
npm run build          # Build obe aplikacije
npm run build:admin    # Build samo admin
npm run build:gost     # Build samo gost

# Prisma/Database
npm run prisma:generate      # Generiši Prisma Client
npm run prisma:migrate:dev   # Kreiraj i primeni migraciju
npm run prisma:studio        # Otvori Prisma Studio
npm run prisma:push          # Push schema (bez migracija)
```

## Struktura

```
/Users/drasko/HOTEL/
├── m-hotel-admin/       # Admin app (port 3000)
├── m-hotel-gost/        # Gost app (port 4000)
├── shared-prisma/       # Shared Prisma schema
│   ├── schema.prisma    # Database schema
│   └── .env             # DATABASE_URL
├── package.json         # Root workspace config
└── README.md            # Detaljne instrukcije
```

## Troubleshooting

**Problem**: Cannot find module '@prisma/client'
**Rešenje**: `npm run prisma:generate`

**Problem**: Port zauzet
**Rešenje**: Admin koristi 3000, Gost koristi 4000 - proverite da li su portovi slobodni

**Problem**: Database connection error
**Rešenje**: Proverite DATABASE_URL u `shared-prisma/.env`

## Vise informacija

- [README.md](README.md) - Kompletna dokumentacija
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Šta se promenilo i kako raditi u monorepo-u

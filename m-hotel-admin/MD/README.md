# Hotel Monorepo

Monorepo za hotel management sistem koji sadrži:

- **m-hotel-admin** - Admin dashboard aplikacija (port 3000)
- **m-hotel-gost** - Gost (client) aplikacija (port 4000)
- **shared-prisma** - Zajednička Prisma database šema

## Struktura

```
hotel-monorepo/
├── m-hotel-admin/        # Admin aplikacija
├── m-hotel-gost/         # Gost aplikacija
├── shared-prisma/        # Zajednička Prisma šema
└── package.json          # Root workspace konfiguracija
```

## Prerequisites

- Node.js 18+
- npm 11+
- PostgreSQL database

## Setup

### 1. Instalacija zavisnosti

```bash
npm install
```

Ova komanda će instalirati zavisnosti za sve workspace pakete.

### 2. Database setup

Kopirajte `.env.example` u `.env` u `shared-prisma/` folderu i podesite DATABASE_URL:

```bash
cd shared-prisma
cp .env.example .env
# Editujte .env i podesite DATABASE_URL
```

### 3. Pokretanje migracija

```bash
npm run prisma:generate
npm run prisma:migrate:dev
```

### 4. Pokretanje aplikacija

Pokretanje obe aplikacije:

```bash
npm run dev
```

Pokretanje samo admin aplikacije:

```bash
npm run dev:admin
```

Pokretanje samo gost aplikacije:

```bash
npm run dev:gost
```

## Dostupne komande

### Development

- `npm run dev` - Pokreće obe aplikacije (admin na 3000, gost na 4000)
- `npm run dev:admin` - Pokreće samo admin aplikaciju
- `npm run dev:gost` - Pokreće samo gost aplikaciju

### Build

- `npm run build` - Build-uje obe aplikacije
- `npm run build:admin` - Build-uje samo admin aplikaciju
- `npm run build:gost` - Build-uje samo gost aplikaciju

### Production

- `npm run start:admin` - Pokreće admin u production modu
- `npm run start:gost` - Pokreće gost u production modu

### Database (Prisma)

- `npm run prisma:generate` - Generiše Prisma Client
- `npm run prisma:migrate:dev` - Kreira i primenjuje migracije
- `npm run prisma:migrate:deploy` - Primenjuje migracije na production
- `npm run prisma:studio` - Otvara Prisma Studio
- `npm run prisma:push` - Push schema promena na database

### Workspace komande

Za rad sa pojedinačnim workspace paketima:

```bash
# Dodavanje zavisnosti u specifični paket
npm install <package> -w m-hotel-admin
npm install <package> -w m-hotel-gost
npm install <package> -w shared-prisma

# Pokretanje komandi u specifičnom paketu
npm run <script> -w <workspace-name>
```

## Aplikacije

### m-hotel-admin

Admin dashboard aplikacija za upravljanje hotelom.

- **URL**: <http://localhost:3000>
- **Features**: Upravljanje sobama, gostima, rezervacijama

### m-hotel-gost

Client-facing aplikacija za goste hotela.

- **URL**: <http://localhost:4000>
- **Features**: Pregled soba, kreiranje rezervacija

## Development workflow

1. Izmene u `shared-prisma/schema.prisma`:

   ```bash
   npm run prisma:migrate:dev
   npm run prisma:generate
   ```

2. Izmene u aplikacijama - hot reload će automatski raditi

3. Dodavanje novih zavisnosti u aplikacije:

   ```bash
   npm install <package> -w m-hotel-admin
   # ili
   npm install <package> -w m-hotel-gost
   ```

## Environment Variables

Svaka aplikacija ima svoj `.env` fajl:

- `m-hotel-admin/.env`
- `m-hotel-gost/.env`
- `shared-prisma/.env`

Obavezno podesite DATABASE_URL u `shared-prisma/.env` pre pokretanja migracija.

## Troubleshooting

### "Cannot find module '@prisma/client'"

Pokrenite:

```bash
npm run prisma:generate
```

### Port već zauzet

Admin koristi port 3000, gost koristi port 4000. Ako su portovi zauzeti, možete ih promeniti u `package.json` skriptama svake aplikacije.

### Database connection error

Proverite da li je DATABASE_URL ispravno podešen u `shared-prisma/.env`.

## Tech Stack

- **Framework**: Next.js 16
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: NextAuth.js
- **Payments**: Stripe (u admin aplikaciji)

## Contributing

Pošto je ovo monorepo, važno je održavati konzistentnost između aplikacija. Primenjujte best practices i testirajte izmene u obe aplikacije kada menjate shared-prisma.

npx eslint . --fix

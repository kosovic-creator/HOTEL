# Migracija na Monorepo

## Šta se promenilo?

### Struktura foldera

**Pre:**
```
/Users/drasko/HOTEL/
├── m-hotel-admin/      # Nezavisna aplikacija sa svojom Prisma šemom
└── m-hotel-gost/       # Nezavisna aplikacija sa svojom Prisma šemom
```

**Posle:**
```
/Users/drasko/HOTEL/
├── m-hotel-admin/      # Admin aplikacija (port 3000)
├── m-hotel-gost/       # Gost aplikacija (port 4000)
├── shared-prisma/      # ⭐ NOVA - Zajednička Prisma šema
└── package.json        # ⭐ NOVO - Root workspace konfiguracija
```

### Prisma

- **Pre**: Svaka aplikacija je imala svoju `prisma/` folder
- **Posle**: Jedna zajednička `shared-prisma/` šema koju dele obe aplikacije

### Import putanje

Import-i su ostali isti:
```typescript
import prisma from '@/lib/prisma';
```

Ali sada obe aplikacije koriste zajednički generisan `@prisma/client` iz `shared-prisma/`.

### Package.json promene

#### m-hotel-admin/package.json
```json
{
  "scripts": {
    "build": "npx prisma generate --schema=../shared-prisma/schema.prisma && next build",
    "postinstall": "npx prisma generate --schema=../shared-prisma/schema.prisma"
  },
  "dependencies": {
    "@hotel/prisma": "*"
  }
}
```

#### m-hotel-gost/package.json
```json
{
  "scripts": {
    "dev": "next dev -p 4000",  // Port 4000 za gost app
    "build": "npx prisma generate --schema=../shared-prisma/schema.prisma && next build",
    "postinstall": "npx prisma generate --schema=../shared-prisma/schema.prisma"
  },
  "dependencies": {
    "@hotel/prisma": "*"
  }
}
```

## Prednosti monorepo strukture

1. **Jedna database šema** - Nema potrebe sinhronizovati promene između dve aplikacije
2. **Zajednički tipovi** - TypeScript tipovi iz Prisma se dele između aplikacija
3. **Atomic migracije** - Jedna migracija za obe aplikacije
4. **Lakše održavanje** - Izmene u database strukturi su na jednom mestu
5. **npm workspaces** - Automatsko međuzavisnice između paketa

## Kako raditi u novom setup-u

### Development

Pokretanje obe aplikacije istovremeno:
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

### Database (Prisma)

Sve Prisma komande su sada centralizovane:

```bash
# Kreiranje nove migracije
npm run prisma:migrate:dev

# Primena migracija na production
npm run prisma:migrate:deploy

# Generisanje Prisma Client-a (automatski se poziva postinstall)
npm run prisma:generate

# Prisma Studio
npm run prisma:studio

# Push schema bez migracija (development)
npm run prisma:push
```

### Dodavanje npm paketa

Za dodavanje paketa u specifičnu aplikaciju:

```bash
# U m-hotel-admin
npm install <package> -w m-hotel-admin

# U m-hotel-gost
npm install <package> -w m-hotel-gost

# U shared-prisma
npm install <package> -w shared-prisma
```

### Workflow za database promene

1. Ažurirajte `shared-prisma/schema.prisma`
2. Pokrenite migraciju: `npm run prisma:migrate:dev`
3. Prisma Client se automatski regeneriše
4. Promena je odmah dostupna u obe aplikacije

## Environment Variables

- `shared-prisma/.env` - DATABASE_URL za Prisma migracije
- `m-hotel-admin/.env` - Admin aplikacija env vars
- `m-hotel-gost/.env` - Gost aplikacija env vars

## Troubleshooting

### "Cannot find module '@prisma/client'"

```bash
npm run prisma:generate
```

### Migracije ne rade

Proverite da li je DATABASE_URL pravilno podešen u `shared-prisma/.env`.

### Port konflikt

- Admin aplikacija koristi port 3000
- Gost aplikacija koristi port 4000

Ako neki od portova je zauzet, ažurirajte `dev` script u odgovarajućem package.json.

### Build fails

Proverite da li je Prisma Client generisan:
```bash
npm run prisma:generate
```

## Git workflow

Sada je ceo monorepo u jednom Git repository-ju. Možete napraviti jedan `.git` folder u root-u (`/Users/drasko/HOTEL/`) i commitovati izmene sa:

```bash
git add .
git commit -m "Your message"
```

## Backup

Pre migracije, kreirani su folderi:
- Originalne `prisma/` foldere možete čuvati kao backup
- Sve postojeće migracije su sačuvane

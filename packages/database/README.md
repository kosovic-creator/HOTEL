# Shared Prisma

Ovaj paket sadrži zajedničku Prisma šemu koju koriste obe hotel aplikacije:
- `m-hotel-admin` - Admin dashboard
- `m-hotel-gost` - Gost (client) aplikacija

## Setup

1. Kopirajte `.env.example` u `.env` i podesite DATABASE_URL
2. Pokrenite migracije: `npm run migrate:dev`
3. Generisite Prisma Client: `npm run generate`

## Komande z

- `npm run generate` - Generiše Prisma Client
- `npm run migrate:dev` - Kreira novu migraciju i primenjuje je
- `npm run migrate:deploy` - Primenjuje migracije na production
- `npm run studio` - Otvara Prisma Studio
- `npm run push` - Push schema promena na database (bez migracija)

## Korišćenje u aplikacijama

Obe aplikacije mogu pristupiti Prisma Client-u nakon što generišete klijent sa `npm run generate` iz root-a:

```bash
npm run prisma:generate
```

ili iz ovog paketa:

```bash
npm run generate -w shared-prisma
```

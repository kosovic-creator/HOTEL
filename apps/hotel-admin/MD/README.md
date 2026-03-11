# M-Hotel Admin Monorepo

Ovaj projekat je organizovan kao monorepo sa pnpm workspaces.

## Struktura

```
.
├── apps/
│   └── web/           # Next.js web aplikacija
├── packages/
│   ├── database/      # Prisma šema i database client
│   ├── ui/            # Zajedničke UI komponente
│   └── config/        # Zajedničke konfiguracije
└── pnpm-workspace.yaml
```

## Setup

### Prerequisites

Instalirati pnpm ako već nije instaliran:
```bash
npm install -g pnpm
```

### Instalacija zavisnosti

```bash
pnpm install
```

Ova komanda će instalirati zavisnosti za sve pakete u monorepo-u.

## Development

### Pokretanje development servera

```bash
pnpm dev
```

### Build aplikacije

```bash
pnpm build
```

### Pokretanje produkcijske verzije

```bash
pnpm start
```

## Database

### Generisanje Prisma Client-a

```bash
pnpm db:generate
```

### Push schema na database

```bash
pnpm db:push
```

### Pokretanje Prisma Studio

```bash
pnpm db:studio
```

### Migracije

```bash
pnpm db:migrate
```

## Workspace Paketi

### @hotel/web
Glavna Next.js aplikacija.

### @hotel/database
Sadrži Prisma šemu i eksportuje Prisma Client sa konfigurisanim PostgreSQL adapterom.

```typescript
import { prisma } from '@hotel/database';
```

### @hotel/ui
Sadrži sve zajedničke UI komponente:
- UI komponente (badge, button, calendar, card, itd.)
- Form komponente
- Table komponente
- Message komponente
- Rezervacije komponente

```typescript
import { Button, Card } from '@hotel/ui';
```

### @hotel/config
Zajedničke konfiguracije (ESLint, TypeScript).

## Dodavanje novih paketa

### Dodavanje zavisnosti u odre��eni paket

```bash
# Za web app
pnpm --filter @hotel/web add package-name

# Za database
pnpm --filter @hotel/database add package-name

# Za ui
pnpm --filter @hotel/ui add package-name
```

### Dodavanje dev zavisnosti

```bash
pnpm --filter @hotel/web add -D package-name
```

### Povezivanje između workspace paketa

U package.json koristite `workspace:*` za lokalne pakete:

```json
{
  "dependencies": {
    "@hotel/database": "workspace:*",
    "@hotel/ui": "workspace:*"
  }
}
```

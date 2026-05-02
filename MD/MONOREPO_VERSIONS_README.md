# 📦 Upravljanje Verzijama Zavisnosti u Monorepo

## ✅ Šta je urađeno

### 1. Usaglašene verzije
Sve zajedničke zavisnosti između `m-hotel-admin` i `m-hotel-gost` aplikacija su usaglašene na iste verzije.

### 2. Automatska provjera verzija
Kreirana skripta `scripts/check-versions.js` koja automatski provjerava konzistentnost verzija.

## 🚀 Kako provjeriti verzije

```bash
# Pokreni provjeru verzija
npm run check-versions
```

Ova skripta će:
- ✅ Pokazati sve zajedničke zavisnosti
- ❌ Označiti neusaglašene verzije
- 💚 Potvrditi kad su sve verzije konzistentne
- Exit code `0` ako je sve OK (dobro za CI/CD)
- Exit code `1` ako ima razlika

## 📋 Best Practices za Monorepo

### 1. **Drži iste verzije za zajedničke pakete**

```json
// ✅ DOBRO - iste verzije
{
  "m-hotel-admin": { "next": "16.1.4" },
  "m-hotel-gost": { "next": "16.1.4" }
}

// ❌ LOŠE - različite verzije
{
  "m-hotel-admin": { "next": "16.1.4" },
  "m-hotel-gost": { "next": "16.0.0" }
}
```

### 2. **Koristi tačne verzije za core pakete**

```json
// ✅ DOBRO - tačna verzija
"react": "19.2.3",
"next": "16.1.4"

// ⚠️ OPASNO - može dovesti do nekonzistentnosti
"react": "^19.2.3",  // može instalirati različite minor verzije
```

### 3. **Specifične zavisnosti su OK**

```json
// m-hotel-gost/package.json
{
  "leaflet": "^1.9.4",           // samo gost koristi mapu
  "react-leaflet": "^5.0.0"
}

// m-hotel-admin/package.json
// nema leaflet - to je OK!
```

## 🛠️ Kako usaglasiti verzije

### Metoda 1: Ručno (preporučeno)

1. **Pokreni provjeru**
   ```bash
   npm run check-versions
   ```

2. **Otvori package.json fajlove**
   - `m-hotel-admin/package.json`
   - `m-hotel-gost/package.json`

3. **Ažuriraj verzije** na istu vrijednost

4. **Instaliraj zavisnosti**
   ```bash
   npm install
   ```

5. **Ponovo provjeri**
   ```bash
   npm run check-versions
   ```

### Metoda 2: Korištenje syncpack alata

```bash
# Instaliraj syncpack (opcionalno)
npm install -D syncpack

# Provjeri neusaglašene verzije
npx syncpack list-mismatches

# Automatski popravi (budite pažljivi!)
npx syncpack fix-mismatches
```

## 🎯 Workflow za dodavanje nove zavisnosti

### Scenario 1: Zavisnost potrebna u OBE aplikacije

```bash
# Instaliraj u obe workspace-ove sa istom verzijom
npm install next@16.1.4 -w m-hotel-admin -w m-hotel-gost

# ili posebno
npm install next@16.1.4 -w m-hotel-admin
npm install next@16.1.4 -w m-hotel-gost
```

### Scenario 2: Zavisnost potrebna samo u jednoj aplikaciji

```bash
# Samo u gost aplikaciju
npm install leaflet -w m-hotel-gost

# Samo u admin aplikaciju
npm install chart.js -w m-hotel-admin
```

### Scenario 3: Dev zavisnost za sve

```bash
# Ako je zaista potrebna svima, stavi u root
npm install -D prettier

# Ili u workspace-ove
npm install -D prettier -w m-hotel-admin -w m-hotel-gost
```

## 📊 Kako npm workspaces radi

```
/Users/drasko/HOTEL/
├── node_modules/              ← 986 MB (SVE zajedničke zavisnosti)
│   ├── next/                  ← Instaliran JEDNOM
│   ├── react/                 ← Instaliran JEDNOM
│   └── ...
├── m-hotel-admin/
│   └── node_modules/          ← 38 MB (samo specifične verzije)
│       └── date-fns/          ← Različita verzija od gost
└── m-hotel-gost/
    └── node_modules/          ← 38 MB (samo specifične verzije)
        └── date-fns/          ← Različita verzija od admin
```

**Automatsko "hoisting":**
- npm workspaces automatski "podiže" zajedničke zavisnosti u root
- Smanjuje disk space (~50% uštede)
- Brža instalacija
- Node.js automatski pronalazi pakete

## 🚨 Uobičajeni problemi

### Problem: "Cannot find module 'xyz'"

**Uzrok:** Paket je instaliran u root, ali ne u workspace package.json

**Rješenje:**
```bash
# Dodaj u odgovarajući package.json
npm install xyz -w m-hotel-admin
```

### Problem: TypeScript greške nakon ažuriranja verzija

**Uzrok:** TypeScript tipovi nisu kompatibilni

**Rješenje:**
```bash
# Reinstaliraj sve
rm -rf node_modules m-hotel-*/node_modules
npm install

# Regeneriraj Prisma client
npm run prisma:generate
```

### Problem: Različite verzije u package-lock.json

**Uzrok:** Verzije nisu eksplicitno navedene (koristi se ^)

**Rješenje:**
```json
// Zamijeni
"next": "^16.1.4"

// Sa
"next": "16.1.4"
```

## 🔄 Integracija sa CI/CD

Dodaj provjeru verzija u GitHub Actions ili drugi CI:

```yaml
# .github/workflows/check-versions.yml
name: Check Version Consistency

on: [push, pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run check-versions  # Exit code 1 ako ima razlika
```

## 📚 Dodatni resursi

- [npm workspaces docs](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [Monorepo patterns](https://monorepo.tools/)
- [Syncpack](https://github.com/JamieMason/syncpack) - alat za sinhronizaciju verzija

## 🎉 Zaključak

**Trenutno stanje:** ✅ Sve verzije su usaglašene!

**Rutina:**
1. Prije svakog commit-a: `npm run check-versions`
2. Kada dodaješ zavisnost, dodaj je u obe aplikacije sa istom verzijom
3. Pokreni provjeru nakon `npm install`

---

**Napomena:** Verzije specifične za jednu aplikaciju (kao `leaflet` za gost) su potpuno OK i ne trebaće biti u obje aplikacije. Alat automatski prepoznaje samo zajedničke zavisnosti.

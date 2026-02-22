# Hotel Monorepo - TODO

## ✅ Završeno

- [x] Kreiran root package.json sa npm workspaces
- [x] Kreiran shared-prisma paket sa zajedničkom šemom
- [x] Ažuriran m-hotel-admin za korišćenje shared-prisma
- [x] Ažuriran m-hotel-gost za korišćenje shared-prisma
- [x] Installisane sve zavisnosti
- [x] Generisan Prisma Client
- [x] Kreirana dokumentacija (README, MIGRATION_GUIDE, QUICKSTART)
- [x] Kreiran setup.sh script

## 🔄 Opciono/Later

- [ ] Testirati obe aplikacije u dev modu
- [ ] Testirati build process
- [ ] Setup CI/CD za monorepo
- [ ] Dodati shared UI components paket (ako je potrebno)
- [ ] Dodati shared utilities paket (ako je potrebno)
- [ ] Git inicijalizacija na root nivou (ako želiš jedan repo)

## 📋 Napomene

- Obe aplikacije koriste zajedničku Prisma šemu iz `shared-prisma/`
- Admin aplikacija radi na portu 3000
- Gost aplikacija radi na portu 4000
- DATABASE_URL je postavljen u `shared-prisma/.env`
- Sve Prisma komande se izvršavaju preko root package.json scripts

## 🚀 Sledeći koraci

1. Testirati: `npm run dev` za pokretanje obe aplikacije
2. Proveriti admin app na http://localhost:3000
3. Proveriti gost app na http://localhost:4000
4. Ako sve radi, commitovati promene u git

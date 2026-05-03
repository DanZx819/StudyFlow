# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visao Geral

StudyFlow e uma aplicacao web para organizacao de estudos. Monorepo com duas pastas principais: `backend/` (Laravel 12 + PHP 8.2) e `frontend/` (Next.js 14 + React 18 + TypeScript). Banco de dados PostgreSQL 16. Tudo orquestrado via Docker Compose.

## Comandos

### Subir o ambiente completo (Docker)
```bash
npm run dev                # docker compose up (backend + frontend + postgres)
npm run dev:down           # docker compose down -v
```

### Frontend (dentro de `frontend/`)
```bash
npm run dev                # next dev (porta 3000)
npm run build              # next build
npm run lint               # eslint
```

### Backend (dentro de `backend/`)
```bash
php artisan serve          # servidor local (porta 8000)
php artisan migrate        # rodar migrations
php artisan test           # PHPUnit
php artisan pint           # linter/formatter (Laravel Pint)
composer install           # instalar dependencias
```

## Arquitetura

### Backend (Laravel 12)
- **API REST** com autenticacao via **Laravel Sanctum** (token bearer)
- Rotas em `backend/routes/api.php`
- Controllers em `backend/app/Http/Controllers/` — `AuthController` (register/login/logout) e `SubjectController` (CRUD de materias)
- Form Requests em `backend/app/Http/Requests/` — validacao separada dos controllers
- Models em `backend/app/Models/` — `User` e `Subject` (relacao 1:N)
- Imagens de materias armazenadas via Storage disk `public` em `storage/app/public/subjects/`
- Migrations em `backend/database/migrations/`

### Frontend (Next.js 14 - App Router)
- Pages em `frontend/app/` — rotas: `/`, `/login`, `/register`, `/dashboard`, `/materias`, `/rotina`, `/progresso`, `/perfil`
- Components em `frontend/components/` — `HeaderComponent`, `FooterComponent`, `LangCard`, `ProfilePage`, `ButtonThemeToggle`
- Services em `frontend/services/` — camada de comunicacao com a API (`api.ts` com axios, `authService`, `loginService`, `userService`, `subjectService`)
- Types em `frontend/types/` — `User.ts`, `Subject.ts`
- Estilizacao com **Tailwind CSS 4** + CSS Modules (`.module.css`)
- Path alias: `@/*` aponta para `frontend/*`
- Variavel de ambiente: `NEXT_PUBLIC_API_URL` (configurada em `.env.local`)

### Comunicacao Frontend-Backend
- Frontend faz requests HTTP via axios para a API Laravel
- Autenticacao: token Sanctum enviado como Bearer token nos headers
- Upload de imagens: FormData com `multipart/form-data`; updates usam `_method: PUT` via POST (spoofing de metodo Laravel)

### Docker
- `docker-compose.yml`: 3 servicos — `db` (PostgreSQL 16 Alpine), `backend` (Laravel), `frontend` (Next.js)
- Backend na porta 8000, frontend na 3000, Postgres na 5432
- Volumes mapeados para hot-reload em dev

## Convencoes
- Interface em portugues brasileiro (pt-BR)
- Nomes de rotas do frontend em portugues (`/materias`, `/rotina`, `/progresso`, `/perfil`)
- Comentarios no codigo em portugues

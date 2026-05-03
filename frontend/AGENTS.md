<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agente de Design & Frontend

Voce e um especialista em design de interfaces e desenvolvimento frontend. Ao trabalhar neste diretorio, siga estas diretrizes:

## Design System

O projeto usa um design system baseado em CSS custom properties definidas em `app/globals.css`:

- **Cores primarias:** `--color-primary` (indigo) e `--color-secondary` (emerald)
- **Backgrounds:** `--color-bg`, `--color-card`, `--color-neutral`
- **Texto:** `--color-text`, `--color-text-muted`
- **Bordas:** `--color-border`
- **Sombras:** `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-green`
- **Border-radius:** `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (16px), `--radius-xl` (24px)
- **Tema escuro:** classe `.dark` no root — sempre garanta suporte a ambos os temas

Nunca use cores hardcoded. Sempre use as variaveis CSS do design system.

## Estilizacao

- Use **CSS Modules** (`styles.module.css`) para estilos de componentes e paginas
- Use **Tailwind CSS 4** apenas para utilitarios rapidos; prefira CSS Modules para layouts e estilos complexos
- Cada componente/pagina tem seu proprio `styles.module.css`
- Transicoes de tema ja estao configuradas globalmente (0.35s ease)

## Componentes

- Icones: use **lucide-react** (ja instalado)
- Fonte: **Inter** (Google Fonts, configurada no layout)
- Componentes em `components/` organizados por funcionalidade (header, footer, cards, theme, profile)
- Paginas usam App Router do Next.js 14 em `app/`
- Use `"use client"` apenas quando necessario (interatividade, hooks de estado)

## Principios de Design

- **Mobile-first**: comece pelo layout mobile, expanda com media queries
- **Acessibilidade**: use elementos semanticos, `aria-label`, contraste adequado entre temas
- **Consistencia**: reutilize as variaveis do design system, mantenha espacamentos e tipografia uniformes
- **Feedback visual**: estados hover, focus, disabled e loading em todos os elementos interativos

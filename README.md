# StudyFlow

# 📋 Levantamento de Requisitos - DevRoutine

## 🎯 Visão Geral do Projeto

**Nome:** DevRoutine
**Descrição:** Plataforma web para organização e acompanhamento de rotinas de estudo em programação
**Objetivo:** Ajudar desenvolvedores a manter uma rotina consistente de estudos com gamificação (sistema de streak)

**Stack Tecnológica:**
- Frontend: Next.js 14+ / React / TypeScript
- Backend: Laravel (API RESTful)
- Banco de Dados: PostgreSQL
- Estilo: CSS Modules + Paleta Nórdico
- Ícones: Lucide React

---

## 👥 Personas / Usuários

### Persona Principal: Desenvolvedor em Formação
- **Perfil:** Estudantes de TI, desenvolvedores júnior, autodidatas
- **Idade:** 18-30 anos
- **Objetivo:** Manter consistência nos estudos, acompanhar progresso
- **Dores:** Falta de organização, perda de motivação, dificuldade em manter disciplina

---

## 📌 Requisitos Funcionais

### 1. Autenticação e Usuários

#### RF01 - Cadastro de Usuário
- O sistema deve permitir cadastro com email e senha
- Validar formato de email
- Senha mínima de 8 caracteres
- Confirmação de senha

#### RF02 - Login
- Autenticação via email e senha
- Manter sessão (JWT ou Sanctum)
- Opção "Lembrar-me"

#### RF03 - Recuperação de Senha
- Envio de email para reset de senha
- Link temporário de recuperação

#### RF04 - Perfil do Usuário
- Visualizar informações pessoais
- Editar nome, email, foto de perfil
- Alterar senha

---

### 2. Gestão de Matérias/Linguagens

#### RF05 - Criar Matéria
- Título obrigatório (máx 100 caracteres)
- Upload de imagem opcional (logo da linguagem/framework)
- Descrição opcional

#### RF06 - Listar Matérias
- Exibir todas as matérias do usuário
- Grid responsivo de cards
- Ordenação por data de criação (mais recente primeiro)

#### RF07 - Editar Matéria
- Alterar título
- Trocar imagem
- Editar descrição

#### RF08 - Excluir Matéria
- Confirmação antes de deletar
- Exclusão em cascata (deleta rotinas associadas)

#### RF09 - Visualizar Detalhes da Matéria
- Ver estatísticas (total de horas, dias estudados)
- Histórico de sessões de estudo

---

### 3. Criação e Gestão de Rotinas

#### RF10 - Criar Rotina de Estudos
- Selecionar matéria
- Definir dias da semana (seg-dom)
- Definir horário de início
- Definir duração (em horas)
- Múltiplas matérias por dia

**Exemplo:**
```
Segunda: 
  - 13h-15h: TypeScript
  - 15h-17h: React

Terça:
  - 13h-14h30: Laravel
  - 14h30-17h: PostgreSQL
```

#### RF11 - Visualizar Rotina Semanal
- Calendário/grade com os horários
- Cores diferentes por matéria
- Indicador visual de "concluído" ou "pendente"

#### RF12 - Editar Rotina
- Alterar horários
- Trocar matéria
- Remover blocos

#### RF13 - Excluir Rotina
- Confirmação antes de deletar
- Opção de deletar apenas um dia ou toda a rotina recorrente

---

### 4. Sistema de Streak (Sequência)

#### RF14 - Registrar Estudo do Dia
- Botão "Marcar como concluído"
- Registrar data/hora da conclusão
- Validar se está dentro do horário planejado (tolerância?)

#### RF15 - Contador de Streak
- Exibir dias consecutivos de estudo
- Reset ao perder 1 dia
- Badge/ícone de fogo 🔥 visível no header

#### RF16 - Histórico de Streaks
- Ver maior sequência alcançada
- Datas de início/fim de cada streak
- Gráfico de evolução

#### RF17 - Notificação de Quebra de Streak
- Alerta quando está prestes a perder a sequência
- Lembrete diário (opcional)

---

### 5. Dashboard e Estatísticas

#### RF18 - Dashboard Principal
- Cards com resumo:
  - Streak atual
  - Total de horas estudadas (semana/mês)
  - Matérias ativas
  - Próxima sessão de estudo
- Gráfico de progresso semanal

#### RF19 - Página de Progresso
- Gráfico de horas por matéria (pizza/barras)
- Calendário de atividades (estilo GitHub)
- Tabela de rankings (dias/horas estudadas)

#### RF20 - Filtros de Estatísticas
- Por período (semana, mês, ano, customizado)
- Por matéria específica
- Exportar dados (PDF/CSV)

---

### 6. Funcionalidades Extras (MVP+)

#### RF21 - Sistema de Metas
- Definir meta de horas/semana
- Progresso visual da meta
- Notificação ao atingir

#### RF22 - Anotações por Sessão
- Adicionar notas após estudar
- "O que aprendi hoje"
- Lista de dúvidas

#### RF23 - Recursos de Estudo
- Links úteis por matéria
- Anexar PDFs, vídeos
- Checklist de tópicos

#### RF24 - Modo Pomodoro
- Timer integrado (25min + 5min pausa)
- Contador de pomodoros por sessão

#### RF25 - Comunidade (Futuro)
- Ranking público (opcional)
- Compartilhar progresso
- Desafios entre amigos

---

## 🎨 Requisitos Não-Funcionais

### RNF01 - Performance
- Tempo de carregamento < 2s
- Lazy loading de imagens
- Cache de dados no frontend

### RNF02 - Responsividade
- Mobile-first design
- Breakpoints: 320px, 768px, 1024px, 1440px
- Touch-friendly (botões min 44x44px)

### RNF03 - Acessibilidade
- Contraste WCAG AA
- Navegação por teclado
- Labels em formulários
- Alt text em imagens

### RNF04 - Segurança
- HTTPS obrigatório
- Sanitização de inputs
- Rate limiting na API
- CORS configurado
- Tokens com expiração

### RNF05 - Usabilidade
- Paleta de cores suave (Nórdico)
- Feedback visual em todas as ações
- Loading states
- Mensagens de erro claras

### RNF06 - SEO (se for público)
- Meta tags dinâmicas
- Open Graph
- Sitemap.xml

### RNF07 - Escalabilidade
- Suporte a 10k usuários simultâneos (futuro)
- Paginação em listas grandes
- Compressão de imagens

---

## 🗄️ Modelagem de Dados

### Entidades Principais

#### **users**
```sql
id: bigint (PK)
name: string
email: string (unique)
password: string (hash)
avatar_url: string (nullable)
created_at: timestamp
updated_at: timestamp
```

#### **subjects** (Matérias)
```sql
id: bigint (PK)
user_id: bigint (FK → users)
title: string
description: text (nullable)
image_url: string (nullable)
created_at: timestamp
updated_at: timestamp
```

#### **routines** (Rotinas)
```sql
id: bigint (PK)
user_id: bigint (FK → users)
subject_id: bigint (FK → subjects)
day_of_week: integer (0-6, dom-sab)
start_time: time
end_time: time
is_active: boolean (default true)
created_at: timestamp
updated_at: timestamp
```

#### **study_sessions** (Sessões de Estudo)
```sql
id: bigint (PK)
user_id: bigint (FK → users)
subject_id: bigint (FK → subjects)
routine_id: bigint (FK → routines, nullable)
date: date
start_time: timestamp
end_time: timestamp (nullable)
duration_minutes: integer
notes: text (nullable)
completed: boolean
created_at: timestamp
updated_at: timestamp
```

#### **streaks** (Sequências)
```sql
id: bigint (PK)
user_id: bigint (FK → users)
current_streak: integer (default 0)
longest_streak: integer (default 0)
last_study_date: date (nullable)
created_at: timestamp
updated_at: timestamp
```

#### **goals** (Metas - Opcional)
```sql
id: bigint (PK)
user_id: bigint (FK → users)
subject_id: bigint (FK → subjects, nullable)
type: enum ('hours_week', 'days_week', 'hours_total')
target_value: integer
current_value: integer (default 0)
start_date: date
end_date: date
achieved: boolean (default false)
created_at: timestamp
updated_at: timestamp
```

---

## 🔌 Endpoints da API

### **Autenticação**
```
POST   /api/register
POST   /api/login
POST   /api/logout
POST   /api/password/forgot
POST   /api/password/reset
GET    /api/user (autenticado)
PUT    /api/user (autenticado)
```

### **Matérias**
```
GET    /api/subjects          - Listar matérias do usuário
POST   /api/subjects          - Criar matéria
GET    /api/subjects/{id}     - Detalhes da matéria
PUT    /api/subjects/{id}     - Atualizar matéria
DELETE /api/subjects/{id}     - Deletar matéria
GET    /api/subjects/{id}/stats - Estatísticas da matéria
```

### **Rotinas**
```
GET    /api/routines          - Listar rotinas
POST   /api/routines          - Criar rotina
GET    /api/routines/{id}     - Detalhes da rotina
PUT    /api/routines/{id}     - Atualizar rotina
DELETE /api/routines/{id}     - Deletar rotina
GET    /api/routines/week     - Rotina da semana atual
```

### **Sessões de Estudo**
```
GET    /api/study-sessions           - Listar sessões
POST   /api/study-sessions           - Registrar sessão
GET    /api/study-sessions/{id}      - Detalhes
PUT    /api/study-sessions/{id}      - Atualizar
DELETE /api/study-sessions/{id}      - Deletar
POST   /api/study-sessions/{id}/complete - Marcar como concluída
```

### **Streak**
```
GET    /api/streak            - Dados do streak atual
POST   /api/streak/check      - Verificar e atualizar streak
GET    /api/streak/history    - Histórico de streaks
```

### **Estatísticas**
```
GET    /api/stats/dashboard   - Dados do dashboard
GET    /api/stats/progress    - Progresso por período
GET    /api/stats/subjects    - Estatísticas por matéria
GET    /api/stats/calendar    - Dados do calendário de atividades
```

---

## 📱 Estrutura de Páginas (Frontend)

### Páginas Públicas
- `/` - Landing page
- `/login` - Tela de login
- `/register` - Cadastro
- `/forgot-password` - Recuperação de senha

### Páginas Autenticadas
- `/dashboard` - Dashboard principal
- `/materias` ou `/linguagens` - Gestão de matérias
- `/rotina` - Criação/edição de rotina semanal
- `/progresso` - Estatísticas e gráficos
- `/perfil` - Configurações do usuário
- `/sessoes` - Histórico de sessões (opcional)

---

## 🎯 Regras de Negócio

### RN01 - Streak
- Streak aumenta +1 ao completar pelo menos 1 sessão no dia
- Streak reseta se passar 1 dia sem estudar
- Horário considerado: até 23h59 do dia

### RN02 - Rotinas
- Não pode haver sobreposição de horários no mesmo dia
- Duração mínima: 30 minutos
- Duração máxima: 4 horas por bloco

### RN03 - Sessões
- Só pode marcar como concluída dentro do dia planejado
- Tolerância de +/- 2 horas do horário planejado (configurável)

### RN04 - Matérias
- Mínimo 1 matéria para criar rotina
- Nome da matéria único por usuário

### RN05 - Upload de Imagens
- Formatos aceitos: JPG, PNG, WebP
- Tamanho máximo: 2MB
- Redimensionar para 400x400px

---

## 🚀 Roadmap de Desenvolvimento

### **Fase 1: MVP (Mínimo Viável)** - 4 semanas
✅ Semana 1:
- Setup do projeto (Next.js + Laravel)
- Autenticação (registro, login, logout)
- Estrutura do banco de dados

✅ Semana 2:
- CRUD de Matérias
- Upload de imagens
- Listagem com cards

✅ Semana 3:
- Criação de rotinas
- Visualização semanal
- Edição/exclusão de rotinas

✅ Semana 4:
- Sistema de streak básico
- Dashboard simples
- Marcar sessão como concluída

### **Fase 2: Funcionalidades Essenciais** - 3 semanas
- Página de progresso com gráficos
- Histórico de sessões
- Sistema de notificações
- Responsividade completa
- Dark mode

### **Fase 3: Melhorias** - 2 semanas
- Sistema de metas
- Anotações por sessão
- Exportação de dados
- Otimizações de performance

### **Fase 4: Extras** - Futuro
- Modo Pomodoro
- Recursos de estudo
- Comunidade/ranking
- App mobile (React Native?)

---

## 🎨 Design System

### Cores (Paleta Nórdico)
```css
--color-background: #F7F9FC (light) / #0F172A (dark)
--color-card: #FFFFFF (light) / #1E293B (dark)
--color-primary: #8B9FDE (light) / #A5B4FC (dark)
--color-text: #334155 (light) / #F1F5F9 (dark)
--color-warning: #FACC15
--color-danger: #EF4444
--color-success: #10B981
```

### Tipografia
- **Fonte:** Inter, SF Pro, Segoe UI
- **Tamanhos:** 14px, 16px, 18px, 24px, 32px
- **Pesos:** 400 (regular), 500 (medium), 600 (semibold)

### Espaçamento
- Base: 8px (0.5rem)
- Escala: 8, 16, 24, 32, 48, 64px

### Componentes
- Border radius: 8px (inputs), 12px (cards), 16px (modais)
- Shadow: subtle (cards), medium (modais)
- Transitions: 0.2s ease (hover), 0.3s ease (modais)

---

## 📊 Métricas de Sucesso

### KPIs (Key Performance Indicators)
1. **Retenção de Usuários**
   - Meta: 60% voltam após 7 dias
   - Meta: 40% voltam após 30 dias

2. **Engagement**
   - Meta: 80% dos usuários completam ≥3 sessões/semana
   - Meta: Streak médio de 7+ dias

3. **Usabilidade**
   - Meta: 90% conseguem criar primeira rotina sem ajuda
   - Meta: Tempo médio de criação de rotina < 2min

4. **Performance**
   - Meta: 95% das páginas carregam em < 2s
   - Meta: 0 erros críticos em produção

---

## 🐛 Casos de Teste Principais

### CT01 - Criar Matéria com Sucesso
1. Usuário autenticado acessa /materias
2. Clica em "+" (adicionar)
3. Preenche título "TypeScript"
4. Faz upload de logo
5. Clica em "Criar Matéria"
✅ Matéria aparece na listagem

### CT02 - Editar Matéria
1. Usuário clica em editar (ícone lápis)
2. Modal abre com dados preenchidos
3. Altera título para "TypeScript Avançado"
4. Clica em "Salvar"
✅ Card atualiza com novo título

### CT03 - Deletar Matéria
1. Usuário clica em deletar (ícone lixeira)
2. Confirmação aparece
3. Confirma exclusão
✅ Matéria é removida da lista

### CT04 - Criar Rotina Semanal
1. Acessa /rotina
2. Seleciona matéria "React"
3. Escolhe segunda-feira
4. Define 14h-16h
5. Salva rotina
✅ Bloco aparece no calendário

### CT05 - Marcar Sessão como Concluída
1. Acessa dashboard
2. Vê sessão do dia "React 14h-16h"
3. Clica em "Marcar como concluído"
✅ Streak aumenta +1
✅ Badge de fogo atualiza

### CT06 - Quebra de Streak
1. Usuário tem streak de 5 dias
2. Passa 1 dia sem estudar (simular data)
3. Acessa dashboard no dia seguinte
✅ Streak volta para 0
✅ Mensagem informa quebra

---

## 🔒 Considerações de Segurança

### Autenticação
- Tokens JWT com expiração (24h)
- Refresh tokens (7 dias)
- Logout em todos os dispositivos
- Limite de tentativas de login (5x)

### Validação
- Backend valida TUDO (nunca confiar no front)
- Sanitização de HTML em textos
- Validação de tipos de arquivo (upload)

### Proteção
- CSRF tokens em formulários
- Rate limiting (100 req/min por IP)
- Captcha em registro (se spam)

### Dados
- Senhas com bcrypt (cost 12)
- Dados sensíveis não em logs
- Backup diário do banco

---

## 📝 Observações Finais

### Diferenciais do Projeto
1. **Foco em Programação:** Específico para dev, não genérico
2. **Gamificação Simples:** Streak é motivador sem complexidade
3. **Design Suave:** Paleta Nórdico reduz cansaço visual
4. **Flexibilidade:** Rotina customizável, não rígida

### Próximos Passos Imediatos
1. ✅ Finalizar CRUD de matérias
2. ⏳ Implementar criação de rotinas
3. ⏳ Desenvolver lógica de streak
4. ⏳ Criar dashboard com estatísticas básicas

### Possíveis Expansões Futuras
- Integração com Google Calendar
- Widget para desktop (Electron)
- Extensão de navegador (lembrete)
- Modo offline (PWA)
- API pública para desenvolvedores

---

**Versão:** 1.0
**Data:** Abril 2026
**Autor:** Daniel Zanchetta
**Status:** Em Desenvolvimento

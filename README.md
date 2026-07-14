# DJ The Source - Sistema de Eventos

Sistema completo de orçamento para locação de sonorização, iluminação, garçons, recepcionistas, DJs, decoradores e locação de salão.

## Estrutura do projeto

- `server/` - backend Node.js com Express
- `client/` - frontend React com Vite

## Funcionalidades

- Escolha de serviços por página dedicada
- Orçamento dinâmico baseado em horas, quantidade e convidados
- Cadastro de novos colaboradores com valor/hora editável
- Edição de valores de serviços e colaboradores
- Envio de orçamento por email ao organizador do evento
- Site responsivo com logo animado de moving head

## Comandos utilizados

```powershell
cd "c:\Users\salva\Documents\Ensino\Projeto - DJTHESOURCE- VERSÕES\Projeto versão NODE\24.06.26 - II\dj-the-source"

md server,client

cd server
npm init -y
npm install express cors nodemailer dotenv
npm install --save-dev nodemon

cd ..\client
npm create vite@latest . -- --template react
npm install react-router-dom

cd ..\server
npm install

cd ..\client
npm install
```

## Executar

```powershell
cd server
npm start

cd ..\client
npm run dev
```

## Configuração de email e Supabase

Copie `server/.env.example` para `server/.env` e preencha suas credenciais reais.

No backend, o servidor precisa das seguintes variáveis:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

O `SUPABASE_SERVICE_ROLE_KEY` é a chave recomendada para o backend porque permite inserções e atualizações no Supabase. A chave `SUPABASE_KEY` é opcional e só deve ser usada se você souber o que está fazendo.

Crie as tabelas no Supabase usando o arquivo `server/supabase-tables.sql`, ou execute as instruções no SQL Editor.

As tabelas necessárias são:

- `services`
- `clients`
- `quotes`

As colunas incluem campos como `id`, `title`, `description`, `rateLabel`, `unitLabel`, `basePrice`, `values`, `hourly`, `options`, `created_at`, `createdAt`, `quoteText`, `clientName`, `clientEmail`, `clientPhone`, `organizerEmail`, `password` e `email`.

Para validar o fluxo completo:

1. `cd server`
2. `npm install`
3. `npm start`
4. Verifique `http://localhost:4000/api/health`
5. Abra o frontend e envie um orçamento via `/api/quote`

# To Do List

Aplicação de lista de tarefas com frontend em React + Vite e backend em Express + TypeScript, usando Supabase como banco de dados.

## Funcionalidades

- Criar novas tarefas com título e descrição.
- Listar tarefas cadastradas.
- Editar título e descrição de uma tarefa.
- Alterar o status entre `pendente` e `concluída`.
- Remover tarefas.

## Tecnologias

- React 19
- TypeScript
- Vite
- Express
- Supabase
- Zod

## Estrutura

- `Backend/` contém a API responsável por persistir e consultar as tarefas.
- `To-Do-List/` contém a interface web consumindo a API.

## Pré-requisitos

- Node.js 18 ou superior.
- Uma conta e um projeto no Supabase.

## Configuração

### Frontend

Crie o arquivo `.env` dentro de `To-Do-List/` com a URL da API:

```env
VITE_API_URL=https://sua-api.com
```

### Backend

Crie o arquivo `.env` dentro de `Backend/` com as credenciais do Supabase e a porta da API:

```env
PORT=3000
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
```

## Como executar

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd To-Do-List
npm install
npm run dev
```

Depois, acesse a aplicação no endereço mostrado pelo Vite.

## API

Endpoints disponíveis:

- `GET /tarefas` lista todas as tarefas.
- `GET /tarefas/:id` busca uma tarefa pelo id.
- `POST /tarefas` cria uma nova tarefa.
- `PUT /tarefas/:id` atualiza uma tarefa.
- `DELETE /tarefas/:id` remove uma tarefa.

## Modelo de dados

Cada tarefa possui os campos:

- `id`
- `titulo`
- `descricao`
- `status`
- `created_at`

O campo `status` trabalha com os valores `pendente` e `concluída`.

Link do deploy https://desafio-t-cnico-gamma.vercel.app/
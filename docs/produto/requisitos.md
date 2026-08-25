# Requisitos do AtlasPay

## Requisitos funcionais

### RF-001 — Cadastro de usuário
O sistema deve permitir que um novo usuário crie uma conta.

### RF-002 — Autenticação
O sistema deve permitir que usuários cadastrados realizem login.

### RF-003 — Consulta de saldo
O usuário autenticado deve conseguir consultar o saldo da sua carteira.

### RF-004 — Transferências
O usuário autenticado deve conseguir transferir saldo para outro usuário.

### RF-005 — Histórico
O usuário deve conseguir consultar seu histórico de transações.

## Requisitos não funcionais

### RNF-001 — Segurança de senhas
Senhas nunca devem ser armazenadas em texto puro.

### RNF-002 — Consistência financeira
Uma transferência deve ser concluída completamente ou não acontecer.

### RNF-003 — Autenticação
Rotas privadas devem exigir autenticação válida.

### RNF-004 — Persistência
Os dados da aplicação devem ser armazenados em banco de dados MySQL.
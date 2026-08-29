# Requisitos do AtlasPay

## Requisitos funcionais

### RF-001 — Cadastro de usuário

O sistema deve permitir que um novo usuário crie uma conta informando seus dados obrigatórios.

### RF-002 — Login

O sistema deve permitir que usuários cadastrados realizem autenticação.

### RF-003 — Logout

O sistema deve permitir que usuários autenticados encerrem sua sessão.

### RF-004 — Consulta de perfil

O usuário autenticado deve conseguir visualizar os dados do seu perfil.

### RF-005 — Carteira digital

Cada usuário deve possuir uma carteira associada à sua conta.

### RF-006 — Consulta de saldo

O usuário autenticado deve conseguir consultar o saldo disponível em sua carteira.

### RF-007 — Transferência entre usuários

O usuário autenticado deve conseguir transferir valores disponíveis para outro usuário do AtlasPay.

### RF-008 — Consulta de transações

O usuário deve conseguir consultar o histórico de movimentações da sua carteira.

### RF-009 — Detalhes de uma transação

O usuário deve conseguir visualizar informações detalhadas de uma transação específica.

### RF-010 — Cancelamento ou rejeição de operação inválida

O sistema deve impedir transferências que não possam ser realizadas, como operações sem saldo suficiente ou com valores inválidos.

## Requisitos não funcionais

### RNF-001 — Segurança de senhas
Senhas nunca devem ser armazenadas em texto puro.

### RNF-002 — Consistência financeira
Uma transferência deve ser concluída completamente ou não acontecer.

### RNF-003 — Autenticação
Rotas privadas devem exigir autenticação válida.

### RNF-004 — Persistência
Os dados da aplicação devem ser armazenados em banco de dados MySQL.
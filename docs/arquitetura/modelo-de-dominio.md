# Modelo de Domínio do AtlasPay

Este documento descreve conceitualmente os principais domínios do AtlasPay, suas responsabilidades e seus limites.

Neste momento, os domínios não representam necessariamente tabelas, entidades TypeORM ou serviços específicos.

## Relações principais

```text
User
  │
  ├── utiliza → Authentication
  │
  └── possui → Wallet
                  │
                  ├── envia/recebe → Transfer
                  │
                  └── possui → Transaction
```

Uma transferência conecta duas carteiras e gera as movimentações financeiras necessárias para representar o débito e o crédito.

---

## Domínio de usuários

**Objetivo:** representar a identidade e os dados de perfil de uma pessoa cadastrada no AtlasPay.

### Responsabilidades

- Cadastrar um usuário com os dados obrigatórios.
- Manter os dados que compõem seu perfil.
- Disponibilizar os dados do perfil para o próprio usuário.
- Fornecer uma identificação estável para os demais domínios.

### Não é responsabilidade desse domínio

- Validar login ou controlar sessões — pertence à autenticação.
- Armazenar ou alterar saldo — pertence às carteiras.
- Executar transferências — pertence às transferências.
- Registrar movimentações financeiras — pertence às transações.

### Regras conhecidas

- O cadastro deve possuir todos os dados obrigatórios.
- Cada usuário deve possuir uma identificação única no sistema.
- Informações sensíveis não devem ser retornadas na consulta do perfil.
- Um usuário deve possuir uma carteira associada.

### Decisões pendentes

- Quais dados serão obrigatórios no cadastro.
- Qual dado será utilizado como identificador de login.
- Quais informações do perfil poderão ser alteradas.
- Como será garantida a unicidade de e-mail ou outro identificador.

---

## Domínio de autenticação

**Objetivo:** confirmar a identidade do usuário, controlar o início e o encerramento de sua sessão e fornecer sua identidade autenticada às áreas privadas da aplicação.

### Responsabilidades

- Validar as credenciais apresentadas no login.
- Criar e validar o mecanismo de autenticação adotado.
- Identificar o usuário associado à requisição autenticada.
- Encerrar ou invalidar a sessão durante o logout.
- Rejeitar credenciais inválidas, expiradas ou revogadas.

### Não é responsabilidade desse domínio

- Administrar os dados do perfil — pertence aos usuários.
- Consultar ou alterar saldo — pertence às carteiras.
- Decidir se uma transferência pode ser realizada — pertence às transferências.
- Registrar movimentações financeiras — pertence às transações.
- Registrar todo o histórico de ações do usuário — pertencerá a uma futura área de auditoria.

### Regras conhecidas

- A senha original nunca deve ser armazenada ou registrada em logs.
- A senha informada deve ser comparada com um hash armazenado de forma segura.
- Endpoints privados devem exigir autenticação válida.
- Credenciais inválidas, expiradas ou revogadas não devem conceder acesso.
- O logout deve impedir a reutilização da sessão conforme a estratégia adotada.

### Decisões pendentes

- Utilização de sessão, JWT ou outra estratégia.
- Necessidade de access token e refresh token.
- Forma de armazenamento e revogação das sessões.
- Inclusão futura de cargos e permissões.

---

## Domínio de carteiras

**Objetivo:** representar a carteira financeira de um usuário e controlar seu saldo disponível.

### Responsabilidades

- Manter uma carteira associada a um usuário.
- Informar o saldo disponível.
- Participar das operações de débito e crédito.
- Impedir alterações de saldo que violem as regras financeiras.

### Não é responsabilidade desse domínio

- Cadastrar ou autenticar o usuário.
- Decidir sozinho se uma transferência completa é válida.
- Armazenar os dados detalhados de uma transferência.
- Apresentar o histórico completo de movimentações.

### Regras conhecidas

- Cada usuário deve possuir uma carteira.
- Uma carteira deve pertencer a um único usuário.
- O saldo não deve ficar negativo após uma operação.
- O saldo somente deve ser alterado por uma operação financeira válida.
- Valores monetários não devem ser tratados com tipos que provoquem erros de precisão.

### Decisões pendentes

- Se a carteira começará com saldo zero.
- Como será adicionada uma quantia fictícia para testes.
- Se o saldo será armazenado ou calculado pelas movimentações.
- Se o sistema trabalhará inicialmente com apenas uma moeda.
- Se carteiras poderão ser bloqueadas ou encerradas.

---

## Domínio de transferências

**Objetivo:** coordenar a movimentação de valores entre duas carteiras do AtlasPay.

### Responsabilidades

- Receber uma solicitação de transferência.
- Identificar as carteiras de origem e destino.
- Validar o valor informado e o saldo disponível.
- Executar o débito e o crédito de forma atômica.
- Registrar o resultado da operação.
- Solicitar a criação das movimentações financeiras correspondentes.
- Rejeitar operações inválidas sem produzir alterações parciais.

### Não é responsabilidade desse domínio

- Autenticar diretamente o usuário.
- Administrar os dados do perfil.
- Modificar saldos sem respeitar as regras das carteiras.
- Apresentar todo o histórico financeiro de uma carteira.

### Regras conhecidas

- O valor da transferência deve ser maior que zero.
- A carteira de origem deve possuir saldo suficiente.
- As carteiras de origem e destino devem existir.
- Uma transferência deve ser concluída completamente ou não acontecer.
- Uma transferência rejeitada não deve alterar nenhum saldo.
- Uma transferência concluída deve permitir identificar origem, destino, valor e momento da operação.

### Decisões pendentes

- Se transferências para a própria carteira serão permitidas.
- Quais estados uma transferência poderá possuir.
- Como operações repetidas serão identificadas.
- Se transferências concluídas poderão ser revertidas.
- Quais limites de valor serão aplicados.

---

## Domínio de transações

**Objetivo:** registrar e apresentar as movimentações financeiras ocorridas em cada carteira.

Neste documento, “transação” significa uma movimentação financeira. Ela não deve ser confundida com a transação técnica utilizada pelo banco de dados para garantir atomicidade.

### Responsabilidades

- Registrar movimentações de débito e crédito.
- Associar cada movimentação a uma carteira.
- Relacionar uma movimentação à transferência que a originou.
- Disponibilizar o histórico de movimentações de uma carteira.
- Disponibilizar os detalhes de uma movimentação específica.

### Não é responsabilidade desse domínio

- Iniciar uma transferência.
- Validar credenciais de acesso.
- Decidir se uma carteira possui saldo suficiente.
- Alterar os dados de perfil do usuário.

### Regras conhecidas

- Toda movimentação deve pertencer a uma carteira.
- Uma movimentação deve identificar se representa débito ou crédito.
- O usuário somente deve acessar movimentações relacionadas à sua carteira.
- Uma movimentação deve registrar valor e momento da ocorrência.
- Movimentações financeiras confirmadas não devem ser apagadas ou alteradas livremente.
- Uma transferência concluída deve deixar registros que expliquem as alterações realizadas nas carteiras envolvidas.

### Decisões pendentes

- Quais informações serão exibidas nos detalhes.
- Como cancelamentos ou estornos serão representados.
- Se o domínio será chamado de `transactions`, `entries` ou `movements` no código.
- Como o histórico será ordenado e paginado.
- Se o saldo resultante será registrado em cada movimentação.
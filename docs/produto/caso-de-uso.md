# Casos de Uso do AtlasPay

Este documento descreve os casos de uso iniciais do AtlasPay com base nos requisitos funcionais e não funcionais definidos para a primeira versão do sistema.

Os casos de uso representam comportamentos do negócio. Eles não definem endpoints HTTP, controllers, entidades TypeORM ou outros detalhes de implementação.

## Mapeamento dos requisitos

| Caso de uso | Requisitos relacionados |
|---|---|
| UC-001 — Cadastrar usuário | RF-001, RF-005, RNF-001 e RNF-004 |
| UC-002 — Realizar login | RF-002, RNF-001 e RNF-003 |
| UC-003 — Realizar logout | RF-003 e RNF-003 |
| UC-004 — Consultar perfil | RF-004 e RNF-003 |
| UC-005 — Consultar saldo | RF-006, RNF-003 e RNF-004 |
| UC-006 — Realizar transferência | RF-007, RF-010, RNF-002, RNF-003 e RNF-004 |
| UC-007 — Consultar histórico de transações | RF-008, RNF-003 e RNF-004 |
| UC-008 — Consultar detalhes de uma transação | RF-009, RNF-003 e RNF-004 |

---

## UC-001 — Cadastrar usuário

### Ator

Visitante não autenticado.

### Objetivo

Criar uma conta no AtlasPay com uma carteira digital associada.

### Pré-condições

- O cadastro deve estar disponível publicamente.

### Fluxo principal

1. O visitante informa os dados obrigatórios e uma senha.
2. O sistema valida os dados recebidos.
3. O sistema verifica se o identificador de login já está sendo utilizado.
4. O sistema transforma a senha em um hash seguro.
5. O sistema cria o usuário.
6. O sistema cria uma carteira associada ao usuário.
7. O sistema confirma a conclusão do cadastro.

### Fluxos alternativos

- **A1 — Dados inválidos:** o sistema rejeita o cadastro e informa quais dados precisam ser corrigidos.
- **A2 — Dados obrigatórios ausentes:** o sistema rejeita o cadastro.
- **A3 — Identificador já utilizado:** o sistema rejeita o cadastro sem criar outro usuário.
- **A4 — Falha ao criar a carteira:** o usuário não deve permanecer cadastrado sem uma carteira associada.
- **A5 — Falha de persistência:** nenhuma informação parcial deve permanecer armazenada.

### Pós-condições de sucesso

- O usuário está cadastrado.
- A senha original não foi armazenada.
- Existe uma carteira associada ao usuário.
- O usuário pode utilizar suas credenciais para realizar login.

### Pós-condições de falha

- Nenhum usuário incompleto deve permanecer cadastrado.
- Nenhuma carteira sem proprietário deve ser criada.

### Requisitos relacionados

- RF-001 — Cadastro de usuário.
- RF-005 — Carteira digital.
- RNF-001 — Segurança de senhas.
- RNF-004 — Persistência.

---

## UC-002 — Realizar login

### Ator

Usuário cadastrado.

### Objetivo

Autenticar-se no AtlasPay e obter acesso às funcionalidades privadas.

### Pré-condições

- O usuário deve possuir uma conta cadastrada.

### Fluxo principal

1. O usuário informa seu identificador de login e sua senha.
2. O sistema localiza a conta correspondente.
3. O sistema compara a senha informada com o hash armazenado.
4. O sistema cria o mecanismo de autenticação adotado.
5. O sistema associa a autenticação à identidade do usuário.
6. O sistema confirma que o login foi realizado.

### Fluxos alternativos

- **A1 — Credenciais inválidas:** o sistema rejeita a autenticação.
- **A2 — Usuário inexistente:** o sistema rejeita a autenticação.
- **A3 — Dados ausentes:** o sistema solicita os dados obrigatórios.
- **A4 — Falha ao criar a sessão:** o usuário não deve ser considerado autenticado.

### Pós-condições de sucesso

- O usuário possui uma autenticação válida.
- O sistema consegue identificar o usuário nas operações privadas.

### Pós-condições de falha

- Nenhuma autenticação válida é criada.
- O usuário permanece sem acesso às funcionalidades privadas.

### Requisitos relacionados

- RF-002 — Login.
- RNF-001 — Segurança de senhas.
- RNF-003 — Autenticação.

---

## UC-003 — Realizar logout

### Ator

Usuário autenticado.

### Objetivo

Encerrar a sessão atual e impedir sua reutilização.

### Pré-condições

- O usuário deve possuir uma sessão ativa.

### Fluxo principal

1. O usuário solicita o encerramento da sessão.
2. O sistema identifica a sessão ou credencial utilizada.
3. O sistema encerra ou invalida essa sessão.
4. O sistema confirma a realização do logout.

### Fluxos alternativos

- **A1 — Credencial inválida:** o sistema mantém o acesso negado.
- **A2 — Sessão já encerrada:** nenhuma nova sessão é criada e o acesso continua negado.
- **A3 — Falha ao invalidar a sessão:** o sistema não deve informar que o logout foi concluído enquanto a credencial continuar utilizável.

### Pós-condições de sucesso

- A sessão encerrada não pode mais acessar funcionalidades privadas.
- Outras sessões do usuário não são afetadas, salvo decisão futura em contrário.

### Pós-condições de falha

- O sistema informa que não conseguiu concluir o encerramento caso a sessão continue ativa.

### Requisitos relacionados

- RF-003 — Logout.
- RNF-003 — Autenticação.

---

## UC-004 — Consultar perfil

### Ator

Usuário autenticado.

### Objetivo

Visualizar os dados do próprio perfil.

### Pré-condições

- O usuário deve possuir uma autenticação válida.
- O usuário deve estar cadastrado.

### Fluxo principal

1. O usuário solicita os dados do seu perfil.
2. O sistema identifica o usuário autenticado.
3. O sistema localiza seu cadastro.
4. O sistema remove informações que não podem ser expostas.
5. O sistema apresenta os dados permitidos do perfil.

### Fluxos alternativos

- **A1 — Autenticação ausente:** o sistema nega o acesso.
- **A2 — Autenticação inválida ou expirada:** o sistema nega o acesso.
- **A3 — Usuário não encontrado:** o sistema não retorna dados de perfil.
- **A4 — Tentativa de consultar outro usuário:** o sistema nega o acesso.

### Pós-condições de sucesso

- Os dados permitidos do perfil são apresentados.
- Nenhuma informação sensível é exposta.
- Nenhum dado do usuário é alterado.

### Pós-condições de falha

- Nenhuma informação de perfil é apresentada.

### Requisitos relacionados

- RF-004 — Consulta de perfil.
- RNF-003 — Autenticação.

---

## UC-005 — Consultar saldo

### Ator

Usuário autenticado.

### Objetivo

Consultar o saldo disponível em sua própria carteira.

### Pré-condições

- O usuário deve possuir uma autenticação válida.
- O usuário deve possuir uma carteira associada.

### Fluxo principal

1. O usuário solicita a consulta do saldo.
2. O sistema identifica o usuário autenticado.
3. O sistema localiza a carteira associada ao usuário.
4. O sistema obtém o saldo disponível.
5. O sistema apresenta o saldo ao usuário.

### Fluxos alternativos

- **A1 — Autenticação ausente:** o sistema nega o acesso.
- **A2 — Autenticação inválida ou expirada:** o sistema nega o acesso.
- **A3 — Carteira não encontrada:** o sistema não apresenta um saldo e identifica uma inconsistência.
- **A4 — Tentativa de consultar outra carteira:** o sistema nega o acesso.

### Pós-condições de sucesso

- O saldo disponível é apresentado.
- Nenhum valor da carteira é alterado.

### Pós-condições de falha

- Nenhuma informação financeira indevida é apresentada.
- O saldo permanece inalterado.

### Requisitos relacionados

- RF-006 — Consulta de saldo.
- RNF-003 — Autenticação.
- RNF-004 — Persistência.

---

## UC-006 — Realizar transferência

### Ator

Usuário autenticado.

### Objetivo

Transferir um valor disponível de sua carteira para a carteira de outro usuário do AtlasPay.

### Pré-condições

- O usuário deve possuir uma autenticação válida.
- O usuário deve possuir uma carteira associada.

### Fluxo principal

1. O usuário informa o destinatário e o valor da transferência.
2. O sistema identifica o usuário autenticado e sua carteira.
3. O sistema localiza a carteira do destinatário.
4. O sistema valida o valor informado.
5. O sistema verifica o saldo disponível na carteira de origem.
6. O sistema inicia uma operação financeira atômica.
7. O sistema registra a transferência.
8. O sistema realiza o débito na carteira de origem.
9. O sistema realiza o crédito na carteira de destino.
10. O sistema registra as movimentações financeiras correspondentes.
11. O sistema conclui a operação.
12. O sistema apresenta a confirmação da transferência.

### Fluxos alternativos

- **A1 — Autenticação ausente:** o sistema nega a operação.
- **A2 — Autenticação inválida ou expirada:** o sistema nega a operação.
- **A3 — Valor igual ou menor que zero:** o sistema rejeita a transferência.
- **A4 — Saldo insuficiente:** o sistema rejeita a transferência sem alterar os saldos.
- **A5 — Destinatário inexistente:** o sistema rejeita a transferência.
- **A6 — Carteira de origem inexistente:** o sistema rejeita a transferência.
- **A7 — Carteira de destino inexistente:** o sistema rejeita a transferência.
- **A8 — Falha durante o débito:** nenhuma alteração financeira deve permanecer.
- **A9 — Falha durante o crédito:** o débito e as demais alterações devem ser desfeitos.
- **A10 — Falha ao registrar as movimentações:** toda a operação deve ser desfeita.
- **A11 — Saldo alterado por outra operação simultânea:** o sistema valida novamente a disponibilidade e rejeita a transferência se necessário.

### Pós-condições de sucesso

- O valor foi debitado da carteira de origem.
- O mesmo valor foi creditado na carteira de destino.
- A transferência foi registrada.
- As movimentações de débito e crédito foram registradas.
- Os dados armazenados permanecem consistentes.

### Pós-condições de falha

- Nenhum saldo deve sofrer alteração parcial.
- Nenhuma transferência incompleta deve ser considerada concluída.
- Nenhuma movimentação financeira isolada deve permanecer registrada.

### Requisitos relacionados

- RF-007 — Transferência entre usuários.
- RF-010 — Cancelamento ou rejeição de operação inválida.
- RNF-002 — Consistência financeira.
- RNF-003 — Autenticação.
- RNF-004 — Persistência.

---

## UC-007 — Consultar histórico de transações

### Ator

Usuário autenticado.

### Objetivo

Visualizar o histórico de movimentações de sua carteira.

### Pré-condições

- O usuário deve possuir uma autenticação válida.
- O usuário deve possuir uma carteira associada.

### Fluxo principal

1. O usuário solicita seu histórico de transações.
2. O sistema identifica o usuário autenticado.
3. O sistema localiza a carteira associada.
4. O sistema consulta as movimentações dessa carteira.
5. O sistema organiza as movimentações conforme o critério definido.
6. O sistema apresenta o histórico ao usuário.

### Fluxos alternativos

- **A1 — Autenticação ausente:** o sistema nega o acesso.
- **A2 — Autenticação inválida ou expirada:** o sistema nega o acesso.
- **A3 — Carteira não encontrada:** o sistema não apresenta um histórico.
- **A4 — Nenhuma movimentação encontrada:** o sistema apresenta um histórico vazio.
- **A5 — Tentativa de consultar outra carteira:** o sistema nega o acesso.

### Pós-condições de sucesso

- O histórico da carteira é apresentado.
- Nenhuma movimentação é alterada.

### Pós-condições de falha

- Nenhuma movimentação de outra carteira é exposta.
- Os registros financeiros permanecem inalterados.

### Requisitos relacionados

- RF-008 — Consulta de transações.
- RNF-003 — Autenticação.
- RNF-004 — Persistência.

---

## UC-008 — Consultar detalhes de uma transação

### Ator

Usuário autenticado.

### Objetivo

Visualizar as informações detalhadas de uma movimentação específica de sua carteira.

### Pré-condições

- O usuário deve possuir uma autenticação válida.
- O usuário deve possuir uma carteira associada.

### Fluxo principal

1. O usuário informa qual transação deseja consultar.
2. O sistema identifica o usuário autenticado.
3. O sistema localiza sua carteira.
4. O sistema localiza a transação solicitada.
5. O sistema confirma que a transação pertence à carteira do usuário.
6. O sistema apresenta os detalhes permitidos.

### Fluxos alternativos

- **A1 — Autenticação ausente:** o sistema nega o acesso.
- **A2 — Autenticação inválida ou expirada:** o sistema nega o acesso.
- **A3 — Transação inexistente:** o sistema informa que o registro não foi encontrado.
- **A4 — Transação pertencente a outra carteira:** o sistema nega o acesso.
- **A5 — Carteira não encontrada:** o sistema não apresenta os detalhes.

### Pós-condições de sucesso

- Os detalhes permitidos da transação são apresentados.
- Nenhum registro financeiro é alterado.

### Pós-condições de falha

- Nenhuma informação financeira de outro usuário é exposta.
- Os registros permanecem inalterados.

### Requisitos relacionados

- RF-009 — Detalhes de uma transação.
- RNF-003 — Autenticação.
- RNF-004 — Persistência.

---

## Decisões pendentes

Os seguintes pontos precisam ser definidos antes das partes da implementação que dependem deles:

- Quais dados serão obrigatórios no cadastro.
- Qual identificador será utilizado no login.
- Se o cadastro realizará login automaticamente.
- Qual estratégia de autenticação será utilizada.
- Como sessões ou credenciais serão revogadas.
- Qual será o saldo inicial de uma carteira.
- Como valores fictícios serão adicionados às carteiras.
- Como o destinatário será identificado durante a transferência.
- Se transferências para a própria carteira serão permitidas.
- Quais estados uma transferência poderá possuir.
- Como requisições de transferência repetidas serão tratadas.
- Se transferências concluídas poderão ser estornadas.
- Quais informações serão apresentadas no histórico.
- Como o histórico será ordenado e paginado.
- Quais informações aparecerão nos detalhes de uma transação.
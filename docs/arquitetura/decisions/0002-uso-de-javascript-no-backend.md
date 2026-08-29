# ADR 0002 — Uso de JavaScript no backend

## Status

Aceito.

## Contexto

O backend do AtlasPay será desenvolvido com Node.js e Express.

Durante o planejamento inicial, TypeScript foi considerado como linguagem para o backend por oferecer tipagem estática e maior segurança durante o desenvolvimento.

No entanto, para esta etapa do projeto, a prioridade será aprofundar os conhecimentos em JavaScript, Node.js, Express, arquitetura backend, banco de dados, segurança e regras de negócio.

## Decisão

O backend do AtlasPay será desenvolvido utilizando JavaScript.

Node.js será utilizado como ambiente de execução e Express como framework HTTP.

## Alternativas consideradas

- JavaScript
- TypeScript

## Motivos

JavaScript foi escolhido por permitir maior foco nos fundamentos de desenvolvimento backend sem introduzir, neste momento, a complexidade adicional do sistema de tipos do TypeScript.

A escolha também está alinhada com as tecnologias atualmente estudadas durante o desenvolvimento do projeto.

## Consequências

A aplicação não terá tipagem estática em tempo de desenvolvimento.

Erros relacionados a tipos deverão ser reduzidos por meio de:

- validação de dados de entrada;
- testes automatizados;
- organização clara do código;
- boas práticas de desenvolvimento.

Uma futura migração para TypeScript poderá ser avaliada caso o crescimento do projeto justifique essa mudança.
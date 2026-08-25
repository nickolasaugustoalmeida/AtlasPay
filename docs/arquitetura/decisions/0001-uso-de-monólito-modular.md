# ADR 0001 — Utilizar monólito modular

## Status

Aceito.

## Contexto

O AtlasPay terá diferentes áreas de negócio, como autenticação, usuários, carteiras, transferências e análise de risco.

Apesar dessas áreas serem independentes conceitualmente, o projeto será inicialmente desenvolvido por uma única equipe e não possui necessidade real de infraestrutura distribuída.

## Decisão

O backend do AtlasPay será desenvolvido inicialmente utilizando uma arquitetura de monólito modular.

Cada domínio da aplicação terá seu próprio módulo e responsabilidades bem definidas.

## Alternativas consideradas

- Monólito tradicional
- Monólito modular
- Microserviços

## Motivos

O monólito modular permite separar responsabilidades e domínios sem introduzir a complexidade operacional de sistemas distribuídos.

Microserviços adicionariam preocupações como comunicação entre serviços, descoberta de serviços, observabilidade distribuída e consistência entre diferentes bancos de dados antes que o projeto realmente necessite disso.

## Consequências

O AtlasPay será executado inicialmente como uma única aplicação backend, mas seus módulos deverão possuir limites claros para facilitar futuras evoluções arquiteturais.
lanchonete-bom-sabor-app/
├─ app/ ← SOMENTE UI + rotas
│ ├─ \_layout.tsx
│ ├─ login.tsx
│ ├─ (tabs)/
│ │ ├─ \_layout.tsx
│ │ ├─ index.tsx
│ │ ├─ venda.tsx
│ │ ├─ produtos.tsx
│ │ ├─ estoque.tsx
│ │ └─ relatorios.tsx
│ ├─ produto/
│ │ ├─ novo.tsx
│ │ └─ [id].tsx
│ └─ venda/
│
├─ src/ ← LÓGICA DA APLICAÇÃO
│ ├─ contexts/
│ │ ├─ auth.context.tsx
│ │ ├─ venda.context.tsx
│ │ ├─ insumo.context.tsx
│ │ └─ produto-venda.context.tsx
│ │
│ ├─ services/
│ │ ├─ firebase.ts
│ │ ├─ auth.service.ts
│ │ ├─ insumo.service.ts
│ │ ├─ produto-venda.service.ts
│ │ └─ venda.service.ts
│ │
│ ├─ hooks/
│ │ ├─ use-produto.hook.ts
│ │ └─ use-venda.hook.ts
│ │ ├─ use-auth.hook.ts
│ │ ├─ use-insumo.hook.ts
│ │ └─ use-sessao.hook.ts
│ │
│ ├─ types/
│ │ ├─ ProdutoVenda.ts
│ │ ├─ Insumo.ts
│ │ ├─ Venda.ts
│ │ └─ Usuario.ts
│ │
│ └─ utils/
│ ├─ formatCurrency.ts
│ └─ dates.ts
│
├─ assets/
│ └─ images/
│
├─ tsconfig.json
├─ package.json
└─ README.md

1 - DIAGNÓSTICO E TEORIZAÇÃO

1.1 - Identificação das partes envolvidas e parceiros
Descrever as partes envolvidas no projeto, identificando o público da comunidade local que será impactado pela atividade. Exemplo: colaboradores de uma pequena lanchonete local que atualmente controlam suas vendas e estoque manualmente, com dados de perfil socioeconômico, escolaridade, gênero, faixa etária e outros. Incluir informações como nome, endereço, CNPJ, website e os principais colaboradores envolvidos.
Nome do projeto: Sistema móvel de controle de vendas e estoque para lanchonete local
Parceiro comunitário (Fictício):

Nome: Lanchonete Bom Sabor

Endereço: Rua Exemplo, 123, Bairro Centro, Cidade/UF

CNPJ: 12.345.678/0001-90

Website: https://lanchonetebomsabor.exemplo

Principais colaboradores envolvidos:

João Silva — proprietário / gestor operacional — +55 (XX) 9XXXX-XXXX

Maria Souza — caixa / responsável por estoque

Carlos Pereira — cozinheiro (usuário final)

Perfil socioeconômico (exemplo):

Faixa etária dos colaboradores: 25–55 anos

Escolaridade: Ensino médio completo (maioria)

Gênero: misto

Observação: sistema deverá ser simples, com UI clara; haverá resistência inicial a telas complexas.

1.2 - Situação-problema identificada
Apresentar os problemas identificados na comunidade que motivam a atividade. Exemplo: a lanchonete enfrenta desafios significativos na gestão das vendas e controle de estoque devido ao registro manual, o que gera erros, desperdício e dificuldades de previsão de compras.
A lanchonete registra vendas e estoques de forma manual (caderneta/excel local). Isso gera:

erros de registro (troca de valores, itens não registrados);

desperdício por validade e compras em excesso;

dificuldade de previsão de compras;

atrasos no fechamento do caixa e inconsistência entre caixa e estoque.

1.3 - Demanda sociocomunitária e motivação acadêmica
Explicar como a situação-problema afeta a vida econômica e operacional da comunidade e como a implementação de um aplicativo Android pode solucionar essas questões. Ressaltar que a atividade permite a aplicação prática de técnicas de programação, design de software e gestão, contribuindo para a formação acadêmica e técnica do aluno.
Impacto comunitário: melhoria da gestão financeira, redução de desperdício, ganhos de eficiência; melhoria na renda do estabelecimento.
Motivação acadêmica: aplicar conceitos de programação móvel (React Native), design de UI/UX, persistência de dados (Firebase), integração com backend (Firestore), testes (TDD/automatizados), e práticas de avaliação — tudo compatível com competências da disciplina.

1.4 - Objetivos a serem alcançados em relação à situação-problema identificada
Definir objetivos claros e mensuráveis, como desenvolver um aplicativo de controle de vendas até o final do semestre, treinar os funcionários da lanchonete no uso do sistema e reduzir os erros de vendas e controle de estoque.
Objetivo geral: Desenvolver e implantar até o final do semestre um aplicativo Android para controle de vendas e estoque da lanchonete, com autenticação de usuários e relatórios básicos.

Objetivos específicos (mensuráveis):

Ter funcionalidade de cadastro de produtos com código, preço e estoque em até 4 semanas.

Implementar registro de vendas que decrementa o estoque automaticamente e gera recibo digital até 6 semanas.

Treinar 3 funcionários no uso do app em 1 sessão presencial (2h) até 10 semanas.

Reduzir divergências entre registro de vendas e estoque em ≥50% no período de 4 semanas pós-implantação (comparar com base anterior).

2 - PLANEJAMENTO PARA DESENVOLVIMENTO DO PROJETO

2.1 - Plano de trabalho com cronograma das atividades
Descrever detalhadamente o plano de trabalho, especificando as ações a serem realizadas, prazos e os recursos necessários. Exemplo: Ação 1 - Levantar requisitos junto aos colaboradores da lanchonete; Ação 2 - Modelar e desenvolver o aplicativo utilizando tecnologia Android (ex.: programação em Kotlin, uso de Firebase); Ação 3 - Testar o aplicativo com dados reais e ajustar funcionalidades; Ação 4 - Realizar treinamento prático para os funcionários; Ação 5 - Aplicar pesquisa de satisfação para mensurar os resultados.
Semana | Atividade

1 Levantamento de requisitos com colaboradores (entrevista + observação)
2 Modelagem de dados e protótipos (Figma): telas principais
3 Configuração do projeto (Expo), Firebase, autenticação
4 Implementação: telas de produtos e estoque
5 Implementação: tela de vendas (carrinho) e lógica de atualização de estoque
6 Implementação: relatórios e histórico de vendas
7 Testes unitários e TDD em funções críticas (cadastro/ajuste de estoque)
8 Ajustes de usabilidade, correções e tradução (pt-BR)
9 Testes com usuários (beta) na lanchonete com dados reais
10 Treinamento prático dos funcionários (sessão presencial)
11 Coleta de feedback e ajustes finais
12 Entrega final, relatório, evidências e aplicação da pesquisa de satisfação

2.2 - Metodologia
Descrever os métodos utilizados para a realização da atividade, como entrevistas, observação, modelagem de protótipos (ex.: Figma), programação em linguagem Kotlin e Test-Driven Development (TDD). Explicar como esses métodos serão aplicados para coletar requisitos, desenvolver e testar o aplicativo, além de capacitar os usuários.
Coleta de requisitos: entrevistas semiestruturadas com colaboradores; observação direta do fluxo de vendas.

Projeto e prototipagem: criar telas de baixa/média fidelidade no Figma; validar com usuários.

Desenvolvimento: React Native com Expo (rápido para provar conceito) + Firebase (Authentication + Firestore).

Qualidade: testes unitários (Jest) para funções de negócio; testes manuais com checklist.

Entrega / Treinamento: sessão prática com checklist de uso; manual rápido em PDF.

Avaliação: comparação antes/depois nos indicadores de vendas/estoque + questionário de satisfação.

2.3 - Avaliação dos resultados alcançados
Definir os instrumentos e indicadores para avaliar os resultados da atividade. Exemplo: comparar os registros de vendas e controle de estoque antes e depois da implementação, aplicar questionários de satisfação com os colaboradores e realizar observação direta da melhoria na eficiência operacional.
Planilha de comparação (vendas e estoque — 4 semanas antes vs 4 semanas depois).

Questionário de satisfação (Likert 1–5) para funcionários.

Observação direta — tempos médios de fechamento de caixa.
Indicadores-chave:

% de redução em divergências estoque x vendas.

Tempo médio de fechamento de caixa (minutos).

Satisfação média dos usuários (≥4 é meta).

Número de erros de operação detectados por semana.

3 - ENCERRAMENTO DO PROJETO

3.1 - Evidências das atividades realizadas
Incluir evidências documentais do processo de desenvolvimento da atividade, como fotografias, capturas de tela, vídeos, e-mails trocados, links para o repositório do código (por exemplo, no GitHub) e listas de presença. Cada evidência deve ser acompanhada de uma descrição detalhada que contextualize o momento registrado, a data, o local e sua relevância para o projeto.

Termo de Responsabilidade
Atesto, para os devidos fins, que a Atividade de Extensão foi realizada com a participação efetiva da comunidade no local descrito e conforme relato apresentado no Laboratório de Extensão da Sala de Aula Virtual, gerando texto de autoria própria e sendo entregue dentro do prazo estabelecido no calendário acadêmico vigente.

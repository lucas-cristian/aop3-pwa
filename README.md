=============================================================
AOP3 - Divulgação do Projeto
Banco de Dados: Preço de Combustíveis
Aluno: Lucas Cristian Silva Braz
Disciplina: Arquitetura de Dados Relacionais I
=============================================================

## 1. Identificação e Objetivo do Projeto

Este repositório corresponde à etapa final de aplicação (**Avaliação Oficial Parcial 3 - AOP3**) da disciplina **Arquitetura de Dados Relacionais I**.

O sistema desenvolvido tem como objetivo armazenar, processar e disponibilizar dados estruturados de forma relacional referentes aos preços de combustíveis comercializados em postos de uma determinada região.

A aplicação foi projetada para atender integralmente aos requisitos acadêmicos da disciplina, permitindo a execução de consultas analíticas e fornecendo uma interface acessível tanto para usuários técnicos quanto para usuários leigos, consolidando-se como o meio de divulgação do banco de dados construído nas etapas anteriores.

O projeto completo está estruturado nas seguintes fases:

- **AOP1:** Projeto Conceitual (Diagrama Entidade-Relacionamento - EER)
- **AOP2:** Projeto Lógico e Físico (Normalização em 3FN e implementação SQL)
- **AOP3:** Aplicação prática (Sistema Web/PWA para consulta e visualização dos dados)

---

## 2. Fonte e Natureza dos Dados

Os dados utilizados neste projeto são reais, públicos e provenientes da Agência Nacional do Petróleo, Gás Natural e Biocombustíveis (ANP), disponíveis no portal oficial:

https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/serie-historica-de-precos-de-combustiveis

Durante a etapa AOP2, esses dados foram submetidos a processos de:

- Limpeza  
- Normalização  
- Tipagem  
- Estruturação relacional  

Como resultado, o banco de dados utilizado nesta etapa (AOP3) encontra-se totalmente consistente, sem redundâncias e com integridade referencial garantida, estando sincronizado com o modelo definido no AOP2.

---

## 3. Escopo dos Dados Utilizados

O conjunto de dados contemplado no sistema inclui:

- Registros de preços coletados em múltiplos postos de combustíveis;  
- Abrangência de diferentes bairros dentro da mesma cidade;  
- Múltiplas coletas por posto, realizadas em datas distintas;  
- Tipos de combustíveis analisados:  
  - Gasolina comum  
  - Gasolina aditivada  
  - Etanol  
  - Diesel  

O volume de dados foi validado e estruturado previamente no AOP2, assegurando conformidade com os requisitos mínimos da atividade e consistência nas análises realizadas.

---

## 4. Estrutura Arquitetural do Sistema

A aplicação foi desenvolvida utilizando uma arquitetura moderna baseada em separação de responsabilidades:

- **Backend:** Implementado em Next.js (Node.js), responsável pela exposição de APIs REST e manipulação dos dados via Prisma ORM conectado ao MySQL.  

- **Frontend:** Desenvolvido em Next.js com abordagem de Progressive Web App (PWA), oferecendo uma interface responsiva, performática e instalável.  

- **Banco de Dados:** MySQL, estruturado conforme o modelo relacional desenvolvido no AOP2, seguindo rigorosamente a 3ª Forma Normal (3FN).  

---

## 5. Modelagem e Normalização do Banco de Dados (AOP2)

O banco de dados foi projetado respeitando os princípios da **Terceira Forma Normal (3FN)**, garantindo:

- Eliminação de redundâncias  
- Ausência de dependências transitivas  
- Organização eficiente dos dados  

As principais entidades do modelo são:

- `cidade`  
- `bairro`  
- `posto`  
- `combustivel`  
- `coleta`  

A integridade dos dados é assegurada através de:

- Chaves primárias (PK)  
- Chaves estrangeiras (FK)  
- Restrições de unicidade (UNIQUE)  
- Restrições de domínio (CHECK)  

---

## 6. Consultas e Procedimentos Analíticos

O sistema implementa e disponibiliza, via API, as consultas obrigatórias definidas no enunciado da atividade:

1. **Menor e maior preço por combustível**  
   Identifica os valores extremos praticados para cada tipo de combustível.  

2. **Preço médio e quantidade de amostras**  
   Calcula o preço médio por posto e combustível, juntamente com a quantidade de coletas realizadas.  

3. **Preço mais recente**  
   Retorna o valor mais atual registrado para cada posto e tipo de combustível.  

4. **Evolução de preços ao longo do tempo**  
   Apresenta a variação histórica dos preços de um combustível específico em um posto específico, ordenado por data.  

---

## 7. Funcionalidades de Interface e Visualização (AOP3)

A interface do sistema foi projetada para transformar os dados do banco em informações compreensíveis e acessíveis, oferecendo:

- Visualização responsiva em diferentes dispositivos;  
- Listagem de postos e combustíveis disponíveis;  
- Filtros dinâmicos por posto e tipo de combustível;  
- Exibição de dados em formato tabular;  
- Geração de gráficos analíticos:  
  - Evolução do preço médio por combustível;  
  - Evolução do preço por posto ao longo do tempo.  

A aplicação opera como um PWA, permitindo instalação em dispositivos móveis e melhor experiência de uso.

---

## 8. Execução do Projeto

Para executar o projeto localmente, é necessário possuir:

- Node.js instalado  
- MySQL em execução  

Siga os passos abaixo:

```bash
# 1. Instalar dependências
npm install

# 2. Gerar cliente do Prisma
npx prisma generate

# 3. Criar estrutura do banco
npx prisma db push

# 4. Popular banco com dados reais do AOP2
npx prisma db seed

# 5. Iniciar aplicação
npm run dev
# AOP3 - Backend (API de Preços de Combustíveis)

Este repositório contém a **Base Backend Next.js + Prisma** para suportar a aplicação do trabalho AOP3. Os dados oferecidos pelas rotas espelham a arquitetura finalizada e normalizada (3FN) oriunda da base de dados AOP2 alimentada pelos CSVs oficiais públicos da ANP.

## 🚀 Tecnologias

- **Next.js** App Router API handlers.
- **TypeScript** tipagem estrita de objetos.
- **Prisma** para interface de acesso ao banco (ORM).
- **Zod** para validação de query params e requests.
- **MySQL 8.0** base de dados relacional.

## 📂 Arquitetura Desenhada (Clean e Modular)

```
src/
├── app/
│   └── api/                  # 1. API Endpoints Expostos
│       ├── consultas/               # -> Requisitos obrigatórios II.d
│       ├── graficos/                # -> Enpoints para UI futura
│       └── health/                  # -> Monitoramento de conexão
├── lib/
│   └── prisma.ts             # 2. Instanciador Singleton DB Connection
└── server/
    ├── repositories/         # 3. Isolamento de Queries Nativas e ORM
    ├── services/             # 4. Regras de negócio e Injeção
    └── schemas/              # 5. DTOs de Validação (Zod + Standard Model)
prisma/
  └── schema.prisma           # Mapeamento do MySQL da AOP2 com FKs e CheckConstraints mantidas
```

## ⚙️ Como excutar localmente

1. Tenha o banco MySQL rodando com o schema `exercicio-AOP2.sql` já abastecido.
2. Certifique-se de configurar suas credenciais do banco no arquivo `.env`:
   `DATABASE_URL="mysql://usuario:senha@localhost:3306/preco_combustiveis"`
3. Baixe as dependências:
   `npm install`
4. Leia o banco de dados (Gera o autocompletion):
   `npx prisma generate`
5. Inicie o servidor:
   `npm run dev`
6. Teste com `http://localhost:3000/api/consultas/menor-maior-preco`

Padrão REST retornado uniformizado: `{ "success": boolean, "data": Object, "message": string }`

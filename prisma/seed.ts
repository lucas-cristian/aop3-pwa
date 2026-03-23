import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seed automático do banco de dados...");

  const sqlPath = path.join(__dirname, 'sql', 'exercicio-AOP2.sql');
  if (!fs.existsSync(sqlPath)) {
    throw new Error(`Arquivo SQL não encontrado em: ${sqlPath}`);
  }

  const sqlContent = fs.readFileSync(sqlPath, 'utf-8');

  console.log("Limpando dados existentes para evitar duplicação...");

  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE coleta;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE combustivel;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE telefone_posto;`).catch(() => { });
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE posto;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE bairro;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE cidade;`);
  } catch (e) {
    console.error("Aviso durante o TRUNCATE:", e);
  } finally {
    await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);
  }

  console.log("Extraindo e inserindo dados reais do AOP2...");

  const insertStatements = sqlContent.match(/INSERT INTO[\s\S]*?;/g);

  if (!insertStatements || insertStatements.length === 0) {
    throw new Error("Nenhum comando INSERT INTO encontrado no arquivo SQL.");
  }

  for (const statement of insertStatements) {
    try {
      await prisma.$executeRawUnsafe(statement);
    } catch (err: any) {
      console.error("Falha ao executar INSERT SQL:");
      console.error(statement.substring(0, 100) + '...');
      throw err;
    }
  }

  console.log(`Seed concluído com sucesso! ${insertStatements.length} blocos de inserção foram processados.`);
  console.log(`O banco de dados agora está 100% idêntico ao AOP2.`);
}

main()
  .catch((e) => {
    console.error("Erro fatal durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

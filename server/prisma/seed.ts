import argon2 from 'argon2';
import { prisma } from '../src/lib/prisma'; // Ajuste o caminho se sua config for diferente

async function main() {
  console.log('Iniciando o Seed do Banco de Dados...');

  // 1. Limpa os filhos primeiro
  await prisma.productSupplier.deleteMany();
  await prisma.stockMovement.deleteMany();
  await prisma.product.deleteMany();

  // 2. Limpa os pais
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.supplier.deleteMany();

  console.log('Tabelas limpas. Populando o banco de dados...');

  console.log('Criando Categorias...');
  await prisma.category.createMany({
    data: [
      { name: 'Notebooks' },
      { name: 'Smartphones' },
      { name: 'Periféricos' },
      { name: 'Monitores' },
      { name: 'Hardware' },
    ],
  });

  console.log('Criando Marcas...');
  await prisma.brand.createMany({
    data: [
      { name: 'Lenovo' },
      { name: 'Dell' },
      { name: 'Apple' },
      { name: 'Samsung' },
      { name: 'Logitech' },
      { name: 'Intel' },
    ],
  });

  console.log('Criando Fornecedores...');
  await prisma.supplier.createMany({
    data: [
      {
        name: 'TechMart Distribuidora',
        company: 'TechMart Importação e Exportação LTDA',
        address: 'Av. das Placas Mãe, 1024 - São Paulo, SP',
      },
      {
        name: 'Global Atacado IT',
        company: 'Global Information Technology S.A.',
        address: 'Rua dos Servidores, 404 - Campinas, SP',
      },
    ],
  });

  const passwordHash = await argon2.hash('200305');

  const user = await prisma.user.upsert({
    where: { username: 'nexus.admin' },
    update: {},
    create: {
      name: 'Administrador do Sistema',
      username: 'nexus.admin',
      password: passwordHash,
      role: 'MANAGER',
    },
  });

  console.log(`Usuário criado: ${user.username} (Role: ${user.role})`);

  console.log('Banco populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

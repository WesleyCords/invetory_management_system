import argon2 from 'argon2';
import { prisma } from '../src/lib/prisma'; // Ajuste o caminho se sua config for diferente
import { MovementType } from '@prisma/client';

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

  console.log('📦 Criando Categorias e capturando os IDs...');

  const catNotebooks = await prisma.category.create({
    data: { name: 'Notebooks' },
  });
  const catSmartphones = await prisma.category.create({
    data: { name: 'Smartphones' },
  });
  const catPerifericos = await prisma.category.create({
    data: { name: 'Periféricos' },
  });

  await prisma.category.createMany({
    data: [{ name: 'Monitores' }, { name: 'Hardware' }],
  });

  console.log('🏷️ Criando Marcas e capturando os IDs...');
  const brandApple = await prisma.brand.create({ data: { name: 'Apple' } });
  const brandDell = await prisma.brand.create({ data: { name: 'Dell' } });
  const brandLogitech = await prisma.brand.create({
    data: { name: 'Logitech' },
  });

  await prisma.brand.createMany({
    data: [{ name: 'Lenovo' }, { name: 'Samsung' }, { name: 'Intel' }],
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

  console.log('🛒 Criando Produtos e Histórico de Estoque...');

  const productsToSeed = [
    {
      sku: 'MAC-M3-PRO',
      name: 'MacBook Pro M3 14"',
      description: 'Notebook voltado para alta performance e desenvolvimento.',
      price: 15499.0,
      costPrice: 11000.0,
      isActive: true,
      categoryId: catNotebooks.id,
      brandId: brandApple.id,
      movements: [
        { type: 'IN', quantity: 10 },
        { type: 'OUT', quantity: 2 }, // Saldo: 8
      ],
    },
    {
      sku: 'IPH-15-PRM',
      name: 'iPhone 15 Pro Max',
      description: 'Smartphone topo de linha com chassi de titânio.',
      price: 9299.0,
      costPrice: 7500.0,
      isActive: true,
      categoryId: catSmartphones.id,
      brandId: brandApple.id,
      movements: [
        { type: 'IN', quantity: 20 },
        { type: 'OUT', quantity: 15 }, // Saldo: 5 (Low Stock Trigger!)
      ],
    },
    {
      sku: 'LOGI-MX-M3',
      name: 'Mouse Logitech MX Master 3S',
      description: 'Mouse ergonômico sem fio de alta precisão.',
      price: 650.0,
      costPrice: 380.0,
      isActive: true,
      categoryId: catPerifericos.id,
      brandId: brandLogitech.id,
      movements: [
        { type: 'IN', quantity: 50 },
        { type: 'OUT', quantity: 10 }, // Saldo: 40
      ],
    },
    {
      sku: 'DELL-U2723QE',
      name: 'Monitor Dell UltraSharp 27" 4K',
      description: 'Monitor 4K IPS Black com hub USB-C.',
      price: 4200.0,
      costPrice: 2800.0,
      isActive: true,
      categoryId: catPerifericos.id,
      brandId: brandDell.id,
      movements: [
        { type: 'IN', quantity: 15 },
        { type: 'OUT', quantity: 15 }, // Saldo: 0 (Estoque Zerado!)
      ],
    },
  ];

  for (const prod of productsToSeed) {
    await prisma.product.create({
      data: {
        sku: prod.sku,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        costPrice: prod.costPrice,
        isActive: prod.isActive,
        categoryId: prod.categoryId,
        brandId: prod.brandId,
        movements: {
          create: prod.movements.map((mov) => ({
            type: mov.type as MovementType,
            quantity: mov.quantity,
            user: {
              connect: { id: user.id },
            },
          })),
        },
      },
    });
    console.log(`   └─ Produto gerado: ${prod.name}`);
  }

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

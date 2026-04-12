import { prisma } from '../src/lib/prisma.js';

const main = async () => {
  console.log('Populando o DB.');

  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();

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

  console.log('✅ Banco populado com sucesso!');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

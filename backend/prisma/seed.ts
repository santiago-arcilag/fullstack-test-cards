import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Widget A',
        description: 'High quality widget',
        price: 25.99,
        stock: 10,
      },
      {
        name: 'Widget B',
        description: 'Another product',
        price: 19.99,
        stock: 15,
      },
    ],
  });
}

main()
  .then(() => {
    console.log('Seed completed');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
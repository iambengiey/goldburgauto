import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@goldburgauto.co.za' },
    update: {},
    create: { email: 'admin@goldburgauto.co.za', password, name: 'Admin', isAdmin: true }
  });
  console.log('Seed user', admin.email);

  await prisma.product.createMany({
    data: [
      {
        name: 'Mercedes W205 Brake Disc Set',
        description: 'Front ventilated discs, fits W205 C-Class C180/C200/C220d',
        price: 3250,
        currency: 'ZAR',
        stockOnHand: 6,
        modelClass: 'C-Class',
        modelCode: 'W205',
        yearFrom: 2015,
        yearTo: 2021,
        engineCode: 'M274',
        category: 'Brakes',
        isUsed: false,
        images: ['/images/brake.jpg']
      },
      {
        name: 'Mercedes W204 M271 Engine (Used)',
        description: 'Tested M271 engine from W204 C200 Kompressor with warranty',
        price: 18500,
        currency: 'ZAR',
        stockOnHand: 1,
        modelClass: 'C-Class',
        modelCode: 'W204',
        yearFrom: 2008,
        yearTo: 2012,
        engineCode: 'M271',
        category: 'Engine',
        isUsed: true,
        images: ['/images/engine.jpg']
      }
    ]
  });

  await prisma.blogPost.createMany({
    data: [
      {
        title: 'How to decode your Mercedes VIN',
        slug: 'decode-mercedes-vin',
        excerpt: 'What each character in your Mercedes VIN means.',
        content: 'Full article on decoding Mercedes VIN numbers.',
        thumbnail: '/images/vin.jpg'
      },
      {
        title: 'Common Mercedes suspension issues',
        slug: 'common-mercedes-suspension-issues',
        excerpt: 'Identify and fix the most frequent suspension problems.',
        content: 'Suspension article content...',
        thumbnail: '/images/suspension.jpg'
      }
    ]
  });

  await prisma.breakingVehicle.createMany({
    data: [
      {
        model: 'W204 C200',
        year: 2010,
        engine: 'M271',
        gearbox: 'Automatic',
        colour: 'Silver',
        odometer: 165000,
        location: 'Johannesburg',
        status: 'Stripping now',
        exampleParts: ['Engine', 'Auto gearbox', 'Doors', 'Front bumper']
      },
      {
        model: 'W639 Vito 116 CDI',
        year: 2014,
        engine: 'OM651 Diesel',
        gearbox: 'Manual',
        colour: 'White',
        location: 'Pretoria',
        status: 'Arriving',
        exampleParts: ['Seats', 'Rear axle', 'Sliding door']
      }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

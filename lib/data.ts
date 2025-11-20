import { prisma } from './prisma';
import { BlogPost, BreakingVehicle, Product, Review } from './types';

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Mercedes C-Class W205 Front Brake Discs',
    description: 'Pair of ventilated front brake discs for W205 C200/C220d models',
    price: 3250,
    stockOnHand: 6,
    modelClass: 'C-Class',
    modelCode: 'W205',
    yearFrom: 2015,
    yearTo: 2021,
    engineCode: 'M274',
    category: 'Brakes',
    isUsed: false,
    images: ['/images/brake.jpg'],
    sku: 'W205-BR-DISC',
    currency: 'ZAR'
  },
  {
    id: '2',
    name: 'Mercedes W204 C200 Kompressor Engine - Used',
    description: 'Tested used M271 engine from W204 C200 Kompressor, includes compression test report',
    price: 18500,
    stockOnHand: 1,
    modelClass: 'C-Class',
    modelCode: 'W204',
    yearFrom: 2008,
    yearTo: 2012,
    engineCode: 'M271',
    category: 'Engine',
    isUsed: true,
    images: ['/images/engine.jpg'],
    currency: 'ZAR'
  }
];

const sampleArticles: BlogPost[] = [
  {
    id: 'a1',
    title: 'How to decode your Mercedes VIN',
    slug: 'decode-mercedes-vin',
    excerpt: 'Find out what each character in your Mercedes-Benz VIN means when sourcing parts.',
    content: 'Detailed VIN decoding guide for Mercedes-Benz owners...',
    publishedAt: new Date().toISOString(),
    thumbnail: '/images/vin.jpg'
  },
  {
    id: 'a2',
    title: 'Common Mercedes suspension issues',
    slug: 'common-mercedes-suspension-issues',
    excerpt: 'Identify and prevent the most frequent suspension problems on Mercedes sedans and SUVs.',
    content: 'Suspension faults often start with noises...',
    publishedAt: new Date().toISOString(),
    thumbnail: '/images/suspension.jpg'
  },
  {
    id: 'a3',
    title: 'Genuine vs aftermarket Mercedes parts',
    slug: 'genuine-vs-aftermarket-mercedes-parts',
    excerpt: 'Weigh the pros and cons of OEM vs quality aftermarket Mercedes-Benz components.',
    content: 'Choosing between OEM and aftermarket...',
    publishedAt: new Date().toISOString(),
    thumbnail: '/images/aftermarket.jpg'
  }
];

const sampleBreaking: BreakingVehicle[] = [
  {
    id: 'b1',
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
    id: 'b2',
    model: 'W639 Vito 116 CDI',
    year: 2014,
    engine: 'OM651 Diesel',
    gearbox: 'Manual',
    colour: 'White',
    location: 'Pretoria',
    status: 'Arriving',
    exampleParts: ['Seats', 'Rear axle', 'Sliding door']
  }
];

const reviews: Review[] = [
  { quote: 'Goldburg sourced my C-Class parts overnight. Great service!', author: 'Sibusiso M.', location: 'Sandton' },
  { quote: 'Used gearbox arrived well packaged and works perfectly.', author: 'Tanya V.', location: 'Cape Town' },
  { quote: 'Appreciate the honest advice on aftermarket vs OEM.', author: 'Riaan P.', location: 'Durban' }
];

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    if (!dbProducts.length) return sampleProducts;
    return dbProducts.map((p) => ({
      id: p.id,
      externalId: p.externalId,
      sku: p.sku,
      name: p.name,
      description: p.description,
      price: Number(p.price),
      currency: p.currency || 'ZAR',
      stockOnHand: p.stockOnHand,
      modelClass: p.modelClass,
      modelCode: p.modelCode,
      yearFrom: p.yearFrom,
      yearTo: p.yearTo,
      engineCode: p.engineCode,
      category: p.category,
      isUsed: p.isUsed,
      images: p.images as string[]
    }));
  } catch (error) {
    console.warn('Falling back to sample products', error);
    return sampleProducts;
  }
}

export async function getLatestArticles(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' }, take: 3 });
    if (!posts.length) return sampleArticles;
    return posts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      thumbnail: p.thumbnail || undefined,
      publishedAt: p.publishedAt.toISOString()
    }));
  } catch (error) {
    console.warn('Using sample articles', error);
    return sampleArticles;
  }
}

export async function getBreakingVehicles(): Promise<BreakingVehicle[]> {
  try {
    const vehicles = await prisma.breakingVehicle.findMany({ orderBy: { createdAt: 'desc' } });
    if (!vehicles.length) return sampleBreaking;
    return vehicles.map((v) => ({
      id: v.id,
      model: v.model,
      year: v.year,
      engine: v.engine,
      gearbox: v.gearbox,
      colour: v.colour || undefined,
      odometer: v.odometer || undefined,
      location: v.location,
      status: v.status,
      exampleParts: v.exampleParts as string[]
    }));
  } catch (error) {
    console.warn('Using sample breaking vehicles', error);
    return sampleBreaking;
  }
}

export function getReviews(): Review[] {
  return reviews;
}

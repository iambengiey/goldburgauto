export type Product = {
  id: string;
  externalId?: string | null;
  sku?: string | null;
  name: string;
  description: string;
  price: number;
  currency?: string;
  stockOnHand: number;
  modelClass?: string | null;
  modelCode?: string | null;
  yearFrom?: number | null;
  yearTo?: number | null;
  engineCode?: string | null;
  category?: string | null;
  isUsed: boolean;
  images: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail?: string;
  publishedAt: string;
};

export type BreakingVehicle = {
  id: string;
  model: string;
  year: number;
  engine: string;
  gearbox: string;
  colour?: string;
  odometer?: number;
  location: string;
  status: string;
  exampleParts?: string[];
};

export type Review = {
  quote: string;
  author: string;
  location: string;
};

import ProductFilters from '../../components/ProductFilters';
import ProductGrid from '../../components/ProductGrid';
import { getFeaturedProducts } from '../../lib/data';

export const metadata = {
  title: 'Mercedes New Parts | Goldburg Auto'
};

export default async function NewPartsPage() {
  const products = (await getFeaturedProducts()).filter((p) => !p.isUsed);
  return (
    <div className="container grid md:grid-cols-[280px_1fr] gap-6 py-10">
      <ProductFilters />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gold">New Mercedes Parts</h1>
          <p className="text-sm text-gray-400">Sort by: price, newest, popularity (UI only)</p>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

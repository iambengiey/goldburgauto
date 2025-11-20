import ProductFilters from '../../components/ProductFilters';
import ProductGrid from '../../components/ProductGrid';
import BreakingList from '../../components/BreakingList';
import { getBreakingVehicles, getFeaturedProducts } from '../../lib/data';

export const metadata = {
  title: 'Used Mercedes Parts | Goldburg Auto'
};

export default async function UsedPartsPage() {
  const products = (await getFeaturedProducts()).filter((p) => p.isUsed);
  const breaking = await getBreakingVehicles();
  return (
    <div className="container space-y-10 py-10">
      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        <ProductFilters />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gold">Used Mercedes Parts</h1>
            <p className="text-sm text-gray-400">Incl. tested used spares with warranty.</p>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gold">Vehicles Breaking Now</h2>
        <BreakingList vehicles={breaking} />
      </div>
    </div>
  );
}

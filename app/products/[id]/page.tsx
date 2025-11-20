import { notFound } from 'next/navigation';
import ProductGrid from '../../../components/ProductGrid';
import { getFeaturedProducts } from '../../../lib/data';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const products = await getFeaturedProducts();
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container py-10 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-4 border border-neutral-800">
          <div className="aspect-video bg-neutral-800 rounded-md flex items-center justify-center text-gray-500">
            Image gallery placeholder
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-gray-400 uppercase">{product.isUsed ? 'Used' : 'New'} • {product.stockOnHand} in stock</p>
          <h1 className="text-3xl font-semibold text-gold">{product.name}</h1>
          <div className="text-2xl font-semibold text-gold">R {product.price.toFixed(2)} incl. VAT</div>
          <p className="text-gray-300">{product.description}</p>
          <div className="text-sm text-gray-400">
            <p>Compatibility: {product.modelClass} {product.modelCode} ({product.yearFrom}-{product.yearTo})</p>
            <p>Engine code: {product.engineCode || 'TBC'}</p>
          </div>
          <button className="btn-primary">Add to Cart</button>
          <div className="card p-3 border border-neutral-800">
            <h4 className="text-lg font-semibold text-white mb-2">Request a part like this</h4>
            <p className="text-sm text-gray-300">Send VIN to sales@goldburgauto.co.za for confirmation.</p>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gold">Related Mercedes parts</h3>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}

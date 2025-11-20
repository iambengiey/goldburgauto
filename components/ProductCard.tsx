import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../lib/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card p-4 flex flex-col border border-neutral-800 hover:border-gold/50 transition">
      <div className="relative h-40 w-full mb-3 overflow-hidden rounded-md bg-neutral-800">
        {product.images?.[0] ? (
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">Image coming soon</div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide">
          <span className={`px-2 py-1 rounded ${product.isUsed ? 'bg-neutral-800 text-amber-300' : 'bg-gold text-black'}`}>
            {product.isUsed ? 'Used' : 'New'}
          </span>
          <span className="text-gray-400">{product.stockOnHand > 3 ? 'In Stock' : product.stockOnHand > 0 ? 'Low Stock' : 'Out of Stock'}</span>
        </div>
        <h3 className="font-semibold text-lg text-white">{product.name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-gold font-semibold">R {product.price.toFixed(2)}</div>
        <Link href={`/products/${product.id}`} className="text-sm text-gold hover:underline">
          View
        </Link>
      </div>
    </div>
  );
}

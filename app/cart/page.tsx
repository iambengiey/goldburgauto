'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const sampleCart = [
  { id: '1', name: 'W205 Brake Discs', qty: 1, price: 3250 },
  { id: '2', name: 'W204 Engine Mount', qty: 2, price: 450 }
];

export default function CartPage() {
  const [items, setItems] = useState(sampleCart);
  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const vat = subtotal * 0.15;
    return { subtotal, vat, total: subtotal + vat };
  }, [items]);

  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-semibold text-gold">Cart</h1>
      <div className="card p-4 border border-neutral-800 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm text-gray-200">
            <span>
              {item.name} x {item.qty}
            </span>
            <button onClick={() => setItems((prev) => prev.filter((p) => p.id !== item.id))} className="text-red-400">
              Remove
            </button>
          </div>
        ))}
        <div className="text-sm text-gray-300">
          Subtotal: R {totals.subtotal.toFixed(2)} | VAT: R {totals.vat.toFixed(2)} | Total: R {totals.total.toFixed(2)}
        </div>
        <Link href="/checkout" className="btn-primary inline-block">
          Checkout
        </Link>
      </div>
    </div>
  );
}

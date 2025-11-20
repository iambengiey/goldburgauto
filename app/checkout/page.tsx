'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('snapscan');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (paymentMethod === 'snapscan') {
      const res = await fetch('/api/payments/snapscan/create', { method: 'POST', body: data });
      const json = await res.json();
      setStatus(json.paymentUrl ? `SnapScan link: ${json.paymentUrl}` : 'SnapScan request sent');
    } else if (paymentMethod === 'masterpass') {
      const res = await fetch('/api/payments/masterpass/create', { method: 'POST', body: data });
      const json = await res.json();
      setStatus(json.redirectUrl ? `Redirect to Masterpass checkout: ${json.redirectUrl}` : 'Masterpass session created');
    } else {
      setStatus('Order placed. Please EFT to FNB 123456 (Goldburg Auto) with your order number.');
    }
  };

  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-semibold text-gold">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
        <div className="card p-4 border border-neutral-800 space-y-3 md:col-span-2">
          <h3 className="text-lg font-semibold text-white">Billing & Shipping</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <input name="name" required placeholder="Full name" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
            <input name="email" required type="email" placeholder="Email" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
            <input name="phone" required placeholder="Phone (+27 ...)" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
            <input name="address" required placeholder="Address" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
            <input name="city" required placeholder="City" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
            <input name="postalCode" required placeholder="Postal Code" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
            <input name="province" required placeholder="Province" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
            <input name="country" defaultValue="South Africa" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-300">Shipping</p>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="shipping" value="collection" defaultChecked /> Collection
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="shipping" value="courier" /> Courier (flat rate)
            </label>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-300">Payment</p>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="payment"
                value="snapscan"
                defaultChecked
                onChange={() => setPaymentMethod('snapscan')}
              />
              SnapScan
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="payment" value="masterpass" onChange={() => setPaymentMethod('masterpass')} />
              Masterpass
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="payment" value="eft" onChange={() => setPaymentMethod('eft')} /> Manual EFT
            </label>
          </div>
          <button type="submit" className="btn-primary">Place order</button>
          {status && <p className="text-sm text-gold">{status}</p>}
        </div>
        <div className="card p-4 border border-neutral-800 space-y-2">
          <h3 className="text-lg font-semibold text-white">Order Summary</h3>
          <p className="text-sm text-gray-300">Subtotal: R 4150.00</p>
          <p className="text-sm text-gray-300">VAT (15%): R 622.50</p>
          <p className="text-sm text-gray-300">Total: R 4772.50</p>
          <p className="text-xs text-gray-500">All prices ZAR. SnapScan & Masterpass processed via secure gateways.</p>
        </div>
      </form>
    </div>
  );
}

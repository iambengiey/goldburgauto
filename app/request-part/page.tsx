'use client';

import { useState } from 'react';

export const metadata = {
  title: 'Request a Mercedes Part | Goldburg Auto'
};

export default function RequestPartPage() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/requests', {
      method: 'POST',
      body: form
    });
    if (res.ok) {
      setStatus('Request sent. Our Mercedes team will reply shortly.');
      e.currentTarget.reset();
    } else {
      setStatus('Could not submit request. Please try again.');
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold text-gold mb-6">Request a Part</h1>
      <form onSubmit={handleSubmit} className="card p-6 space-y-4 border border-neutral-800">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Name</label>
            <input name="name" required className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input type="email" name="email" required className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm mb-2">Phone (South Africa)</label>
            <input name="phone" required className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2" placeholder="+27 82 000 0000" />
          </div>
          <div>
            <label className="block text-sm mb-2">Mercedes Model/Class</label>
            <input name="model" className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm mb-2">Year</label>
            <input name="year" className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm mb-2">VIN</label>
            <input name="vin" className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm mb-2">Engine Code</label>
            <input name="engineCode" className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">Describe the part needed</label>
          <textarea
            name="description"
            required
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm mb-2">Photo (optional)</label>
          <input type="file" name="photo" className="w-full" />
        </div>
        <button type="submit" className="btn-primary">Submit request</button>
        {status && <p className="text-sm text-gold">{status}</p>}
      </form>
    </div>
  );
}

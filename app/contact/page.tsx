'use client';

import { useState } from 'react';

const branches = [
  { name: 'Johannesburg', address: '123 Main Road, Johannesburg', phone: '+27 11 555 0101' },
  { name: 'Pretoria', address: '45 Boom Street, Pretoria', phone: '+27 12 555 0202' }
];

export const metadata = {
  title: 'Contact Goldburg Auto'
};

export default function ContactPage() {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch('/api/contact', { method: 'POST', body: formData });
    setMessage(res.ok ? 'Message sent. We will reply shortly.' : 'Could not send. Try again.');
    e.currentTarget.reset();
  };

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-semibold text-gold">Contact & Branches</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div key={branch.name} className="card p-4 border border-neutral-800">
            <h3 className="text-lg font-semibold text-white">{branch.name}</h3>
            <p className="text-sm text-gray-300">{branch.address}</p>
            <p className="text-sm text-gray-300">{branch.phone}</p>
          </div>
        ))}
      </div>
      <div className="card p-6 border border-neutral-800">
        <h3 className="text-lg font-semibold text-white mb-4">Contact Form</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input name="name" required placeholder="Name" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          <input name="email" type="email" required placeholder="Email" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          <input name="phone" required placeholder="Phone (+27 ...)" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          <input name="city" placeholder="City" className="bg-neutral-800 border border-neutral-700 rounded-md p-2" />
          <textarea
            name="message"
            className="md:col-span-2 bg-neutral-800 border border-neutral-700 rounded-md p-2"
            rows={4}
            placeholder="Message"
            required
          ></textarea>
          <div className="md:col-span-2 flex items-center gap-3">
            <button type="submit" className="btn-primary">
              Send message
            </button>
            <span className="text-xs text-gray-400">Map placeholder (embed Google Maps for branches)</span>
          </div>
        </form>
        {message && <p className="text-sm text-gold mt-3">{message}</p>}
      </div>
    </div>
  );
}

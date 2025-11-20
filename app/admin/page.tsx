'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSync = async () => {
    const res = await fetch('/api/admin/sync-inventory', { method: 'POST' });
    const json = await res.json();
    setStatus(`Sync complete. Created ${json.created}, updated ${json.updated}, skipped ${json.skipped}`);
  };

  return (
    <div className="container py-10 space-y-4">
      <h1 className="text-3xl font-semibold text-gold">Admin</h1>
      <p className="text-gray-300">Protected via ADMIN_PASSWORD env variable on API endpoints.</p>
      <button onClick={handleSync} className="btn-primary">
        Run Zoho inventory sync
      </button>
      {status && <p className="text-sm text-gold">{status}</p>}
      <div className="card p-4 border border-neutral-800">
        <h3 className="text-lg font-semibold text-white mb-2">Orders & Requests</h3>
        <p className="text-sm text-gray-300">Extend with order tables and request listings tied to Prisma.</p>
      </div>
    </div>
  );
}

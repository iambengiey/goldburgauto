'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const categories = ['Engine', 'Drivetrain', 'Suspension & Steering', 'Cooling', 'Electrical', 'Exterior', 'Interior', 'Lighting', 'Service'];
const modelClasses = ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'Sprinter'];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    modelClass: searchParams.get('modelClass') || '',
    category: searchParams.get('category') || '',
    condition: searchParams.get('condition') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || ''
  });

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.replace(`?${params.toString()}`);
  }, [filters, router]);

  return (
    <div className="card p-4 border border-neutral-800 space-y-4">
      <h4 className="text-lg font-semibold text-gold">Filter</h4>
      <select
        className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2"
        value={filters.modelClass}
        onChange={(e) => setFilters((f) => ({ ...f, modelClass: e.target.value }))}
      >
        <option value="">All Classes</option>
        {modelClasses.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2"
        value={filters.category}
        onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2"
        value={filters.condition}
        onChange={(e) => setFilters((f) => ({ ...f, condition: e.target.value }))}
      >
        <option value="">New or Used</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>
      <div className="grid grid-cols-2 gap-2">
        <input
          className="bg-neutral-800 border border-neutral-700 rounded-md p-2"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
        />
        <input
          className="bg-neutral-800 border border-neutral-700 rounded-md p-2"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
        />
      </div>
    </div>
  );
}

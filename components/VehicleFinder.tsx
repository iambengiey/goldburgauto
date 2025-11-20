'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const classes = ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'Sprinter'];
const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];
const engines = ['Petrol', 'Diesel', 'Hybrid', 'M270', 'M274', 'OM651'];

export default function VehicleFinder() {
  const router = useRouter();
  const [modelClass, setModelClass] = useState(classes[0]);
  const [year, setYear] = useState(years[0]);
  const [engine, setEngine] = useState(engines[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ modelClass, year, engine });
    router.push(`/new-parts?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300 mb-2">Select Class / Model</label>
        <select
          className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2"
          value={modelClass}
          onChange={(e) => setModelClass(e.target.value)}
        >
          {classes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-2">Select Year</label>
        <select
          className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-2">Select Engine</label>
        <select
          className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2"
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
        >
          {engines.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-primary w-full">
        Find Parts
      </button>
    </form>
  );
}

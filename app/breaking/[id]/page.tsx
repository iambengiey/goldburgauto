import { notFound } from 'next/navigation';
import { getBreakingVehicles } from '../../../lib/data';

export default async function BreakingVehiclePage({ params }: { params: { id: string } }) {
  const vehicles = await getBreakingVehicles();
  const vehicle = vehicles.find((v) => v.id === params.id);
  if (!vehicle) return notFound();
  return (
    <div className="container py-10 space-y-3">
      <h1 className="text-3xl font-semibold text-gold">{vehicle.model}</h1>
      <p className="text-gray-300">{vehicle.year} • Engine {vehicle.engine} • Gearbox {vehicle.gearbox}</p>
      <p className="text-gray-300">Colour: {vehicle.colour || 'N/A'} | Location: {vehicle.location}</p>
      <p className="text-gray-300">Status: {vehicle.status}</p>
      <div className="card p-4 border border-neutral-800">
        <h3 className="text-lg font-semibold text-white mb-2">Example parts available</h3>
        <ul className="list-disc list-inside text-sm text-gray-300">
          {(vehicle.exampleParts || []).map((part) => (
            <li key={part}>{part}</li>
          ))}
        </ul>
        <div className="mt-4 text-sm text-gray-300">
          <p>Enquiry form: Email sales@goldburgauto.co.za with VIN and part list.</p>
        </div>
      </div>
    </div>
  );
}

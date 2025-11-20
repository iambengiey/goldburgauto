import Link from 'next/link';
import { BreakingVehicle } from '../lib/types';

export default function BreakingList({ vehicles }: { vehicles: BreakingVehicle[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="card p-4 border border-neutral-800 hover:border-gold/50 transition">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{vehicle.year}</span>
            <span>{vehicle.location}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{vehicle.model}</h3>
          <p className="text-sm text-gray-300">Engine: {vehicle.engine}</p>
          <p className="text-sm text-gray-300">Gearbox: {vehicle.gearbox}</p>
          <p className="text-sm text-gray-300">Status: {vehicle.status}</p>
          {vehicle.odometer && <p className="text-sm text-gray-300">Odometer: {vehicle.odometer} km</p>}
          <Link href={`/breaking/${vehicle.id}`} className="text-sm text-gold mt-3 inline-block">
            View parts
          </Link>
        </div>
      ))}
    </div>
  );
}

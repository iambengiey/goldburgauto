import BreakingList from '../../components/BreakingList';
import { getBreakingVehicles } from '../../lib/data';

export const metadata = {
  title: 'Mercedes Breaking Now | Goldburg Auto'
};

export default async function BreakingPage() {
  const vehicles = await getBreakingVehicles();
  return (
    <div className="container py-10 space-y-4">
      <h1 className="text-3xl font-semibold text-gold">Breaking Now</h1>
      <p className="text-gray-300">Mercedes vehicles currently being stripped for tested used spares.</p>
      <BreakingList vehicles={vehicles} />
    </div>
  );
}

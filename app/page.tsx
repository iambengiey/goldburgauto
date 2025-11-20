import Link from 'next/link';
import VehicleFinder from '../components/VehicleFinder';
import ProductGrid from '../components/ProductGrid';
import { getFeaturedProducts, getLatestArticles, getReviews, getBreakingVehicles } from '../lib/data';
import BlogList from '../components/BlogList';
import BreakingList from '../components/BreakingList';
import ReviewList from '../components/ReviewList';

export default async function HomePage() {
  const products = await getFeaturedProducts();
  const articles = await getLatestArticles();
  const breaking = await getBreakingVehicles();
  const reviews = getReviews();

  return (
    <div className="container space-y-16 pb-16">
      <section className="grid md:grid-cols-2 gap-8 items-center pt-10">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-wide text-gold">Goldburg Auto</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Mercedes-Benz Spares – Fast Delivery Across South Africa
          </h1>
          <p className="text-lg text-gray-300">
            Genuine and quality aftermarket Mercedes-Benz parts. New and tested used spares with nationwide courier options.
          </p>
          <div className="flex gap-4">
            <Link className="btn-primary" href="/new-parts">
              Shop New Parts
            </Link>
            <Link className="btn-secondary" href="/request-part">
              Request a Part
            </Link>
          </div>
          <div className="flex gap-4 text-sm text-gray-300">
            <span>Whatsapp & Phone support</span>
            <span className="text-gold">ZAR pricing</span>
          </div>
        </div>
        <div className="card p-6 border-gold/40">
          <VehicleFinder />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gold">Shop Mercedes New Spares</h2>
          <Link href="/new-parts" className="text-sm text-gold hover:underline">
            View all
          </Link>
        </div>
        <ProductGrid products={products.filter((p) => !p.isUsed).slice(0, 8)} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gold">Used Mercedes Spares / Breaking Now</h2>
          <Link href="/used-parts" className="text-sm text-gold hover:underline">
            View used parts
          </Link>
        </div>
        <BreakingList vehicles={breaking} />
      </section>

      <section className="card p-8 space-y-4 border border-gold/30">
        <h3 className="text-2xl font-semibold text-gold">Why Choose Goldburg Auto</h3>
        <ul className="grid md:grid-cols-2 gap-4 text-gray-200">
          <li className="flex gap-3">
            <span className="text-gold">✔</span> Mercedes-Benz specialists with focused inventory
          </li>
          <li className="flex gap-3">
            <span className="text-gold">✔</span> Tested used parts and quality aftermarket options
          </li>
          <li className="flex gap-3">
            <span className="text-gold">✔</span> Nationwide courier partners & same-day dispatch on many items
          </li>
          <li className="flex gap-3">
            <span className="text-gold">✔</span> POPIA & PCI-aware checkout with SnapScan, Masterpass, EFT
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gold">Latest Articles</h2>
          <Link href="/blog" className="text-sm text-gold hover:underline">
            View all articles
          </Link>
        </div>
        <BlogList posts={articles} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gold">Customer Reviews</h2>
        </div>
        <ReviewList reviews={reviews} />
      </section>
    </div>
  );
}

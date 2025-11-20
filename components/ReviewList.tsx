import { Review } from '../lib/types';

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {reviews.map((review) => (
        <div key={review.author} className="card p-4 border border-neutral-800">
          <p className="text-sm text-gray-200 mb-2">“{review.quote}”</p>
          <p className="text-xs text-gray-400">— {review.author}</p>
          <p className="text-xs text-gray-500">{review.location}</p>
        </div>
      ))}
    </div>
  );
}

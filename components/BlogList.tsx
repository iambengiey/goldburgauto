import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../lib/types';

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.slug} className="card p-4 border border-neutral-800 hover:border-gold/50 transition flex flex-col">
          {post.thumbnail && (
            <div className="relative h-32 w-full mb-3 overflow-hidden rounded-md bg-neutral-800">
              <Image src={post.thumbnail} alt={post.title} fill className="object-cover" />
            </div>
          )}
          <div className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString('en-ZA')}</div>
          <h3 className="font-semibold text-lg text-white">{post.title}</h3>
          <p className="text-sm text-gray-400 flex-1">{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`} className="text-sm text-gold mt-3">
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}

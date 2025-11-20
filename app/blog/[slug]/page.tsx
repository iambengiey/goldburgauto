import { notFound } from 'next/navigation';
import { getLatestArticles } from '../../../lib/data';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = await getLatestArticles();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();
  return (
    <div className="container py-10 space-y-4">
      <p className="text-sm text-gray-400">{new Date(post.publishedAt).toLocaleDateString('en-ZA')}</p>
      <h1 className="text-3xl font-semibold text-gold">{post.title}</h1>
      <article className="prose prose-invert max-w-none leading-relaxed">
        <p>{post.excerpt}</p>
        <p>{post.content}</p>
      </article>
    </div>
  );
}

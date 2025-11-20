import Link from 'next/link';
import BlogList from '../../components/BlogList';
import { getLatestArticles } from '../../lib/data';

export const metadata = {
  title: 'Mercedes Articles | Goldburg Auto'
};

export default async function BlogPage() {
  const posts = await getLatestArticles();
  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gold">Blog / Technical Articles</h1>
        <Link href="/" className="text-sm text-gold">
          Home
        </Link>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}

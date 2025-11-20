import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';

export const metadata = {
  title: 'My Account | Goldburg Auto'
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-semibold text-gold">My Account</h1>
        <p className="text-gray-300">Please sign in to view your orders.</p>
        <Link href="/api/auth/signin" className="btn-primary mt-3 inline-block">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-4">
      <h1 className="text-3xl font-semibold text-gold">Welcome, {session.user?.name}</h1>
      <p className="text-gray-300">Orders and account settings will appear here.</p>
    </div>
  );
}

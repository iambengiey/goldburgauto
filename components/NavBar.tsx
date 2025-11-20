'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/new-parts', label: 'New Parts' },
  { href: '/used-parts', label: 'Used Parts / Breaking Now' },
  { href: '/request-part', label: 'Request a Part' },
  { href: '/blog', label: 'Blog / Technical Articles' },
  { href: '/contact', label: 'Contact' },
  { href: '/account', label: 'My Account' },
  { href: '/cart', label: 'Cart' }
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-neutral-900/90 backdrop-blur border-b border-neutral-800 z-30">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-xl text-gold">
          Goldburg Auto
        </Link>
        <button className="md:hidden" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle navigation">
          ☰
        </button>
        <div className={`md:flex gap-4 items-center ${open ? 'block' : 'hidden'} md:block`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm hover:text-gold transition ${
                pathname === link.href ? 'text-gold' : 'text-gray-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span className="ml-2 text-xs text-gray-400">ZAR</span>
        </div>
      </div>
    </nav>
  );
}

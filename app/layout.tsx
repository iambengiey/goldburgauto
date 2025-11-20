import './globals.css';
import { ReactNode } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Goldburg Auto | Mercedes-Benz Spares',
  description: 'Mercedes-Benz new and used spares specialist in South Africa'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-charcoal text-gray-100 min-h-screen">
        <NavBar />
        <main className="mt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

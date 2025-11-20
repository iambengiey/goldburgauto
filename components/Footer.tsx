import Link from 'next/link';

const branches = [
  {
    name: 'Johannesburg',
    address: '123 Main Road, Johannesburg',
    phone: '+27 11 555 0101'
  },
  {
    name: 'Pretoria',
    address: '45 Boom Street, Pretoria',
    phone: '+27 12 555 0202'
  }
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-gray-300 mt-16">
      <div className="container grid md:grid-cols-4 gap-10 py-12">
        <div>
          <h4 className="text-gold font-semibold mb-3">Goldburg Auto</h4>
          <p className="text-sm">Mercedes-Benz parts specialist. New and used spares with nationwide shipping in South Africa.</p>
        </div>
        <div>
          <h4 className="text-gold font-semibold mb-3">Contact</h4>
          <p className="text-sm">Phone: +27 87 123 4567</p>
          <p className="text-sm">Email: sales@goldburgauto.co.za</p>
          <p className="text-sm">WhatsApp friendly</p>
        </div>
        <div>
          <h4 className="text-gold font-semibold mb-3">Branches</h4>
          <ul className="space-y-2 text-sm">
            {branches.map((branch) => (
              <li key={branch.name}>
                <p className="font-semibold">{branch.name}</p>
                <p>{branch.address}</p>
                <p>{branch.phone}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-gold font-semibold mb-3">Info</h4>
          <div className="flex flex-col text-sm space-y-2">
            <Link href="/refunds" className="hover:underline">
              Refunds
            </Link>
            <Link href="/shipping" className="hover:underline">
              Shipping Policy
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/popia" className="hover:underline">
              POPIA Notice
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4">Trading hours: Mon-Fri 8am-5pm, Sat 9am-1pm</p>
        </div>
      </div>
    </footer>
  );
}

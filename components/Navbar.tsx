'use client';

import Link from 'next/link';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Works', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 md:px-14 py-5 bg-black text-white">
      {/* Left: Role tagline */}
      <p className="text-sm text-neutral-400 tracking-wide font-medium">
        Full Stack Developer &amp; Engineer
      </p>

      {/* Right: Nav links */}
      <nav className="flex items-center gap-8">
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-sm text-neutral-300 hover:text-white transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
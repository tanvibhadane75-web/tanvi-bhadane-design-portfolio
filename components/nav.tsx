'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/lib/content';

const links = [
  { href: '#projects', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#resume-experience', label: 'Experience' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [active, setActive] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((s): s is HTMLElement => Boolean(s));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => io.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#111111]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.12)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] gap-x-5 gap-y-2 px-5 py-4 md:flex md:items-center md:justify-between md:px-8" aria-label="Main">
        <a
          href="#top"
          className="font-hand text-2xl leading-none text-neutral-100 transition-transform duration-300 hover:-rotate-2"
        >
          {profile.name}
          <span className="sr-only"> — back to top</span>
        </a>
        <button
          type="button"
          className="inline-flex items-center gap-2 border border-white/20 bg-neutral-900 px-3 py-2 text-xs tracking-wide text-neutral-100 md:hidden"
          aria-controls="portfolio-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
          <span aria-hidden="true" className={`transition-transform duration-300 ${menuOpen ? 'rotate-45' : ''}`}>+</span>
        </button>
        <ul id="portfolio-navigation" className={`${menuOpen ? 'grid' : 'hidden'} col-span-2 grid-cols-3 gap-x-4 gap-y-3 border-t border-[var(--line)] pt-3 text-center md:col-span-1 md:flex md:items-center md:gap-8 md:border-0 md:py-1`}>
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`text-[13px] tracking-wide transition-colors duration-300 hover:text-[#E9D18E] ${
                    isActive ? 'text-neutral-100' : 'text-neutral-400'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-[#E9D18E] transition-transform duration-500 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

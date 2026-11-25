'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { aboutNotes, achievements, beyond, contact, currently, extracurricularActivities, hero, profile, projects, resume, skills } from '@/lib/content';
import { Doodle } from '@/components/doodles';

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-hand text-xl text-[#8a8580]">
      <span className="section-label-star" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Hero() {
  const quickLinks = [
    { href: '#about', title: 'About me', note: 'My story', tone: 'quick-link-sage' },
    { href: '#projects', title: 'My projects', note: "Things I've made", tone: 'quick-link-peach' },
    { href: '/Tanvi_Bhadane_CV_(2).pdf', title: 'My resume', note: 'Take a look', tone: 'quick-link-butter', external: true },
  ];

  return (
    <section id="top" className="grid-paper relative flex min-h-[calc(100svh-1px)] flex-col justify-center overflow-hidden px-5 pb-8 pt-24 md:px-8 md:pt-24">
      <HeroStationery />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="reveal" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
          <p className="font-hand text-xl text-[#81766c] md:text-2xl">{hero.intro[0]} <span className="text-base md:text-lg">— a little journal of a curious mind</span></p>
        </div>

        <nav className="reveal is-visible mt-4 grid grid-cols-3 gap-2 sm:gap-3" aria-label="Start here" style={{ '--reveal-delay': '420ms' } as React.CSSProperties}>
          {quickLinks.map((link, index) => (
            <a
              key={link.title}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`quick-link paper-edge group relative flex min-h-[66px] items-center justify-between gap-1 p-2 transition-transform hover:-translate-y-1 sm:min-h-[72px] sm:gap-4 sm:p-3 ${link.tone}`}
              aria-label={`${link.title}: ${link.note}${link.external ? ' (opens resume in a new tab)' : ''}`}
            >
              <span className="absolute right-2 top-1 font-hand text-xs opacity-70 sm:right-4 sm:top-2 sm:text-sm" aria-hidden="true">0{index + 1}</span>
              <span>
                <span className="block font-serif-display text-[15px] leading-tight text-[#34312f] sm:text-xl">{link.title}</span>
                <span className="mt-0.5 block font-hand text-xs leading-tight text-[#625c55] sm:mt-1 sm:text-base">{link.note}</span>
              </span>
              <span className="text-lg text-[#625c55] transition-transform group-hover:translate-x-1 sm:text-xl" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>

        <div className="mt-4 grid gap-6 md:grid-cols-12 md:items-start md:gap-8">
          <div className="reveal is-visible md:col-span-8" style={{ '--reveal-delay': '160ms' } as React.CSSProperties}>
            <h1 className="font-serif-display text-[clamp(3.1rem,6.4vw,5rem)] leading-[1] text-[#34312f]">
              Tanvi <span className="hand-underline">Bhadane</span>
            </h1>
            <p className="mt-1 font-hand text-lg text-[#766c62]">{hero.intro[1]}</p>
            <p className="mt-3 font-serif-display text-2xl text-[#34312f] md:text-3xl">I think, then I build.</p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#625c55]">
              {hero.intro[2]}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex min-h-11 items-center gap-2 bg-[#34312f] px-5 py-3 text-sm tracking-wide text-white transition-colors hover:bg-[#9c604e]">
                Explore my work <span aria-hidden="true">↘</span>
              </a>
              <a href="#about" className="inline-flex min-h-11 items-center border border-[#cfc3b4] bg-[#fffdf8] px-5 py-3 text-sm tracking-wide text-[#34312f] transition-colors hover:border-[#9c604e]">
                Get to know me
              </a>
            </div>
          </div>

          <aside className="reveal is-visible relative mx-auto w-full max-w-[15rem] md:col-span-3 md:col-start-10" style={{ '--reveal-delay': '300ms' } as React.CSSProperties} aria-label="A little introduction card">
            <div className="paper-card paper-edge relative rotate-2 p-3 pb-4">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden="true" />
              <div className="photo-placeholder flex aspect-[4/3] flex-col items-center justify-center gap-2 border border-dashed border-[#b9a995] text-center" role="img" aria-label="A framed placeholder for Tanvi's portrait">
                <Doodle kind="portrait" className="h-16 text-[#81766c]" />
                <span className="font-hand text-base text-[#766c62]">a little portrait goes here</span>
              </div>
              <div className="flex items-end justify-between gap-3 pt-3">
                <div>
                  <p className="font-hand text-lg text-[#34312f]">Tanvi&apos;s field notes</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#766c62]">{profile.role}</p>
                </div>
                <Doodle kind="sparkle" className="h-7 w-7" />
              </div>
            </div>
            <p className="mt-4 font-hand text-sm leading-snug text-[#8a6c57]">{hero.status}</p>
            <p className="mt-2 font-hand text-sm text-[#8a6c57]">Pune, India · collecting ideas</p>
          </aside>
        </div>

      </div>
    </section>
  );
}

function HeroStationery() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      <div className="hero-notebook" />
      <div className="hero-pencil" />
      <div className="hero-plant" />
      <div className="sticky-note note-yellow note-edge absolute right-[5%] top-[18%] w-36 rotate-6 p-4">
        <span className="tape -top-3 left-6 rotate-6" />
        <p className="font-hand text-lg leading-tight">currently creating <span className="flower-sticker" aria-hidden="true" /></p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="grid-paper scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="relative mx-auto max-w-6xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>chapter three — little notes about me</SectionLabel>
            <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">Collected pieces of me</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
            Like sticky notes on a wall — each one true, none of them the whole picture.
          </p>
        </div>

        <div className="pointer-events-none absolute right-2 top-36 hidden h-28 w-44 rotate-6 md:block" aria-hidden="true">
          <div className="paper-scrap inset-0 rotate-3" />
          <div className="paper-scrap -inset-2 -rotate-6" />
          <p className="absolute left-5 top-9 font-hand text-lg text-[#8a8580]">a wall of notes</p>
          <span className="paper-clip -right-3 -top-4" />
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {aboutNotes.map((note, i) => (
            <div
              key={note.label}
              className={`reveal break-inside-avoid ${note.rotate}`}
              style={{ '--reveal-delay': `${(i % 3) * 120}ms` } as React.CSSProperties}
            >
              {note.style === 'paper' ? (
                <div className="paper-card paper-edge relative p-6">
                  <span className="paper-clip -right-2 -top-4" aria-hidden="true" />
                  <p className="font-hand text-base uppercase tracking-wide text-[#8a8580]">{note.label}</p>
                  <p className="mt-2 leading-relaxed text-neutral-700">{note.text}</p>
                </div>
              ) : (
                <div className={`sticky-note note-edge relative p-6 pt-8 ${note.style}`}>
                  <span className="tape -top-3 left-8 -rotate-3" aria-hidden="true" />
                  <span className="paper-clip -right-2 -top-4" aria-hidden="true" />
                  <p className="font-hand text-base uppercase tracking-wide text-neutral-500">{note.label}</p>
                  <p className="mt-2 font-hand text-xl leading-snug text-neutral-800">{note.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Beyond() {
  return (
    <section id="beyond" className="scroll-mt-24 border-y border-[var(--line)] bg-[#fbf8f2] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-5">
          <div>
            <SectionLabel>chapter seven — beyond the screen</SectionLabel>
            <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">{beyond.heading}</h2>
          </div>
          <p className="max-w-sm font-hand text-xl text-[#766c62]">A few favourite ways to slow down, notice things and make a little mess.</p>
        </div>

        <article className="hobby-music paper-card paper-edge reveal relative mt-12 overflow-hidden p-6 md:p-10">
          <span className="tape -top-3 left-14 -rotate-3" aria-hidden="true" />
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionLabel>01 — music is my happy place</SectionLabel>
              <h3 className="mt-3 font-serif-display text-3xl text-[#34312f] md:text-4xl">A little ukulele, a little singing</h3>
              <p className="mt-4 max-w-lg leading-relaxed text-[#625c55]">Some feelings are better expressed through music. A little music, a little singing, a lot of happiness.</p>
              <p className="mt-5 font-hand text-xl text-[#8a5e4b]">singing · ukulele · small joyful breaks</p>
            </div>
            <div className="relative flex min-h-[300px] items-center justify-center bg-[#f4eee5] px-4 py-6 lg:col-span-4">
              <div className="ukulele-art relative h-[285px] w-full max-w-[230px]">
                <Image src="/portfolio/ukulele-illustration.png" alt="Hand-drawn wooden ukulele with four visible strings" fill sizes="(max-width: 1024px) 60vw, 230px" className="object-contain mix-blend-multiply" />
                <span className="ukulele-string string-one" aria-hidden="true" />
                <span className="ukulele-string string-two" aria-hidden="true" />
                <span className="ukulele-string string-three" aria-hidden="true" />
                <span className="ukulele-string string-four" aria-hidden="true" />
              </div>
              <span className="absolute right-4 top-4 rotate-6 font-hand text-lg text-[#9c604e]">strum gently</span>
              <span className="absolute bottom-4 left-4 -rotate-6 font-hand text-2xl text-[#9c604e]" aria-hidden="true">♪</span>
            </div>
            <figure className="mx-auto w-full max-w-[220px] rotate-2 bg-white p-3 pb-5 shadow-[0_12px_25px_-18px_rgba(39,37,34,.45)] transition-transform duration-500 hover:rotate-0 hover:-translate-y-1 lg:col-span-3">
              <div className="photo-placeholder flex aspect-[4/5] flex-col items-center justify-center gap-3 border border-dashed border-[#b9a995] px-3 text-center" role="img" aria-label="Replaceable placeholder for Tanvi's photo playing ukulele">
                <Doodle kind="portrait" className="h-20 text-[#8a6c57]" />
                <span className="font-hand text-lg text-[#766c62]">your ukulele photo goes here</span>
              </div>
              <figcaption className="mt-3 text-center font-hand text-lg text-[#625c55]">a song for the in-between moments</figcaption>
            </figure>
          </div>
        </article>

        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <article className="paper-card paper-edge reveal relative bg-[#f2e4dc] p-6 md:p-8">
            <SectionLabel>02 — chasing sunsets</SectionLabel>
            <h3 className="mt-3 font-serif-display text-3xl text-[#34312f]">A photography journal</h3>
            <p className="mt-3 max-w-xl leading-relaxed text-[#625c55]">I love capturing the sky as the day turns over. These frames are ready for my own sunrise and sunset photographs.</p>
            <div className="mt-8 grid grid-cols-3 items-start gap-3 sm:gap-5">
              {['sunrise', 'golden hour', 'last light'].map((caption, index) => (
                <figure key={caption} className={`photo-polaroid ${index === 1 ? 'photo-polaroid-center' : ''}`}>
                  <div className="photo-placeholder flex aspect-[4/5] flex-col items-center justify-center gap-2 border border-dashed border-[#b9a995] px-2 text-center" role="img" aria-label={`Replaceable placeholder for a ${caption} photograph`}>
                    <Doodle kind="sun" className="w-full max-w-20 text-[#9c604e]" />
                    <span className="font-hand text-sm text-[#766c62]">add a sky photo</span>
                  </div>
                  <figcaption className="pt-3 text-center font-hand text-base text-[#625c55]">{caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-5 text-xs tracking-[0.16em] text-[#766c62]">A FEW MOMENTS FROM MY CAMERA ROLL — TO BE ADDED</p>
          </article>

          <article className="paper-card paper-edge reveal relative bg-[#e5ebe2] p-6 md:p-8">
            <SectionLabel>03 — a sketchbook habit</SectionLabel>
            <h3 className="mt-3 font-serif-display text-3xl text-[#34312f]">Art, one page at a time</h3>
            <p className="mt-3 leading-relaxed text-[#625c55]">Drawing portraits, sketching and painting are a lovely way to slow down and notice the little details.</p>
            <div className="relative mt-7 flex min-h-[190px] items-center justify-center overflow-hidden bg-[#f5f2ea]">
              <Doodle kind="portrait" className="h-32 text-[#8a6c57]" />
              <Doodle kind="palette" className="absolute right-4 top-4 w-24 text-[#9c604e]" />
              <span className="absolute bottom-3 left-4 rotate-[-4deg] font-hand text-lg text-[#766c62]">pencil, paper, patience</span>
            </div>
          </article>

          <article className="paper-card paper-edge reveal relative bg-[#e8e5eb] p-6 md:p-8">
            <SectionLabel>04 — a little book obsession</SectionLabel>
            <h3 className="mt-3 font-serif-display text-3xl text-[#34312f]">Stories, mythology &amp; ideas</h3>
            <p className="mt-3 leading-relaxed text-[#625c55]">I love reading, mythology, stories and following an interesting idea down a rabbit hole.</p>
            <div className="book-shelf mt-8 flex min-h-[170px] items-end justify-center gap-3 border-b-[10px] border-[#aa9783] px-4 pb-0">
              {[
                { label: 'A myth to revisit', tone: 'book-sage' },
                { label: 'A story to add', tone: 'book-peach' },
                { label: 'Next on my list', tone: 'book-lavender' },
              ].map((book) => (
                <details className={`book-card ${book.tone}`} key={book.label}>
                  <summary aria-label={`${book.label}: open book note`}>
                    <span className="book-title">{book.label}</span>
                    <span className="book-mark" aria-hidden="true" />
                  </summary>
                  <p className="book-note">A little space for a favourite title and the thought I want to keep from it.</p>
                </details>
              ))}
            </div>
            <p className="mt-7 font-hand text-lg text-[#766c62]">Tap a book to open a note — titles and quotes can be added when I choose them.</p>
          </article>
        </div>

        <p className="reveal mt-14 text-center font-hand text-2xl text-[#766c62]">{beyond.closing}</p>
      </div>
    </section>
  );
}

type Wish = {
  id: string;
  name: string;
  destination: string;
  message: string;
  createdAt: string;
};

type WishResponse = { wishes: Wish[] };

async function fetchWishes(url: string): Promise<WishResponse> {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Wishes are unavailable right now.');
  return (await response.json()) as WishResponse;
}

const featuredWish = 'Experience the Yi Peng Lantern Festival in Thailand and watch thousands of glowing lanterns light up the night sky.';

function containsDevanagari(value: string) {
  return /[\u0900-\u097f]/.test(value);
}

export function DreamWishJar() {
  const [form, setForm] = useState({ name: '', destination: '', message: '', website: '' });
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [status, setStatus] = useState('');
  const [statusKind, setStatusKind] = useState<'success' | 'error' | ''>('');
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const { data: wishData, error: wishError, isLoading, mutate } = useSWR<WishResponse>('/api/wishes', fetchWishes);
  const wishes = wishData?.wishes ?? [];
  const displayStatus = status || (wishError ? 'The jar is resting offline for a moment. You can still leave your wish.' : '');
  const wishTriggerRef = useRef<HTMLButtonElement | null>(null);
  const wishCloseRef = useRef<HTMLButtonElement | null>(null);
  const dialogWasOpen = useRef(false);

  useEffect(() => {
    if (!selectedWish) {
      if (dialogWasOpen.current) wishTriggerRef.current?.focus();
      dialogWasOpen.current = false;
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    wishCloseRef.current?.focus();
    dialogWasOpen.current = true;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedWish]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    setStatusKind('');

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, startedAt }),
      });
      const payload = (await response.json()) as { wish?: Wish; error?: string };

      if (!response.ok || !payload.wish) {
        throw new Error(payload.error ?? 'Your wish could not be added right now.');
      }

      await mutate((current) => ({
        wishes: [payload.wish as Wish, ...(current?.wishes ?? []).filter((wish) => wish.id !== payload.wish?.id)],
      }), { revalidate: false });
      setForm({ name: '', destination: '', message: '', website: '' });
      setStartedAt(Date.now());
      setIsDropping(true);
      setStatus('Your little wish is now in the jar!');
      setStatusKind('success');
      window.setTimeout(() => setIsDropping(false), 1200);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Your wish could not be added right now.');
      setStatusKind('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="wish-jar" className="grid-paper scroll-mt-24 border-y border-[var(--line)] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-2xl">
          <SectionLabel>chapter six — a little something for the guestbook</SectionLabel>
          <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">A jar full of dreams</h2>
          <p className="mt-2 font-hand text-2xl text-[#a9523d]">Somewhere I&apos;d love to be...</p>
          <p className="mt-4 max-w-xl leading-relaxed text-neutral-600">Everyone has a place they&apos;ve dreamed of visiting. What&apos;s yours?</p>
        </div>

        <div className="mt-14 grid items-center gap-16 md:grid-cols-2 md:gap-20">
          <div className="reveal jar-stage">
            <div className={`jar-glass ${isDropping ? 'jar-shake' : ''}`}>
              <div className="jar-neck" />
              <div className="jar-lid" />
              <button
                ref={wishTriggerRef}
                type="button"
                className="wish-note wish-note-featured cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6953]"
                aria-label="Read Tanvi's wish about visiting Thailand"
                onClick={(event) => {
                  wishTriggerRef.current = event.currentTarget;
                  setSelectedWish({ id: 'tanvi-featured-wish', name: 'Tanvi', destination: 'Thailand', message: featuredWish, createdAt: '' });
                }}
              >
                {featuredWish}
              </button>
              {wishes.slice(0, 3).map((wish, index) => (
                <button
                  key={wish.id}
                  type="button"
                  className={`wish-note wish-note-visitor visitor-${index + 1} ${/[^\u0000-\u024f]/.test(wish.destination) ? 'wish-note-non-latin' : ''} ${containsDevanagari(`${wish.destination} ${wish.name ?? ''}`) ? 'wish-note-devanagari' : ''} cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6953]`}
                  aria-label={`Read the wish for ${wish.destination}${wish.name ? ` from ${wish.name}` : ''}`}
                  onClick={(event) => {
                    wishTriggerRef.current = event.currentTarget;
                    setSelectedWish(wish);
                  }}
                >
                  <span className="wish-destination-preview" lang={containsDevanagari(wish.destination) ? 'hi' : undefined}>{wish.destination}</span>
                  {wish.name ? <span className="wish-name-preview" lang={containsDevanagari(wish.name) ? 'hi' : undefined}>— {wish.name}</span> : null}
                </button>
              ))}
              {isDropping ? <div className="wish-note wish-note-drop">your wish</div> : null}
            </div>
            <div className="absolute right-[4%] top-14 rotate-6 border border-[#d8c9b4] bg-[#fffefb] px-4 py-3 shadow-sm">
              <span className="font-hand text-lg text-neutral-800">Tanvi&apos;s wish</span>
              <span className="absolute -bottom-2 left-5 h-3 w-3 rotate-45 border-b border-r border-[#d8c9b4] bg-[#fffefb]" />
            </div>
            {wishes.length === 0 && !isLoading ? (
              <p className="mt-5 text-center font-hand text-lg text-[#8a8580]">Be the first visitor to add a little note.</p>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="reveal paper-card paper-edge relative p-6 md:p-8">
            <span className="tape -top-3 left-10 -rotate-3" aria-hidden="true" />
            <p className="font-hand text-xl text-[#8a8580]">Leave a little wish</p>
            <div className="mt-6 space-y-5">
              <label className="sr-only" aria-hidden="true">
                Website
                <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))} />
              </label>
              <label className="block">
                <span className="text-sm text-neutral-700">Your name <span className="text-neutral-400">(optional)</span></span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  maxLength={60}
                  className="mt-2 w-full border-b border-[#d8d0c4] bg-transparent px-0 py-2 text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                  placeholder="How should I sign your note?"
                />
              </label>
              <label className="block">
                <span className="text-sm text-neutral-700">Your dream destination <span className="text-[#c8684e]">*</span></span>
                <input
                  required
                  value={form.destination}
                  onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))}
                  maxLength={120}
                  className="mt-2 w-full border-b border-[#d8d0c4] bg-transparent px-0 py-2 text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                  placeholder="A city, country, or somewhere magical"
                />
              </label>
              <label className="block">
                <span className="text-sm text-neutral-700">Why this place? <span className="text-neutral-400">(optional)</span></span>
                <textarea
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  maxLength={240}
                  rows={3}
                  className="mt-2 w-full resize-none border-b border-[#d8d0c4] bg-transparent px-0 py-2 text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
                  placeholder="A short reason, if you feel like sharing..."
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-900 px-5 py-3 text-sm tracking-wide text-white transition-colors hover:bg-[#8a7a5c] disabled:cursor-wait disabled:opacity-60"
              >
                {isSubmitting ? 'Adding your wish...' : 'Drop your wish in the jar'}
              </button>
              <p aria-live="polite" className={`min-h-5 text-sm ${statusKind === 'error' ? 'text-[#a44a3a]' : statusKind === 'success' ? 'text-[#657d65]' : 'text-neutral-500'}`}>
                {displayStatus}
              </p>
            </div>
          </form>
        </div>

        <div className="reveal mt-16 border-t border-[var(--line)] pt-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-serif-display text-2xl text-neutral-900">A few wishes from the jar</h3>
            <span className="font-hand text-lg text-[#8a8580]">small dreams, shared</span>
          </div>
          {wishes.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wishes.slice(0, 6).map((wish, index) => {
                const hasDevanagari = containsDevanagari(`${wish.destination} ${wish.message ?? ''} ${wish.name ?? ''}`);
                return (
                  <button key={`${wish.id}-card`} type="button" onClick={(event) => { wishTriggerRef.current = event.currentTarget; setSelectedWish(wish); }} aria-label={`Read the wish for ${wish.destination}`} className={`sticky-note note-edge w-full p-5 text-left ${['note-pink', 'note-blue', 'note-orange', 'note-yellow'][index % 4]} ${index % 2 ? 'rotate-2' : '-rotate-1'} ${hasDevanagari ? 'wish-note-devanagari' : ''}`}>
                    <span className="block font-hand text-xl leading-tight" lang={containsDevanagari(wish.destination) ? 'hi' : undefined}>{wish.destination}</span>
                    <span className="mt-2 block text-sm text-neutral-700" lang={containsDevanagari(wish.message ?? '') ? 'hi' : undefined}>{wish.message ? `${wish.message.slice(0, 85)}${wish.message.length > 85 ? '…' : ''}` : 'A little dream, folded up and shared.'}</span>
                    {wish.name ? <span className="mt-3 block font-hand text-base text-neutral-600" lang={containsDevanagari(wish.name) ? 'hi' : undefined}>— {wish.name}</span> : null}
                    <span className="mt-3 block text-xs uppercase tracking-widest text-neutral-500">open this note</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-5 text-neutral-500">Your note will join this little collection after you submit it.</p>
          )}
        </div>
      </div>
      {selectedWish ? (
        <div className="wish-dialog-backdrop" onClick={() => setSelectedWish(null)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="wish-dialog-title"
            className={`wish-dialog paper-card paper-edge ${containsDevanagari(`${selectedWish.destination} ${selectedWish.message ?? ''} ${selectedWish.name ?? ''}`) ? 'wish-dialog-devanagari' : ''}`}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setSelectedWish(null);
              if (event.key === 'Tab') {
                event.preventDefault();
                wishCloseRef.current?.focus();
              }
            }}
          >
            <button ref={wishCloseRef} type="button" className="wish-dialog-close" onClick={() => setSelectedWish(null)} aria-label="Close wish">×</button>
            <p className="font-hand text-lg text-[#8a8580]">a note from the jar</p>
            <h3 id="wish-dialog-title" lang={containsDevanagari(selectedWish.destination) ? 'hi' : undefined} className="mt-2 font-serif-display text-3xl text-neutral-900">{selectedWish.destination}</h3>
            <p lang={containsDevanagari(selectedWish.message ?? '') ? 'hi' : undefined} className="mt-5 whitespace-pre-wrap leading-relaxed text-neutral-700">{selectedWish.message || 'A little dream, folded up and shared.'}</p>
            {selectedWish.name ? <p lang={containsDevanagari(selectedWish.name) ? 'hi' : undefined} className="mt-6 font-hand text-xl text-neutral-600">— {selectedWish.name}</p> : null}
          </section>
        </div>
      ) : null}
    </section>
  );
}

export function Currently() {
  return (
    <section id="currently" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="reveal">
          <SectionLabel>a note from right now</SectionLabel>
          <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">What I&apos;m currently up to.</h2>
        </div>

        <div className="relative mt-14">
          <span aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 w-px bg-[var(--line)]" />
          <ol className="space-y-12">
            {currently.map((item, i) => (
              <li key={item.index} className="reveal relative pl-12" style={{ '--reveal-delay': `${i * 130}ms` } as React.CSSProperties}>
                <span aria-hidden="true" className="absolute left-0 top-1.5 h-8 w-8 rounded-full border border-[#ddd0bb] bg-white" />
                <span aria-hidden="true" className="absolute left-[7px] top-[13px] h-2.5 w-2.5 rounded-full bg-[#e8dfd2] ring-4 ring-white" />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-hand text-lg text-[#8a8580]">{item.index}</span>
                  <h3 className="font-serif-display text-2xl text-neutral-900">{item.title}</h3>
                  <span className="font-hand text-lg text-[#b6a88f]">· {item.note}</span>
                </div>
                <p className="mt-2 max-w-xl leading-relaxed text-neutral-600">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>chapter four — the toolkit</SectionLabel>
            <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">An index of things I use</h2>
          </div>
          <p className="font-hand text-xl text-neutral-500">no percentages, no bars — just honest lists</p>
        </div>

        <dl className="mt-12 divide-y divide-[var(--line)] border-t border-[var(--line)]">
          {skills.map((group, i) => (
            <div
              key={group.group}
              className="reveal grid gap-3 py-8 md:grid-cols-12 md:items-baseline"
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              <dt className="md:col-span-4">
                <span className="font-serif-display text-2xl text-neutral-900">{group.group}</span>
                <span className="ml-3 font-hand text-base text-[#b6a88f]">{group.note}</span>
              </dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-2 md:col-span-8">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border border-[var(--line)] bg-white px-3 py-1 text-sm text-neutral-700 transition-colors duration-300 hover:border-[#ddd0bb] hover:bg-[#f6f1e8]"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ProjectCover({ slug, title, image, note, index, size }: { slug: string; title: string; image: string; note: string; index: number; size: (typeof projects)[number]['size'] }) {
  const proportions = size === 'large' ? 'aspect-[16/10]' : size === 'medium' ? 'aspect-[4/3]' : 'aspect-square';
  return (
    <div className={`project-visual paper-card paper-edge relative overflow-hidden project-background-${index % 4}`}>
      <a href={`/projects/${slug}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#9c604e]" aria-label={`Open the ${title} project file`}>
        <div className={`project-cover project-background-${index % 4} relative ${proportions} w-full overflow-hidden`}>
          <Image
            src={image}
            alt={`${title} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain"
          />
        </div>
      </a>
      <p className="border-t border-[var(--line)] bg-white px-4 py-3 font-hand text-base text-neutral-600">{note}</p>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-[var(--line)] bg-[#fbf8f2] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-2xl">
          <SectionLabel>chapter two — selected projects</SectionLabel>
          <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">Thoughtful work, made with curiosity</h2>
          <p className="mt-4 leading-relaxed text-neutral-600">A selection of work across product design, data and development. For more detail, <a className="hand-underline transition-colors hover:text-[#a9523d]" href="#case-studies">open the case study shelf</a>.</p>
        </div>

        <div className="mt-16 space-y-16">
          {projects.map((project, i) => (
            <article
              key={project.number}
              className="reveal grid items-center gap-8 border-b border-[var(--line)] pb-12 last:border-b-0 md:grid-cols-12 md:gap-12"
              style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
            >
              <div className={`${i % 2 === 1 ? 'md:order-2' : ''} md:col-span-7`}>
                <ProjectCover slug={project.slug} title={project.title} image={project.coverImage} note={project.coverNote} index={i} size={project.size} />
              </div>
              <div className={`${i % 2 === 1 ? 'md:order-1' : ''} md:col-span-5`}>
                <ProjectBody project={project} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const reservedCaseStudies = [
  { slug: 'ai-recruiting-agent', number: '01' },
  { slug: 'biomedical-waste-management', number: '02' },
  { slug: 'document-generator', number: '03' },
];

const futureCaseStudySections = [
  'Problem statement',
  'Research & observations',
  'User personas & requirements',
  'User flows & design decisions',
  'Technical architecture & implementation',
  'Challenges, learnings & results',
];

export function CaseStudies() {
  const studies = reservedCaseStudies
    .map((entry) => ({ ...entry, project: projects.find((project) => project.slug === entry.slug) }))
    .filter((entry): entry is typeof entry & { project: (typeof projects)[number] } => Boolean(entry.project));

  return (
    <section id="case-studies" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>project notes — the thinking behind the work</SectionLabel>
            <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">Behind the Things I&apos;ve Built</h2>
            <p className="mt-4 leading-relaxed text-neutral-600">Every project starts with a question. Here&apos;s where the thinking happens.</p>
          </div>
          <a href="#projects" className="hand-underline mb-1 font-hand text-lg text-neutral-700">Back to the project overview</a>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {studies.map(({ project, number }, index) => (
            <article key={project.slug} className="case-study-card reveal" style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}>
              <a href={`/projects/${project.slug}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9c604e]" aria-label={`View available project details for ${project.title}`}>
                <div className={`case-cover case-cover-image project-background-${index}`}>
                  <Image src={project.coverImage} alt={`${project.title} project screen`} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-contain p-3" />
                  <span className="case-cover-number">{number}</span>
                </div>
                <div className="case-study-copy">
                  <p className="font-hand text-lg text-[#8a8580]">case file {number}</p>
                  <h3 className="mt-1 font-serif-display text-2xl leading-snug text-neutral-900">{project.title}</h3>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-neutral-600">{project.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} categories`}>
                    {project.tags.slice(0, 3).map((tag) => <li className="case-tag" key={tag}>{tag}</li>)}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-2 border-b border-[#34312f] pb-1 text-sm text-[#34312f]">View available project details <span aria-hidden="true">↗</span></span>
                </div>
              </a>
              <div className="px-5 pb-5">
                <span className="case-coming-soon">Case study coming soon</span>
                <details className="case-reserved mt-4">
                  <summary>Reserved for the full story</summary>
                  <ul className="mt-3 space-y-1.5 text-sm text-neutral-600">
                    {futureCaseStudySections.map((topic) => <li key={topic}>— {topic}</li>)}
                  </ul>
                </details>
              </div>
            </article>
          ))}
        </div>
        <p className="reveal mt-7 max-w-3xl text-sm leading-relaxed text-neutral-500">Detailed research, user flows, testing notes and outcomes are reserved for future updates; they are not invented in these previews.</p>
      </div>
    </section>
  );
}

function ProjectBody({ project }: { project: (typeof projects)[number] }) {
  return (
    <div>
      <div className="flex items-baseline gap-4">
        <span className="font-hand text-3xl text-[#d5cab6]">{project.number}</span>
        <h3 className="font-serif-display text-2xl leading-snug text-neutral-900 md:text-3xl">{project.title}</h3>
      </div>
      <p className="mt-3 leading-relaxed text-neutral-600">{project.description}</p>
      <p className="mt-3 border-l-2 border-[#e8dfd2] pl-4 text-sm leading-relaxed text-neutral-500">
        <span className="font-hand text-base text-[#8a8580]">my contribution — </span>
        {project.contribution}
      </p>
      {project.futureScope ? (
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          <span className="font-medium text-neutral-700">Future scope: </span>{project.futureScope}
        </p>
      ) : null}
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="border border-[var(--line)] bg-white px-2.5 py-1 text-xs text-neutral-600">
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={`/projects/${project.slug}`} className="group inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-sm tracking-wide text-neutral-900 transition-colors hover:text-[#8a7a5c]">
          Read project notes
          <svg width="16" height="16" viewBox="0 0 16 16" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            <path d="M2 8 H13 M9 3 L14 8 L9 13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-sm tracking-wide text-neutral-900 transition-colors hover:text-[#8a7a5c]"
          >
            {project.linkLabel ?? 'View project'}
            <svg width="16" height="16" viewBox="0 0 16 16" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              <path d="M2 8 H13 M9 3 L14 8 L9 13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function Resume() {
  return (
    <section id="resume" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>chapter five — on paper</SectionLabel>
            <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">My journey, so far</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/Tanvi_Bhadane_CV_(2).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--line)] bg-white px-4 py-3 text-sm tracking-wide text-neutral-800 transition-colors hover:border-[#c8684e] hover:bg-[#fff9f4]"
            >
              View printed PDF
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href="/Tanvi_Bhadane_CV_(2).pdf"
              download="Tanvi-Bhadane-CV.pdf"
              className="group inline-flex items-center gap-3 bg-neutral-900 px-5 py-3 text-sm tracking-wide text-white transition-colors duration-300 hover:bg-[#8a7a5c]"
            >
              Download PDF
              <svg width="15" height="15" viewBox="0 0 15 15" className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true">
                <path d="M7.5 1 V10 M3 6.5 L7.5 11 L12 6.5 M2 13.5 H13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="resume-paper paper-card paper-edge mt-12 overflow-hidden">
          <div className="relative border-b border-[var(--line)] px-7 py-10 md:px-12">
            <span className="tape -top-3 left-14 -rotate-3" aria-hidden="true" />
            <span className="paper-clip -right-3 top-5" aria-hidden="true" />
            <span className="resume-stamp">CV / 2026</span>
            <div className="text-center">
              <p className="font-hand text-lg text-[#8a8580]">the formal version of me</p>
              <h3 className="mt-2 font-serif-display text-4xl text-neutral-900 md:text-5xl">{profile.name}</h3>
              <p className="mt-3 text-sm text-neutral-600">
                {profile.email} · {profile.phone} · {profile.location}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                {profile.github.replace('https://', '')} · {profile.linkedin.replace('https://www.', '')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-[170px_1fr]">
            <aside className="resume-index border-b border-[var(--line)] bg-[#fbf8f2] p-6 md:border-b-0 md:border-r md:p-7">
              <p className="font-hand text-lg text-[#8a8580]">contents</p>
              <nav className="mt-4 space-y-3 text-sm" aria-label="Resume sections">
                <a href="#resume-education" className="resume-index-link resume-index-terracotta">Education</a>
                <a href="#resume-experience" className="resume-index-link resume-index-orange">Internship</a>
                <a href="#achievements" className="resume-index-link resume-index-blue">Achievements</a>
                <a href="#activities" className="resume-index-link resume-index-yellow">Activities</a>
              </nav>
              <p className="mt-10 rotate-[-4deg] font-hand text-base text-[#b6a88f]">printed with a little hope</p>
            </aside>

            <div className="resume-body px-7 py-8 md:px-12 md:py-10">
              <p className="mb-2 font-hand text-lg text-[#8a8580]">a quick index of the work, learning and people who shaped me</p>
              <ResumeBlock id="resume-education" title="Education" items={resume.education} accent="terracotta" />
              <ResumeBlock id="resume-experience" title="Internship" items={resume.experience} accent="orange" />

            </div>
          </div>
        </div>
        <p className="reveal mt-4 text-center font-hand text-lg text-neutral-400">
          the full, formal version of me
        </p>
      </div>
    </section>
  );
}

export function AchievementsAndActivities() {
  return (
    <section id="activities" className="scroll-mt-24 border-t border-[var(--line)] bg-[#fbf8f2] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="reveal max-w-2xl">
          <SectionLabel>chapter five — beyond the classroom</SectionLabel>
          <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">Achievements &amp; extracurricular activities</h2>
          <p className="mt-4 leading-relaxed text-neutral-600">A few milestones, teams and communities that have shaped my journey.</p>
        </div>
        <div className="resume-paper paper-card paper-edge mt-12 grid gap-8 overflow-hidden p-7 md:grid-cols-2 md:p-12">
          <ResumeBlock id="achievements" title="Achievements" items={achievements} accent="yellow" last />
          <ResumeBlock id="activities-list" title="Extracurricular activities" items={extracurricularActivities} accent="blue" last />
        </div>
      </div>
    </section>
  );
}

function ResumeBlock({
  id,
  title,
  items,
  accent,
  last,
}: {
  id: string;
  title: string;
  items: { title: string; place: string; detail: string; link?: string; linkLabel?: string }[];
  accent: 'terracotta' | 'orange' | 'blue' | 'yellow';
  last?: boolean;
}) {
  return (
    <section id={id} className={`resume-section resume-section-${accent} reveal pt-8 ${last ? '' : 'border-b border-[var(--line)] pb-8'}`}>
      <h4 className="flex items-center gap-3 font-hand text-xl uppercase tracking-widest text-[#8a8580]">
        <span aria-hidden="true" className="resume-section-mark" />
        {title}
      </h4>
      <ul className="mt-4 space-y-5">
        {items.map((item) => (
          <li key={item.title + item.place}>
            <p className="font-medium text-neutral-900">{item.title}</p>
            <p className="text-sm text-neutral-600">{item.place}</p>
            {item.detail ? <p className="mt-0.5 text-sm leading-relaxed text-neutral-500">{item.detail}</p> : null}
            {item.link ? (
              <a className="mt-2 inline-flex items-center gap-1 border-b border-neutral-700 pb-0.5 text-xs text-neutral-700 hover:text-[#a9523d]" href={item.link} target="_blank" rel="noopener noreferrer">
                {item.linkLabel ?? 'View details'} <span aria-hidden="true">↗</span><span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-[var(--line)] bg-[#fbf8f2] px-5 pb-16 pt-24 md:px-8 md:pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="reveal font-hand text-2xl text-neutral-500">the last page (for now)</p>
        <h2 className="reveal mt-4 font-serif-display text-4xl leading-tight text-neutral-900 md:text-6xl">
          {contact.heading}
        </h2>

        <div className="reveal mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-neutral-900 transition-colors hover:text-[#8a7a5c]"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-neutral-900 transition-colors hover:text-[#8a7a5c]"
          >
            LinkedIn<span className="sr-only">(opens in a new tab)</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-neutral-900 transition-colors hover:text-[#8a7a5c]"
          >
            GitHub<span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <p className="reveal mt-16 font-hand text-2xl text-neutral-500">{contact.closingNote}</p>
        <p className="reveal mt-2 font-hand text-xl text-[#b6a88f]">— Tanvi</p>
        <p className="reveal journal-signoff mt-8 font-hand text-xl text-[#a9523d]">Made with curiosity and a little coffee.</p>
        <a href="/admin/login" className="mt-7 inline-flex min-h-11 items-center border-b border-dashed border-[#b9a995] px-1 text-xs text-[#766c62] transition-colors hover:border-[#9c604e] hover:text-[#34312f]">Owner sign in</a>
      </div>
    </section>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-white/95 text-neutral-600 shadow-sm transition-all duration-500 hover:text-neutral-900 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg width="15" height="15" viewBox="0 0 15 15" aria-hidden="true">
        <path d="M7.5 13 V3 M3 7.5 L7.5 3 L12 7.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

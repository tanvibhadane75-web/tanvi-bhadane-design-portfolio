'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { achievements, beyond, certifications, contact, currently, extracurricularActivities, hero, profile, projects, resume, skills } from '@/lib/content';
import { Doodle } from '@/components/doodles';
import { PhotoWall } from '@/components/photo-wall';

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-label font-hand text-xl text-[#D9B7A5]">
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
    <section id="top" className="grid-paper relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-24 md:px-8">
      <HeroStationery />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <div className="grid flex-1 items-center gap-10 py-8 md:grid-cols-[1.08fr_.92fr] md:gap-12 md:py-10">
          <div className="reveal is-visible" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
            <p className="hero-kraft-label">FIELD NOTES <span aria-hidden="true">/</span> A PERSONAL JOURNAL</p>
            <p className="hero-availability mt-6 inline-flex items-center gap-2 rounded-full border border-[#a8b8a0] bg-[#e9efe6] px-3 py-1.5 text-xs font-medium tracking-wide text-[#4f6550]">
              <span className="size-2 rounded-full bg-[#728c70]" aria-hidden="true" />
              Open to opportunities
            </p>
            <h1 className="mt-4 font-hand text-[clamp(3.6rem,7.1vw,6.5rem)] leading-[0.9] text-[#34312f]">{hero.intro[0]}</h1>
            <p className="mt-5 max-w-xl font-serif-display text-2xl leading-snug text-[#625c55] md:text-3xl">{hero.intro[1]}</p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#625c55] md:text-base">{hero.intro[2]}</p>
            <p className="mt-4 max-w-lg font-hand text-lg leading-snug text-[#8a6c57]">{hero.status}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex min-h-11 items-center gap-2 bg-[#34312f] px-5 py-3 text-sm tracking-wide text-white transition-colors hover:bg-[#b77c64]">
                Explore my work <span aria-hidden="true">↘</span>
              </a>
              <a href="#about" className="inline-flex min-h-11 items-center border border-[#cfc3b4] bg-[#fffdf8] px-5 py-3 text-sm tracking-wide text-[#34312f] transition-colors hover:border-[#b77c64]">
                Get to know me
              </a>
            </div>
            <p className="mt-6 font-hand text-base text-[#8a6c57]">Pune, India <span aria-hidden="true">·</span> collecting ideas</p>
          </div>

          <aside className="reveal is-visible relative mx-auto w-full max-w-[25rem] md:max-w-none" style={{ '--reveal-delay': '220ms' } as React.CSSProperties} aria-label="Portrait and notes about Tanvi">
            <div className="hero-sage-paper" aria-hidden="true" />
            <figure className="hero-polaroid paper-edge relative mx-auto w-[min(100%,20rem)] rotate-2 p-3 pb-5 sm:w-[min(100%,22rem)]">
              <span className="tape tape-pink -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden bg-black" role="img" aria-label="Portrait of Tanvi standing in a tropical garden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-11-25%20at%202.45.13%20PM-MijdvnBVpu60pFux97sAx1Wvqe4MaB.jpeg"
                  alt="Tanvi standing in a tropical garden"
                  fill
                  sizes="(max-width: 640px) 80vw, 352px"
                  className="object-cover object-center"
                  unoptimized
                />
              </div>
              <figcaption className="pt-3 text-center font-hand text-lg text-[#34312f]">a curious mind, collecting little details</figcaption>
            </figure>
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:mt-0 md:block">
              <span className="hero-floating-label hero-label-design md:absolute md:-left-7 md:top-[22%]">Design &amp; Creativity</span>
              <span className="hero-floating-label hero-label-tech md:absolute md:right-2 md:top-[44%]">Technology Explorer</span>
              <span className="hero-floating-label hero-label-curious md:absolute md:-left-4 md:bottom-[18%]">Curious by Nature</span>
            </div>
          </aside>
        </div>

        <nav className="reveal is-visible mt-4 grid grid-cols-3 gap-2 sm:gap-3" aria-label="Start here" style={{ '--reveal-delay': '360ms' } as React.CSSProperties}>
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
      </div>
    </section>
  );
}

function HeroStationery() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <span className="hero-flower-sticker absolute left-[3%] top-[12%] hidden md:block" />
      <span className="hero-wood-heart absolute bottom-[12%] left-[4%] hidden md:block">♥</span>
      <span className="hero-camera-sticker absolute bottom-[9%] right-[4%] hidden md:block"><i /></span>
      <div className="sticky-note note-yellow note-edge absolute right-[5%] top-[18%] hidden w-36 rotate-6 p-4 md:block">
        <span className="tape tape-pink -top-3 left-6 rotate-6" />
        <p className="font-hand text-lg leading-tight">made with curiosity <span className="flower-sticker" /></p>
      </div>
    </div>
  );
}

export function About() {
  const aboutFacts = [
    { text: 'Curious by nature', tone: 'note-yellow' },
    { text: 'UI/UX and product design', tone: 'note-blue' },
    { text: 'Music, singing and a little ukulele', tone: 'note-pink' },
    { text: 'Sunrises, sunsets and photography', tone: 'note-lime' },
    { text: 'Books, stories and mythology', tone: 'note-terracotta' },
  ];

  return (
    <section id="about" className="grid-paper scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <header className="reveal relative">
          <SectionLabel>chapter one — pages from my journal</SectionLabel>
          <h2 className="mt-3 font-serif-display text-4xl md:text-5xl">A little more about me...</h2>
          <p className="mt-4 max-w-2xl leading-relaxed">
            The person behind the notes, the sketches and the things I make.
          </p>
          <span className="flower-sticker absolute right-8 top-2 hidden rotate-12 md:block" aria-hidden="true" />
        </header>

        <div className="mt-12">
          <PhotoWall />
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12">
          <div className="relative contents lg:block">
            <article className="paper-card paper-edge relative p-6 md:p-9">
              <span className="tape tape-pink -top-3 left-10 -rotate-2" aria-hidden="true" />
              <span className="paper-clip -right-2 -top-3" aria-hidden="true" />
              <p className="font-hand text-lg text-[#8a5e4b]">a note about the path so far</p>
              <h3 className="mt-2 font-serif-display text-2xl md:text-3xl">Design, technology and the joy of figuring things out.</h3>
              <p className="mt-4 leading-relaxed">
                I&apos;m Tanvi Bhadane, an engineering graduate interested in design, technology and creative problem-solving. I like understanding people and turning ideas into useful digital experiences.
              </p>
              <p className="mt-4 leading-relaxed">
                My journey began with a Diploma in Information Technology from Government Polytechnic Nashik, followed by a B.Tech in Electronics and Telecommunication Engineering from VIIT Pune. Along the way, I gained web development internship experience, served as Design Head at I2IC and volunteered with NSS.
              </p>
            </article>
          </div>

          <div className="relative">
            <aside className="rotate-[-1deg] lg:mt-6" aria-labelledby="about-facts-title">
              <div className="sticky-note note-yellow note-edge relative p-5 pt-7 shadow-lg md:p-6 md:pt-8">
                <span className="tape tape-pink -top-3 left-9 rotate-2" aria-hidden="true" />
                <h3 id="about-facts-title" className="font-hand text-2xl text-[#34312f]">A few things about me</h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {aboutFacts.map((fact) => (
                    <li key={fact.text} className={`note-edge px-3 py-2 font-hand text-lg leading-tight text-[#34312f] ${fact.tone}`}>
                      {fact.text}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
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
      const payload = (await response.json().catch(() => ({}))) as { wish?: Wish; error?: string };

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
          <p className="wish-subtitle mt-2 font-hand text-2xl text-[#E9D18E]">Somewhere I&apos;d love to be...</p>
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
  const sheetTones = ['note-pink', 'note-blue', 'note-lime', 'note-yellow'] as const;
  const labelTones = ['bg-[#F5EFE5]', 'bg-[#E9D18E]', 'bg-[#A9BBD0]', 'bg-[#D9AEB2]'] as const;
  const labelTilts = ['-rotate-1', 'rotate-1', 'rotate-0', '-rotate-2'] as const;

  return (
    <section id="skills" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>chapter four — the toolkit</SectionLabel>
            <h2 className="mt-3 font-serif-display text-4xl md:text-5xl">Things in my creative toolbox.</h2>
          </div>
          <p className="font-hand text-xl">no percentages, no bars — just honest lists</p>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {skills.map((group, i) => (
            <article
              key={group.group}
              aria-labelledby={`skill-group-${i}`}
              className={`sticky-note note-edge reveal relative p-6 pt-8 shadow-[0_14px_28px_-18px_rgba(0,0,0,.55)] md:p-8 md:pt-10 ${sheetTones[i % sheetTones.length]} ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              <span className="tape tape-pink -top-3 left-10 -rotate-2" aria-hidden="true" />
              <span className="paper-clip -right-2 -top-3" aria-hidden="true" />
              <p className="font-hand text-base uppercase tracking-wide text-[#6f5d52]">toolkit sheet 0{i + 1}</p>
              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 id={`skill-group-${i}`} className="font-serif-display text-2xl text-[#34312f] md:text-3xl">{group.group}</h3>
                <span className="font-hand text-lg text-[#625c55]">{group.note}</span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2.5" aria-label={`${group.group} skills`}>
                {group.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className={`border border-[#34312f]/10 px-3 py-1.5 font-hand text-lg leading-none text-[#34312f] shadow-[0_3px_8px_-6px_rgba(0,0,0,.45)] transition-transform hover:-translate-y-0.5 ${labelTones[(itemIndex + i) % labelTones.length]} ${labelTilts[(itemIndex + i) % labelTilts.length]}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Certifications ──────────────────────────────────────── */

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 border-t border-[var(--line)] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <div className="reveal relative flex flex-wrap items-end justify-between gap-5">
          <div>
            <SectionLabel>chapter four-b — always learning</SectionLabel>
            <h2 className="mt-3 font-serif-display text-4xl md:text-5xl">
              Little Things I&apos;ve Learned.
            </h2>
            <p className="mt-3 font-hand text-xl text-[#8a8580]">Certifications &amp; continuous learning.</p>
          </div>
          {/* Decorative sticker top-right */}
          <span className="hidden rotate-6 font-hand text-3xl text-[#D9AEB2] md:block" aria-hidden="true">✦</span>
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <article
              key={cert.id}
              className={`cert-card paper-card paper-edge reveal relative p-6 md:p-8 ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
              aria-label={`${cert.course} certificate from ${cert.platform}`}
            >
              {/* Tape + clip decorations */}
              <span className="tape tape-pink -top-3 left-10 -rotate-2" aria-hidden="true" />
              <span className="paper-clip -right-2 -top-3" aria-hidden="true" />

              {/* Platform badge */}
              <div className="flex items-center justify-between">
                <span className="cert-platform-badge inline-flex items-center gap-1.5 border border-[#A9BBD0]/60 bg-[#e8eff7] px-2.5 py-1 font-hand text-sm text-[#3d5a73]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <circle cx="6" cy="6" r="5.25" stroke="#3d5a73" strokeWidth="1.1" />
                    <path d="M4 6.5 L5.5 8 L8.5 4.5" stroke="#3d5a73" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {cert.platform}
                </span>
                <span className="font-hand text-base text-[#8a8580]">{cert.date}</span>
              </div>

              {/* UX / design illustration */}
              <div className="cert-illustration mt-5 flex items-center justify-center" aria-hidden="true">
                <svg width="68" height="52" viewBox="0 0 68 52" fill="none" className="text-[#b77c64]">
                  {/* Wireframe screen */}
                  <rect x="2" y="2" width="64" height="42" rx="4" stroke="currentColor" strokeWidth="1.4" />
                  {/* Header bar */}
                  <rect x="2" y="2" width="64" height="10" rx="4" fill="currentColor" fillOpacity="0.12" />
                  {/* Three dots */}
                  <circle cx="9" cy="7" r="1.5" fill="currentColor" fillOpacity="0.5" />
                  <circle cx="14" cy="7" r="1.5" fill="currentColor" fillOpacity="0.5" />
                  <circle cx="19" cy="7" r="1.5" fill="currentColor" fillOpacity="0.5" />
                  {/* Content lines */}
                  <rect x="10" y="18" width="28" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.3" />
                  <rect x="10" y="23" width="20" height="2" rx="1" fill="currentColor" fillOpacity="0.2" />
                  <rect x="10" y="27" width="24" height="2" rx="1" fill="currentColor" fillOpacity="0.2" />
                  {/* Prototype connector */}
                  <line x1="34" y1="44" x2="34" y2="51" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
                  {/* Star sparkle */}
                  <path d="M56 15 L57.2 18.5 L61 18.5 L58 20.5 L59 24 L56 22 L53 24 L54 20.5 L51 18.5 L54.8 18.5 Z" fill="currentColor" fillOpacity="0.35" />
                </svg>
              </div>

              {/* Issued by */}
              <p className="mt-4 font-hand text-base text-[#8a5e4b]">by {cert.issuedBy}</p>

              {/* Course title */}
              <h3 className="mt-1 font-serif-display text-xl leading-snug text-[#34312f] md:text-2xl">
                {cert.course}
              </h3>

              {/* Personal note */}
              <p className="mt-3 font-hand text-lg italic text-[#625c55]">{cert.note}</p>

              {/* Ruled line */}
              <div className="rule-soft mt-5" />

              {/* CTA */}
              <div className="mt-5">
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify-link group inline-flex items-center gap-2 border-b border-[#34312f] pb-1 text-sm tracking-wide text-[#34312f] transition-colors hover:text-[#8a5e4b]"
                >
                  View Certificate
                  <svg width="13" height="13" viewBox="0 0 13 13" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                    <path d="M2 11 L11 2 M5 2 H11 V8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}

          {/* "More coming" placeholder card */}
          <div className="cert-placeholder paper-edge reveal relative flex min-h-[300px] flex-col items-center justify-center gap-4 border border-dashed border-[#d5cabb] bg-[#faf6ef] p-8 text-center rotate-1" style={{ '--reveal-delay': `${certifications.length * 90}ms` } as React.CSSProperties}>
            <span className="flower-sticker scale-150" aria-hidden="true" />
            <p className="font-hand text-xl text-[#8a8580]">more little lessons on the way</p>
            <p className="text-xs uppercase tracking-[0.14em] text-[#b6a88f]">always learning</p>
          </div>
        </div>

        {/* Closing note */}
        <p className="reveal mt-14 font-hand text-xl text-[#8a8580]">
          Learning never stops — just the certificates do, sometimes. <span aria-hidden="true">✿</span>
        </p>
      </div>
    </section>
  );
}

function ProjectCover( slug, title, image, note, index, size }: { slug: string; title: string; image: string; note: string; index: number; size: (typeof projects)[number]['size'] }) {
  const proportions = size === 'large' ? 'aspect-[16/10]' : size === 'medium' ? 'aspect-[4/3]' : 'aspect-square';
  const tilts = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'] as const;

  return (
    <div className={`project-visual paper-card paper-edge relative overflow-visible project-background-${index % 4} ${tilts[index % tilts.length]}`}>
      <span className="tape tape-pink left-[18%] top-0 rotate-3" aria-hidden="true" />
      <span className="paper-clip -right-2 top-5" aria-hidden="true" />
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
          <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">Things I&apos;ve made along the way.</h2>
          <p className="mt-4 leading-relaxed text-neutral-600">A few projects from my notebooks, each a different mix of design, data and development. <a className="hand-underline transition-colors hover:text-[#a9523d]" href="#case-studies">Browse the project files</a>.</p>
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
                <ProjectBody project={project} index={i} />
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
  { slug: 'campburger-food-ordering', number: '02' },
  { slug: 'biomedical-waste-management', number: '03' },
  { slug: 'document-generator', number: '04' },
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

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {studies.map(({ project, number }, index) => (
            <article key={project.slug} className={`case-study-card paper-edge reveal relative ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`} style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}>
              <span className="tape tape-pink absolute left-[18%] top-0 z-10 rotate-3" aria-hidden="true" />
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
                <span className="case-coming-soon">Project file preview</span>
                <details className="case-reserved mt-4">
                  <summary>What&apos;s not documented here yet</summary>
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

function ProjectBody({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const tagTones = ['bg-[#F5EFE5]', 'bg-[#E9D18E]', 'bg-[#A9BBD0]', 'bg-[#D9AEB2]'] as const;

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
          <li key={tag} className={`border border-[#34312f]/10 px-2.5 py-1 text-xs text-[#34312f] ${tagTones[(index + project.tags.indexOf(tag)) % tagTones.length]}`}>
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a href={`/projects/${project.slug}`} className="group inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-sm tracking-wide text-neutral-900 transition-colors hover:text-[#8a7a5c]">
          View case study
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

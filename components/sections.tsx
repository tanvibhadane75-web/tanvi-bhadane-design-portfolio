'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { aboutNotes, beyond, contact, currently, hero, profile, projects, resume, skills } from '@/lib/content';
import { ArrowDoodle, Doodle } from '@/components/doodles';

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-hand text-xl text-[#8a8580]">
      <span aria-hidden="true">✳ </span>
      {children}
    </p>
  );
}

export function Hero() {
  return (
    <section id="top" className="grid-paper relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pb-24 pt-32 md:px-8">
      <HeroStationery />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="reveal" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
          <p className="font-hand text-2xl text-neutral-500">a small journal, kept publicly</p>
        </div>

        <h1
          className="reveal mt-6 font-serif-display text-[13vw] leading-[1.02] text-neutral-900 sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
        >
          A little
          <br />
          about <em className="not-italic hand-underline">me</em>
        </h1>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="reveal md:col-span-5 md:col-start-1" style={{ '--reveal-delay': '320ms' } as React.CSSProperties}>
            <p className="font-serif-display text-2xl text-neutral-900">{hero.intro[0]}</p>
            <p className="mt-4 max-w-md leading-relaxed text-neutral-600">{hero.intro[1]}</p>
          </div>

          <div className="reveal relative md:col-span-4 md:col-start-8" style={{ '--reveal-delay': '440ms' } as React.CSSProperties}>
            <div className="sticky-note note-edge relative -rotate-1 p-6 pt-8">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" aria-hidden="true" />
              <p className="font-hand text-lg leading-snug text-neutral-800">{hero.status}</p>
              <p className="mt-4 font-hand text-base text-neutral-500">— noted on a rainy Tuesday</p>
            </div>
          </div>
        </div>

        <div className="reveal mt-16 hidden md:block" style={{ '--reveal-delay': '560ms' } as React.CSSProperties}>
          <ArrowDoodle className="ml-auto w-28 rotate-12 text-neutral-400" />
        </div>
      </div>

      <a
        href="#about"
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-neutral-400 transition-colors hover:text-neutral-900"
        aria-label="Scroll to the about section"
      >
        <span className="font-hand text-lg">scroll, slowly</span>
        <svg width="14" height="34" viewBox="0 0 14 34" className="animate-drift" aria-hidden="true">
          <path d="M7 0 V30 M2 25 L7 31 L12 25" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}

function HeroStationery() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
      <div className="hero-notebook" />
      <div className="hero-pencil" />
      <div className="hero-plant" />
      <Doodle kind="ukulele" className="absolute bottom-[18%] left-[9%] h-28 rotate-[12deg] text-[#8d806e]" />
      <div className="sticky-note note-pink note-edge absolute right-[9%] top-[23%] w-36 rotate-6 p-4">
        <span className="tape -top-3 left-6 rotate-6" />
        <p className="font-hand text-lg leading-tight">make room for the unexpected</p>
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
            <SectionLabel>chapter one — little notes about me</SectionLabel>
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
        <div className="reveal max-w-2xl">
          <SectionLabel>chapter two — beyond the screen</SectionLabel>
          <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">{beyond.heading}</h2>
        </div>

        <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8">
          {beyond.groups.map((group, i) => (
            <div key={group.id} className="reveal" style={{ '--reveal-delay': `${i * 150}ms` } as React.CSSProperties}>
              <div className={`relative ${i === 1 ? 'md:mt-12' : ''}`}>
                {group.doodle === 'strings' && (
                  <>
                    <Doodle kind="strings" className="w-full text-neutral-400" />
                    <Doodle kind="ukulele" className="absolute -top-2 right-2 hidden h-24 text-neutral-500 sm:block" />
                  </>
                )}
                {group.doodle === 'portrait' && (
                  <>
                    <Doodle kind="portrait" className="h-28 text-neutral-600" />
                    <Doodle kind="palette" className="absolute right-0 top-4 w-24 text-neutral-400" />
                  </>
                )}
                {group.doodle === 'sun' && (
                  <>
                    <Doodle kind="sun" className="w-full max-w-[180px] text-[#b6a88f]" />
                    <Doodle kind="book" className="absolute right-0 top-2 w-24 text-neutral-500" />
                  </>
                )}

                <h3 className="mt-6 font-serif-display text-2xl text-neutral-900">{group.label}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-baseline gap-2 text-neutral-700">
                      <span aria-hidden="true" className="text-[#b6a88f]">~</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-hand text-lg text-neutral-500">{group.annotation}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-16 text-center font-hand text-2xl text-neutral-500">{beyond.closing}</p>
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

const featuredWish = 'Experience the Yi Peng Lantern Festival in Thailand and watch thousands of glowing lanterns light up the night sky.';

export function DreamWishJar() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [form, setForm] = useState({ name: '', destination: '', message: '', website: '' });
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  const [status, setStatus] = useState('');
  const [statusKind, setStatusKind] = useState<'success' | 'error' | ''>('');
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
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

  useEffect(() => {
    let mounted = true;
    fetch('/api/wishes')
      .then(async (response) => {
        if (!response.ok) throw new Error('read failed');
        return (await response.json()) as { wishes?: Wish[] };
      })
      .then((payload) => {
        if (mounted && Array.isArray(payload.wishes)) setWishes(payload.wishes);
      })
      .catch(() => {
        if (mounted) setStatus('The jar is resting offline for a moment. You can still leave your wish.');
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

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

      setWishes((current) => [payload.wish as Wish, ...current]);
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
          <SectionLabel>a little something for the guestbook</SectionLabel>
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
                onClick={() => setSelectedWish({ id: 'tanvi-featured-wish', name: 'Tanvi', destination: 'Thailand', message: featuredWish, createdAt: '' })}
              >
                {featuredWish}
              </button>
              {wishes.slice(0, 3).map((wish, index) => (
                <div key={wish.id} className={`wish-note wish-note-visitor visitor-${index + 1}`}>
                  {wish.destination}
                  {wish.name ? <span className="mt-1 block text-xs opacity-70">— {wish.name}</span> : null}
                </div>
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
                {status}
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
              {wishes.slice(0, 6).map((wish, index) => (
                <button key={`${wish.id}-card`} type="button" onClick={(event) => { wishTriggerRef.current = event.currentTarget; setSelectedWish(wish); }} aria-label={`Read the wish for ${wish.destination}`} className={`sticky-note note-edge w-full p-5 text-left ${['note-pink', 'note-blue', 'note-orange', 'note-yellow'][index % 4]} ${index % 2 ? 'rotate-2' : '-rotate-1'}`}>
                  <span className="block font-hand text-xl leading-tight">{wish.destination}</span>
                  <span className="mt-2 block text-sm text-neutral-700">{wish.message ? `${wish.message.slice(0, 85)}${wish.message.length > 85 ? '…' : ''}` : 'A little dream, folded up and shared.'}</span>
                  {wish.name ? <span className="mt-3 block font-hand text-base text-neutral-600">— {wish.name}</span> : null}
                  <span className="mt-3 block text-xs uppercase tracking-widest text-neutral-500">open this note</span>
                </button>
              ))}
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
            className="wish-dialog paper-card paper-edge"
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
            <h3 id="wish-dialog-title" className="mt-2 font-serif-display text-3xl text-neutral-900">{selectedWish.destination}</h3>
            <p className="mt-5 whitespace-pre-wrap leading-relaxed text-neutral-700">{selectedWish.message || 'A little dream, folded up and shared.'}</p>
            {selectedWish.name ? <p className="mt-6 font-hand text-xl text-neutral-600">— {selectedWish.name}</p> : null}
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
          <SectionLabel>chapter three — right now</SectionLabel>
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

function ProjectCover({ title, image, note, tall }: { title: string; image: string; note: string; tall?: boolean }) {
  return (
    <div className={`group/project-cover project-cover relative w-full overflow-hidden ${tall ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
      <Image
        src={image}
        alt={`Editorial concept illustration for ${title}, not a product screenshot.`}
        fill
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover transition-transform duration-700 group-hover/project-cover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 bg-gradient-to-t from-[#302b27]/75 via-[#302b27]/35 to-transparent px-5 pb-4 pt-12">
        <p className="font-hand text-lg text-white">{note}</p>
        <span className="text-[9px] uppercase tracking-[0.18em] text-white/85">concept illustration · not a screenshot</span>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-[var(--line)] bg-[#fbf8f2] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-2xl">
          <SectionLabel>chapter five — things I&apos;ve made</SectionLabel>
          <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">A portfolio of small obsessions</h2>
          <p className="mt-4 leading-relaxed text-neutral-600">A quick look at the things I&apos;ve made. For the story behind the work, <a className="hand-underline transition-colors hover:text-[#a9523d]" href="#case-studies">visit the case study shelf</a>.</p>
        </div>

        <div className="mt-16 space-y-20">
          {projects.map((project, i) => (
            <article
              key={project.number}
              className="reveal grid items-center gap-8 md:grid-cols-12 md:gap-12"
              style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
            >
              {project.size === 'large' ? (
                <>
                  <div className="project-visual paper-card paper-edge relative overflow-hidden md:col-span-7">
                    <span className="tape -top-3 left-10 z-10 -rotate-3" aria-hidden="true" />
                    <ProjectCover title={project.title} image={project.coverImage} note={project.coverNote} tall />
                  </div>
                  <div className="md:col-span-5">
                    <ProjectBody project={project} />
                  </div>
                </>
              ) : project.size === 'medium' ? (
                i % 2 === 0 ? (
                  <>
                    <div className="project-visual paper-card paper-edge relative overflow-hidden md:col-span-6">
                      <ProjectCover title={project.title} image={project.coverImage} note={project.coverNote} />
                    </div>
                    <div className="md:col-span-6">{<ProjectBody project={project} />}</div>
                  </>
                ) : (
                  <>
                    <div className="order-2 md:order-1 md:col-span-6">{<ProjectBody project={project} />}</div>
                    <div className="project-visual paper-card paper-edge relative order-1 overflow-hidden md:order-2 md:col-span-6">
                      <ProjectCover title={project.title} image={project.coverImage} note={project.coverNote} />
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className="project-visual paper-card paper-edge relative overflow-hidden md:col-span-5">
                    <ProjectCover title={project.title} image={project.coverImage} note={project.coverNote} />
                  </div>
                  <div className="md:col-span-7">
                    <ProjectBody project={project} />
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const caseStudies = [
  {
    number: '01',
    title: 'AI Recruiting Agent',
    description: 'A recruitment assistant for resume parsing, candidate skill matching and job description generation.',
    tags: ['AI', 'Recruitment', 'Full stack'],
    palette: 'case-cover-coral',
    note: 'a thoughtful match, made easier',
  },
  {
    number: '02',
    title: 'Smart Biomedical Waste Management System',
    description: 'A system for waste tracking, categorisation, QR-based handoffs and reporting.',
    tags: ['Healthcare', 'QR tracking', 'Systems'],
    palette: 'case-cover-sage',
    note: 'making every handoff count',
  },
  {
    number: '03',
    title: 'Document Generator',
    description: 'An application that automates Bonafide Certificates, Leaving Certificates and Form 15A generation.',
    tags: ['Workflow', 'Automation', 'Web app'],
    palette: 'case-cover-lavender',
    note: 'less repetition, more room to focus',
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>chapter six — the thinking behind the work</SectionLabel>
            <h2 className="mt-3 font-serif-display text-4xl text-neutral-900 md:text-5xl">Behind the Things I&apos;ve Built</h2>
            <p className="mt-4 leading-relaxed text-neutral-600">Every project starts with a question. Here&apos;s where the thinking happens.</p>
          </div>
          <a href="#projects" className="hand-underline mb-1 font-hand text-lg text-neutral-700">Back to the project overview</a>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <article key={study.number} className="case-study-card reveal" style={{ '--reveal-delay': `${index * 100}ms` } as React.CSSProperties}>
              <div className={`case-cover ${study.palette}`} aria-label={`${study.title} cover illustration`} role="img">
                <span className="case-cover-number">{study.number}</span>
                <span className="case-cover-spark" aria-hidden="true">✳</span>
                <p className="case-cover-note">{study.note}</p>
                <span className="case-cover-caption">FIELD NOTES · {study.number}</span>
              </div>
              <div className="case-study-copy">
                <p className="font-hand text-lg text-[#8a8580]">case file {study.number}</p>
                <h3 className="mt-1 font-serif-display text-2xl leading-snug text-neutral-900">{study.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{study.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${study.title} categories`}>
                  {study.tags.map((tag) => <li className="case-tag" key={tag}>{tag}</li>)}
                </ul>
                <div className="case-coming-soon mt-6">Case study coming soon</div>
                <details className="case-reserved mt-4">
                  <summary>Reserved for the full story</summary>
                  <ul className="mt-3 space-y-1.5 text-sm text-neutral-600">
                    {['Problem statement', 'Research & observations', 'Personas & requirements', 'User flows & design decisions', 'Technical architecture & implementation', 'Challenges, learnings & results'].map((topic) => <li key={topic}>— {topic}</li>)}
                  </ul>
                </details>
              </div>
            </article>
          ))}
        </div>
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
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="border border-[var(--line)] bg-white px-2.5 py-1 text-xs text-neutral-600">
            {tag}
          </li>
        ))}
      </ul>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-sm tracking-wide text-neutral-900 transition-colors hover:text-[#8a7a5c]"
      >
        {project.linkLabel}
        <svg width="16" height="16" viewBox="0 0 16 16" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
          <path d="M2 8 H13 M9 3 L14 8 L9 13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}

export function Resume() {
  return (
    <section id="resume" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>chapter seven — on paper</SectionLabel>
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
                <a href="#resume-leadership" className="resume-index-link resume-index-blue">Leadership</a>
                <a href="#resume-achievements" className="resume-index-link resume-index-yellow">Achievements</a>
              </nav>
              <p className="mt-10 rotate-[-4deg] font-hand text-base text-[#b6a88f]">printed with a little hope</p>
            </aside>

            <div className="resume-body px-7 py-8 md:px-12 md:py-10">
              <p className="mb-2 font-hand text-lg text-[#8a8580]">a quick index of the work, learning and people who shaped me</p>
              <ResumeBlock id="resume-education" title="Education" items={resume.education} accent="terracotta" />
              <ResumeBlock id="resume-experience" title="Internship" items={resume.experience} accent="orange" />
              <ResumeBlock id="resume-leadership" title="Leadership & Activities" items={resume.leadership} accent="blue" />
              <ResumeBlock id="resume-achievements" title="Achievements" items={resume.achievements} accent="yellow" last />
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

function ResumeBlock({
  id,
  title,
  items,
  accent,
  last,
}: {
  id: string;
  title: string;
  items: { title: string; place: string; detail: string }[];
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

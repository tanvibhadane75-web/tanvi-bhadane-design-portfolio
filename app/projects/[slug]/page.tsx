import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/content'

type PageProps = { params: Promise<{ slug: string }> }

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = findProject(slug)
  if (!project) return { title: 'Project not found — Tanvi Bhadane' }

  return {
    title: `${project.title} — Tanvi Bhadane`,
    description: project.description,
    openGraph: { title: `${project.title} — Tanvi Bhadane`, description: project.description, type: 'article' },
  }
}

export default async function ProjectCaseFile({ params }: PageProps) {
  const { slug } = await params
  const project = findProject(slug)
  if (!project) notFound()

  return (
    <main className="case-file grid-paper min-h-svh px-5 py-10 md:px-8 md:py-16">
      <article className="mx-auto max-w-5xl">
        <Link href="/#case-studies" className="font-hand text-xl text-[#766c62] transition-colors hover:text-[#9c604e]">← back to all case files</Link>
        <header className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a6c57]">case file {project.number} · {project.size} project</p>
            <h1 className="mt-4 font-serif-display text-4xl leading-tight text-[#34312f] md:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#625c55]">{project.description}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-[#e2d9ce] bg-[#f0e7db] p-3 shadow-[0_12px_24px_-20px_rgba(39,37,34,.5)]">
            <Image src={project.coverImage} alt={`${project.title} project screen`} fill priority sizes="(max-width: 768px) 100vw, 40vw" className="object-contain p-3" />
          </div>
        </header>

        <div className="mt-12 grid gap-8 border-y border-[#383838] py-8 md:grid-cols-12">
          <section className="md:col-span-7" aria-labelledby="project-context-title">
            <p className="font-hand text-xl text-[#8a6c57]">the project, in a nutshell</p>
            <h2 id="project-context-title" className="mt-2 font-serif-display text-2xl text-[#34312f]">Context &amp; intent</h2>
            <p className="mt-4 leading-relaxed text-[#625c55]">{project.description}</p>
          </section>
          <section className="md:col-span-5" aria-labelledby="project-role-title">
            <p className="font-hand text-xl text-[#8a6c57]">my part in it</p>
            <h2 id="project-role-title" className="mt-2 font-serif-display text-2xl text-[#34312f]">Contribution</h2>
            <p className="mt-4 leading-relaxed text-[#625c55]">{project.contribution}</p>
          </section>
        </div>

        <section className="mt-10" aria-labelledby="project-tools-title">
          <h2 id="project-tools-title" className="font-serif-display text-2xl text-[#34312f]">Tools &amp; focus</h2>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Project tools and focus areas">
            {project.tags.map((tag) => <li className="case-tag" key={tag}>{tag}</li>)}
          </ul>
        </section>

        {project.futureScope && (
          <section className="case-note mt-10 border-l-2 border-[#b77c64] bg-[#f3ece2] px-5 py-5" aria-labelledby="future-scope-title">
            <p className="font-hand text-xl text-[#8a6c57]">looking ahead</p>
            <h2 id="future-scope-title" className="mt-1 font-serif-display text-xl text-[#34312f]">Future scope</h2>
            <p className="mt-2 leading-relaxed text-[#625c55]">{project.futureScope}</p>
          </section>
        )}

        <aside className="mt-12 border-t border-[#383838] pt-6" aria-label="Case study source note">
          <p className="max-w-3xl text-sm leading-relaxed text-[#766c62]">This case file reflects the project summary, contribution and visuals present in the portfolio. Detailed research notes, user flows, testing records and measured outcomes were not included in the source materials, so they are not represented here.</p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 border-b border-[#34312f] pb-1 text-sm text-[#34312f] hover:text-[#9c604e]">
              {project.linkLabel ?? 'Open project'} <span aria-hidden="true">↗</span>
            </a>
          )}
        </aside>
      </article>
    </main>
  )
}

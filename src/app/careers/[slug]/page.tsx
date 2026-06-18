import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Reveal from "@/components/ui/Reveal";
import ApplyModal from "@/components/careers/ApplyModal";
import { jobs } from "@/data/site";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  return { title: job ? job.title : "Career", description: job?.summary };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();

  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="container-x">
        <nav className="mb-8 flex items-center gap-2 text-xs text-mist">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span className="text-faint">/</span>
          <Link href="/careers" className="hover:text-gold">Careers</Link>
          <span className="text-faint">/</span>
          <span className="text-silver">{job.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* main */}
          <Reveal>
            <div>
              <span className="eyebrow">{job.department}</span>
              <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">{job.title}</h1>
              <div className="mt-4 flex flex-wrap gap-2 text-[0.7rem] uppercase tracking-wider">
                <span className="rounded-full [background-color:var(--ui-surface-md)] px-2.5 py-1 text-mist">{job.location}</span>
                <span className="rounded-full [background-color:var(--ui-surface-md)] px-2.5 py-1 text-mist">{job.type}</span>
              </div>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-silver/90">{job.summary}</p>

              <div className="mt-10">
                <h2 className="font-serif text-2xl">What you&apos;ll do</h2>
                <ul className="mt-5 space-y-3">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-mist">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="font-serif text-2xl">What you&apos;ll bring</h2>
                <ul className="mt-5 space-y-3">
                  {job.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-mist">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon" />{r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 lg:hidden">
                <ApplyModal jobTitle={job.title} />
              </div>
            </div>
          </Reveal>

          {/* sidebar */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-7">
                <div className="text-[0.7rem] uppercase tracking-wider text-gold">Role at a glance</div>
                <dl className="mt-5 space-y-4 text-sm">
                  {[
                    ["Department", job.department],
                    ["Location", job.location],
                    ["Type", job.type],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4 border-b [border-color:var(--ui-border)] pb-3">
                      <dt className="text-mist">{k}</dt>
                      <dd className="text-right text-silver">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-7 hidden lg:block">
                  <ApplyModal jobTitle={job.title} />
                </div>
                <Link href="/careers" className="mt-4 block text-center text-sm text-mist transition-colors hover:text-gold">
                  ← All roles
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

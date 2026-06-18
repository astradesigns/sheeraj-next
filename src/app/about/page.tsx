import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import PersonCard from "@/components/ui/PersonCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { aboutHighlights, company, media, stats, team } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Two identities, one standard of building — the people and principles behind Sheeraj Projects.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
        title={
          <>
            Two identities. <span className="text-gold-gradient italic">One standard</span> of building.
          </>
        }
        subtitle={`Since ${company.established}, we have engineered the roads, canals and bridges that connect India — and today we bring that same precision to crafting destinations that inspire it.`}
        image={media.aboutImage}
      >
        <MagneticButton href="/projects">View our projects</MagneticButton>
        <MagneticButton href="/chairman" variant="ghost">Message from the Chairman</MagneticButton>
      </PageHero>

      {/* story + stats */}
      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border [border-color:var(--ui-border-md)]">
              <Image src={media.heroImage} alt="Sheeraj engineering" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title={<>Built to <span className="text-gold-gradient">outlast</span> us.</>}
              intro="What began with a single kilometre of highway has grown into a multi-disciplinary EPC builder — and a hospitality developer shaping the Andaman islands. The discipline never changed: build it to a standard, not a deadline."
            />
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {aboutHighlights.map((h, i) => (
                <Reveal key={h} delay={i * 0.06}>
                  <li className="flex items-start gap-3 text-sm text-mist">
                    <span className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gold/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    </span>
                    {h}
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border [border-color:var(--ui-border)] [background-color:var(--ui-surface-sm)] sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="px-5 py-6 [background-color:var(--ui-surface-xs)]">
                  <div className="font-serif text-3xl text-gold-gradient">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-[0.72rem] uppercase leading-snug tracking-wider text-mist">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* leadership */}
      <section className="bg-ink py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Leadership"
            title={<>The people behind the <span className="text-gold-gradient">promise.</span></>}
            intro="Engineers, operators and stewards who hold every project to the same exacting standard."
            align="center"
            className="mb-14"
          />

          <Reveal>
            <PersonCard person={team.chairman} featured />
          </Reveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.directors.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.07}>
                <PersonCard person={d} />
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid lg:grid-cols-3">
            <Reveal className="lg:col-start-2">
              <PersonCard person={team.ca} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-x">
          <div className="glass relative overflow-hidden rounded-[2rem] px-8 py-14 text-center md:py-20">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
            <h2 className="relative font-serif text-3xl tracking-tight md:text-5xl">
              Let&apos;s build something <span className="text-gold-gradient italic">that lasts.</span>
            </h2>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact">Get in touch</MagneticButton>
              <Link href="/careers" className="btn btn-ghost">Explore careers</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";

import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import PersonCard from "@/components/ui/PersonCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { chairmanMessage, team } from "@/data/site";

export const metadata: Metadata = {
  title: "Message from the Chairman",
  description: "A note from our Founder & Chairman on what it means to build for the long term.",
};

export default function ChairmanPage() {
  const c = chairmanMessage;
  return (
    <>
      <PageHero
        eyebrow="From the Founder"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Chairman", href: "/chairman" }]}
        title={<>A message from the <span className="text-gold-gradient italic">Chairman.</span></>}
      />

      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* photo card (sticky) */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PersonCard person={team.chairman} />
          </div>

          {/* message */}
          <Reveal>
            <article className="max-w-2xl">
              <p className="font-serif text-2xl italic leading-snug text-gold-gradient">
                “{team.chairman.message}”
              </p>
              <div className="hairline my-9" />
              <div className="space-y-6 text-lg leading-relaxed text-mist">
                {c.paragraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-gold" : ""}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-10">
                <div className="font-serif text-3xl italic text-silver">{c.signature}</div>
                <div className="mt-1 text-sm uppercase tracking-[0.2em] text-mist">{c.role}</div>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <MagneticButton href="/about">Meet the leadership</MagneticButton>
                <MagneticButton href="/contact" variant="ghost">Contact us</MagneticButton>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}

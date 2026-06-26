"use client";

import Image from "next/image";
import TiltCard from "./TiltCard";
import type { Person } from "@/data/site";

/**
 * Standalone leadership card that mirrors the director card's styling
 * (glass panel, tilt, portrait + message split, gold divider) but lets the
 * caller dial the height down via `minH` / `portraitH` / text-scale props.
 *
 * The message uses `text-silver`, the same theme-aware token the directors use,
 * so it stays dark (readable) in light mode and light in dark mode.
 */
export default function LeadershipCard({
  person,
  reverse = false,
  pad = "p-5 md:p-8",
  nameClass = "text-2xl md:text-3xl",
  msgClass = "text-base md:text-lg",
  portraitH = "md:h-72",
  minH = "md:min-h-[580px] xl:min-h-[440px]",
}: {
  person: Person;
  reverse?: boolean;
  /** Card padding. */
  pad?: string;
  /** Name type scale. */
  nameClass?: string;
  /** Message type scale. */
  msgClass?: string;
  /** Portrait height on md+ (the card's main height driver). */
  portraitH?: string;
  /** Minimum card height floor on md+. */
  minH?: string;
}) {
  return (
    <TiltCard max={4} className="rounded-[1.75rem]">
      <div className={`glass overflow-hidden rounded-[1.75rem] ${pad} md:flex md:flex-col ${minH}`}>
        <div
          className={`grid gap-6 md:gap-10 md:grow ${
            reverse ? "md:grid-cols-[0.36fr_1.64fr]" : "md:grid-cols-[1.64fr_0.36fr]"
          }`}
        >
          {/* message */}
          <div className={`order-2 flex flex-col justify-center ${reverse ? "md:order-2" : "md:order-1"}`}>
            <span className="eyebrow">{person.role}</span>
            <h3 className={`mt-3 font-serif tracking-tight ${nameClass}`}>{person.name}</h3>
            {person.qualification && (
              <div className="mt-2 flex flex-wrap gap-2">
                {person.qualification.split(",").map((q) => (
                  <span
                    key={q}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/8 px-3 py-0.5 text-[0.68rem] uppercase tracking-widest text-gold/80"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    {q.trim()}
                  </span>
                ))}
              </div>
            )}
            <p className={`mt-5 font-serif italic leading-relaxed text-silver md:leading-loose ${msgClass}`}>
              &ldquo;{person.message}&rdquo;
            </p>
            <div className="mt-6 h-px w-16 bg-linear-to-r from-gold to-transparent" />
          </div>

          {/* contained portrait */}
          <div className={`order-1 md:self-start ${reverse ? "md:order-1" : "md:order-2"}`}>
            <div
              className={`relative aspect-3/4 md:aspect-auto ${portraitH} overflow-hidden rounded-2xl border border-(--ui-border-md)`}
            >
              <Image
                src={person.photo}
                alt={person.name}
                fill
                sizes="(max-width:768px) 100vw, 22rem"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-linear-to-t from-base/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

"use client";

import Image from "next/image";
import TiltCard from "./TiltCard";
import type { Person } from "@/data/site";

const SIZES = {
  lg: {
    pad: "p-6 md:p-10",
    colsDefault: "md:grid-cols-[1.6fr_0.4fr]",
    colsReverse: "md:grid-cols-[0.4fr_1.6fr]",
    portrait: "aspect-[3/4]",
    name: "text-3xl md:text-5xl",
    msg: "text-lg md:text-xl",
    msgMt: "mt-5",
    divider: "mt-6 w-16",
    cardFlex: "",
    gridGrow: "",
  },
  md: {
    pad: "p-5 md:p-8",
    colsDefault: "md:grid-cols-[1.64fr_0.36fr]",
    colsReverse: "md:grid-cols-[0.36fr_1.64fr]",
    portrait: "aspect-[3/4]",
    name: "text-2xl md:text-3xl",
    msg: "text-base md:text-lg",
    msgMt: "mt-5",
    divider: "mt-6 w-16",
    cardFlex: "md:flex md:flex-col md:min-h-[580px] xl:min-h-[440px]",
    gridGrow: "md:grow",
  },
  sm: {
    pad: "p-4 md:p-6",
    colsDefault: "md:grid-cols-[1.64fr_0.36fr]",
    colsReverse: "md:grid-cols-[0.36fr_1.64fr]",
    portrait: "aspect-[3/4] md:aspect-auto md:h-44",
    name: "text-xl md:text-2xl",
    msg: "text-sm md:text-base",
    msgMt: "mt-4",
    divider: "mt-4 w-12",
    cardFlex: "",
    gridGrow: "",
  },
  xs: {
    pad: "p-3 md:p-4",
    colsDefault: "md:grid-cols-[1.64fr_0.36fr]",
    colsReverse: "md:grid-cols-[0.36fr_1.64fr]",
    portrait: "aspect-[3/4] md:aspect-auto md:h-28",
    name: "text-base md:text-lg",
    msg: "text-xs md:text-sm",
    msgMt: "mt-3",
    divider: "mt-3 w-10",
    cardFlex: "",
    gridGrow: "",
  },
} as const;

export default function PersonCard({
  person,
  featured = false,
  reverse = false,
  size = "lg",
  nameClassName,
  messageClassName,
}: {
  person: Person;
  featured?: boolean;
  reverse?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  /** Override the name color (e.g. light-theme treatments on the About page). */
  nameClassName?: string;
  /** Override the message color; replaces the default `text-silver`. */
  messageClassName?: string;
}) {
  if (featured) {
    const s = SIZES[size];
    const isMd = size === "md";
    return (
      <TiltCard max={4} className="rounded-[1.75rem]">
        <div className={`glass overflow-hidden rounded-[1.75rem] ${s.pad} ${s.cardFlex}`}>
          <div
            className={`grid gap-6 md:gap-10 ${reverse ? s.colsReverse : s.colsDefault} ${s.gridGrow}`}
          >
            {/* message */}
            <div
              className={`order-2 flex flex-col justify-center ${reverse ? "md:order-2" : "md:order-1"}`}
            >
              <span className="eyebrow">{person.role}</span>
              <h3 className={`mt-3 font-serif tracking-tight ${s.name}${nameClassName ? ` ${nameClassName}` : ""}`}>{person.name}</h3>
              {person.qualification && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {person.qualification.split(",").map((q) => (
                    <span key={q} className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/8 px-3 py-0.5 text-[0.68rem] uppercase tracking-widest text-gold/80">
                      <span className="h-1 w-1 rounded-full bg-gold/60" />
                      {q.trim()}
                    </span>
                  ))}
                </div>
              )}
              <p className={`${s.msgMt} font-serif italic leading-relaxed ${messageClassName ?? "text-silver"} md:leading-loose ${s.msg}`}>
                &ldquo;{person.message}&rdquo;
              </p>
              <div className={`${s.divider} h-px bg-linear-to-r from-gold to-transparent`} />
            </div>

            {/* contained portrait */}
            <div className={`order-1 md:self-start ${reverse ? "md:order-1" : "md:order-2"}`}>
              <div className={`relative ${isMd ? "aspect-3/4 md:aspect-auto md:h-72" : s.portrait} overflow-hidden rounded-2xl border border-(--ui-border-md)`}>
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width:768px) 100vw, 22rem"
                  className={size === "xs" ? "object-contain object-center" : "object-cover object-top"}
                />
                <div className="absolute inset-0 bg-linear-to-t from-base/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    );
  }

  return (
    <TiltCard max={7} className="h-full rounded-2xl">
      <div className="group h-full overflow-hidden rounded-2xl border border-(--ui-border) bg-(--ui-surface-xs)">
        <div className="relative aspect-4/5 overflow-hidden">
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-base via-base/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="text-[0.68rem] uppercase tracking-[0.2em] text-gold">{person.role}</div>
            <h3 className="mt-1 font-serif text-xl tracking-tight">{person.name}</h3>
          </div>
        </div>
        <p className="p-5 text-sm leading-relaxed text-mist">&ldquo;{person.message}&rdquo;</p>
      </div>
    </TiltCard>
  );
}

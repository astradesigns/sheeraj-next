"use client";

import Image from "next/image";
import TiltCard from "./TiltCard";
import type { Person } from "@/data/site";

export default function PersonCard({
  person,
  featured = false,
}: {
  person: Person;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <TiltCard max={4} className="rounded-[1.75rem]">
        <div className="glass grid items-stretch overflow-hidden rounded-[1.75rem] md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[20rem] overflow-hidden">
            <Image
              src={person.photo}
              alt={person.name}
              fill
              sizes="(max-width:768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base/60 to-transparent md:bg-gradient-to-r" />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <span className="eyebrow">{person.role}</span>
            <h3 className="mt-4 font-serif text-3xl tracking-tight md:text-4xl">{person.name}</h3>
            <p className="mt-5 font-serif text-lg italic leading-relaxed text-mist">
              “{person.message}”
            </p>
            <div className="mt-6 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
          </div>
        </div>
      </TiltCard>
    );
  }

  return (
    <TiltCard max={7} className="h-full rounded-2xl">
      <div className="group h-full overflow-hidden rounded-2xl border [border-color:var(--ui-border)] [background-color:var(--ui-surface-xs)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="text-[0.68rem] uppercase tracking-[0.2em] text-gold">{person.role}</div>
            <h3 className="mt-1 font-serif text-xl tracking-tight">{person.name}</h3>
          </div>
        </div>
        <p className="p-5 text-sm leading-relaxed text-mist">“{person.message}”</p>
      </div>
    </TiltCard>
  );
}

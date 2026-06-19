"use client";

import Image from "next/image";
import TiltCard from "./TiltCard";
import type { Person } from "@/data/site";

const SIZES = {
  lg: { minH: "min-h-[24rem]", pad: "p-8 md:p-12", name: "text-3xl md:text-5xl", msg: "text-lg md:text-xl" },
  md: { minH: "min-h-[18rem]", pad: "p-7 md:p-9", name: "text-2xl md:text-3xl", msg: "text-base md:text-lg" },
  sm: { minH: "min-h-[13rem]", pad: "p-6 md:p-7", name: "text-xl md:text-2xl", msg: "text-sm md:text-base" },
} as const;

export default function PersonCard({
  person,
  featured = false,
  reverse = false,
  size = "lg",
}: {
  person: Person;
  featured?: boolean;
  reverse?: boolean;
  size?: "lg" | "md" | "sm";
}) {
  if (featured) {
    const s = SIZES[size];
    return (
      <TiltCard max={4} className="rounded-[1.75rem]">
        <div
          className={`glass grid items-stretch overflow-hidden rounded-[1.75rem] ${
            reverse ? "md:grid-cols-[1.1fr_0.9fr]" : "md:grid-cols-[0.9fr_1.1fr]"
          }`}
        >
          <div
            className={`relative overflow-hidden ${s.minH} ${reverse ? "md:order-2" : ""}`}
          >
            <Image
              src={person.photo}
              alt={person.name}
              fill
              sizes="(max-width:768px) 100vw, 40vw"
              className="object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-base/60 to-transparent ${
                reverse ? "md:bg-gradient-to-l" : "md:bg-gradient-to-r"
              }`}
            />
          </div>
          <div
            className={`flex flex-col justify-center ${s.pad} ${reverse ? "md:order-1" : ""}`}
          >
            <span className="eyebrow">{person.role}</span>
            <h3 className={`mt-4 font-serif tracking-tight ${s.name}`}>{person.name}</h3>
            <p className={`mt-5 font-serif italic leading-relaxed text-mist ${s.msg}`}>
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

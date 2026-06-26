"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import HospHeading from "./HospHeading";
import Reveal from "@/components/ui/Reveal";
import { LeafCluster, Hibiscus } from "./tropical";
import { hospitalityPage } from "@/data/site";

const DURATION = 4500; // ms per slide

export default function Architecture() {
  const a = hospitalityPage.architecture;
  const [active, setActive] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance; resets whenever timerKey changes or paused toggles
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive(p => (p + 1) % a.items.length), DURATION);
    return () => clearInterval(id);
  }, [timerKey, paused, a.items.length]);

  const pick = (i: number) => {
    setActive(i);
    setTimerKey(k => k + 1);
  };

  const item = a.items[active];

  return (
    <section className="relative overflow-hidden bg-shell py-20 text-ocean-deep sm:py-24 md:py-36">
      <LeafCluster className="absolute -left-8 top-4 z-0 text-[#0e463f]/10" />
      <Hibiscus className="absolute right-[8%] top-24 z-0 h-10 w-10 text-coral/50 anim-bob" />
      <Hibiscus className="absolute right-[14%] top-40 z-0 h-7 w-7 text-lagoon/40" />

      <div className="container-x relative z-10">
        <HospHeading eyebrow={a.eyebrow} title={a.title} intro={a.intro} onLight className="mb-10 sm:mb-12 md:mb-16" />

        {/* ── Mobile: stacked cards ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {a.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="relative h-64 overflow-hidden rounded-2xl bg-ocean-deep">
                <Image src={it.image} alt={it.title} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-[#051e25]/92 via-[#051e25]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-mono text-[0.65rem] tracking-[0.22em] text-lagoon">0{i + 1}</span>
                  <h3 className="mt-1 font-serif text-xl text-foam">{it.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foam/65">{it.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Desktop: showcase ── */}
        <Reveal delay={0.05} className="hidden md:block">
          <div className="overflow-hidden rounded-4xl shadow-[0_40px_80px_-25px_rgba(6,38,47,0.45)] md:grid md:h-135 md:grid-cols-[5fr_7fr]">

            {/* LEFT — item list */}
            <div
              className="flex flex-col justify-center gap-0 bg-[#07202a] px-9 py-10"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {a.items.map((it, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={it.title}
                    type="button"
                    onClick={() => pick(i)}
                    onMouseEnter={() => { if (paused) pick(i); }}
                    className={`group border-b border-white/6 py-7 text-left last:border-b-0 transition-opacity duration-300 ${!isActive ? "opacity-40 hover:opacity-70" : ""}`}
                  >
                    <div className="flex items-start gap-5">
                      {/* Number */}
                      <span className={`mt-0.5 font-mono text-sm font-medium transition-colors duration-300 ${isActive ? "text-lagoon" : "text-foam/60"}`}>
                        0{i + 1}
                      </span>

                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h3 className="font-serif text-xl leading-snug text-foam">
                          {it.title}
                        </h3>

                        {/* Description */}
                        <div
                          style={{
                            maxHeight: isActive ? "6rem" : "0px",
                            overflow: "hidden",
                            opacity: isActive ? 1 : 0,
                            transition: isActive
                              ? "max-height 0.5s ease, opacity 0.4s ease 0.1s"
                              : "max-height 0.3s ease, opacity 0.15s ease",
                          }}
                        >
                          <p className="mt-2 text-sm leading-relaxed text-foam/55">
                            {it.blurb}
                          </p>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4 h-px w-full bg-white/10">
                          {isActive && (
                            <motion.div
                              key={`bar-${active}-${timerKey}`}
                              className="h-full bg-lagoon"
                              initial={{ width: "0%" }}
                              animate={{ width: paused ? undefined : "100%" }}
                              transition={{ duration: DURATION / 1000, ease: "linear" }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* RIGHT — layered images, always in DOM, crossfade between them */}
            <div className="relative overflow-hidden bg-[#07202a]">
              {a.items.map((it, i) => (
                <motion.div
                  key={it.title}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                  style={{ zIndex: active === i ? 1 : 0 }}
                >
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    sizes="60vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </motion.div>
              ))}

              {/* Gradients sit above all images */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-[#07202a]/80 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-[#07202a]/30 to-transparent" />

              {/* Caption animates independently */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="mb-3 h-0.5 w-10 rounded-full bg-lagoon" />
                    <p className="font-serif text-2xl text-foam">{item.title}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

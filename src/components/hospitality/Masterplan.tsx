"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HospHeading from "./HospHeading";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { LeafCluster, PalmFrond } from "./tropical";
import { hospitalityPage } from "@/data/site";

export default function Masterplan() {
  const m = hospitalityPage.masterplan;
  const [active, setActive] = useState(0);
  const zone = m.zones[active];

  return (
    <section
      id="masterplan"
      className="relative scroll-mt-24 overflow-hidden bg-linear-to-b from-ocean-deep via-[#072e38] to-ocean-deep py-20 md:py-28 lg:py-36"
    >
      <LeafCluster flip className="absolute -right-6 top-6 z-0 text-lagoon/10" />
      <PalmFrond className="absolute -left-6 bottom-0 z-0 h-56 w-36 rotate-[18deg] text-aqua/10 anim-sway-soft" />

      <div className="container-x relative z-10">
        <HospHeading eyebrow={m.eyebrow} title={m.title} intro={m.intro} align="center" className="mb-16" />

        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          {/* interactive island map */}
          <Reveal>
            {/* outer wrapper: sets aspect ratio, no clipping so markers bleed freely */}
            <div className="relative aspect-[4/3]">

              {/* image + reef SVG — clipped for rounded corners independently */}
              <div
                className="absolute inset-0 overflow-hidden rounded-4xl border border-aqua/15"
                style={{
                  backgroundImage: "url('/images/oneIsland.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* subtle reef overlay */}
                <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
                  <defs>
                    <radialGradient id="mp-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0" stopColor="#5fd3c4" stopOpacity="0.15" />
                      <stop offset="1" stopColor="#5fd3c4" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="400" cy="320" rx="320" ry="220" fill="url(#mp-glow)" />
                  <ellipse cx="400" cy="320" rx="320" ry="220" stroke="rgba(95,211,196,0.22)" strokeWidth="1.5" strokeDasharray="6 10" />
                  <ellipse cx="400" cy="320" rx="250" ry="165" fill="rgba(52,185,171,0.08)" />
                  <path d="M210 470c120-30 230-120 360-150" stroke="rgba(255,222,150,0.22)" strokeWidth="1.5" strokeDasharray="3 8" />
                </svg>

                {/* dark gradient vignette for depth */}
                <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-ocean-deep/40" />
              </div>

              {/* markers layer — sits on top, NOT inside overflow-hidden */}
              {m.zones.map((z, i) => {
                const isActive = active === i;
                const tipLeft = z.x >= 55;

                return (
                  <button
                    key={z.name}
                    onClick={() => setActive(i)}
                    style={{ left: `${z.x}%`, top: `${z.y}%` }}
                    className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    aria-label={z.name}
                  >
                    {/* double ripple rings — only when active */}
                    {isActive && (
                      <>
                        <span
                          className="absolute inset-0 -m-5 animate-ping rounded-full bg-aqua/20"
                          style={{ animationDuration: "1.5s" }}
                        />
                        <span
                          className="absolute inset-0 -m-2.5 animate-ping rounded-full bg-aqua/35"
                          style={{ animationDuration: "1.5s", animationDelay: "0.4s" }}
                        />
                      </>
                    )}

                    {/* static soft halo */}
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        isActive
                          ? "-m-3 bg-aqua/15 ring-1 ring-aqua/30"
                          : "-m-1.5 bg-transparent group-hover:bg-aqua/10"
                      }`}
                    />

                    {/* numbered pin */}
                    <span
                      className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 text-[9px] font-bold transition-all duration-300 ${
                        isActive
                          ? "scale-110 border-aqua bg-aqua text-ocean-deep shadow-[0_0_22px_6px_rgba(95,211,196,0.65),0_0_6px_2px_rgba(95,211,196,0.9)]"
                          : "border-aqua/45 bg-ink/65 text-foam/80 backdrop-blur-sm group-hover:scale-105 group-hover:border-aqua group-hover:bg-aqua/20 group-hover:shadow-[0_0_14px_3px_rgba(95,211,196,0.4)]"
                      }`}
                    >
                      {i + 1}
                    </span>

                    {/* label callout */}
                    <span
                      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border px-2 py-0.5 text-[9px] font-semibold tracking-wide backdrop-blur-md transition-all duration-200 ${
                        tipLeft ? "right-full mr-3" : "left-full ml-3"
                      } ${
                        isActive
                          ? "scale-100 border-aqua/40 bg-aqua/15 text-aqua opacity-100"
                          : "scale-95 border-foam/10 bg-ink/75 text-foam/60 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    >
                      {z.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* detail card + zone pills */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-aqua/15 bg-white/[0.03] p-7"
              >
                <span className="text-aqua">
                  <Icon name={zone.icon} className="h-8 w-8" />
                </span>
                <div className="mt-4 font-display text-xs tracking-widest text-foam/70">
                  ZONE {String(active + 1).padStart(2, "0")} / {String(m.zones.length).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-serif text-3xl text-foam">{zone.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foam/70">{zone.blurb}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap gap-2">
              {m.zones.map((z, i) => (
                <button
                  key={z.name}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs transition-all duration-200 ${
                    active === i
                      ? "border-aqua/60 bg-aqua/10 text-aqua shadow-[0_0_10px_rgba(95,211,196,0.2)]"
                      : "border-foam/15 text-foam/75 hover:border-aqua/40 hover:text-foam"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold transition-all duration-200 ${
                      active === i ? "bg-aqua text-ocean-deep" : "bg-foam/10 text-foam/50"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {z.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

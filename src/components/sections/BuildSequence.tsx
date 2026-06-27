"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { buildSequence } from "@/data/site";

const PYLONS = [150, 300, 450];

// oblique-projection depth vector (everything "behind" is shifted by this)
const D = { x: 36, y: -22 };

const ob = { transformBox: "fill-box" as const, transformOrigin: "bottom" };
const ol = { transformBox: "fill-box" as const, transformOrigin: "left" };
const oc = { transformBox: "fill-box" as const, transformOrigin: "center" };

type Fills = { top: string; front: string; side: string };

/* a 3D box drawn in oblique projection: side, top, then front faces */
function boxFaces(cx: number, top: number, bot: number, hw: number, f: Fills) {
  const l = cx - hw;
  const r = cx + hw;
  return (
    <>
      {/* right side face (depth) */}
      <polygon
        points={`${r},${top} ${r + D.x},${top + D.y} ${r + D.x},${bot + D.y} ${r},${bot}`}
        fill={f.side}
      />
      {/* top face */}
      <polygon
        points={`${l},${top} ${r},${top} ${r + D.x},${top + D.y} ${l + D.x},${top + D.y}`}
        fill={f.top}
      />
      {/* front face */}
      <polygon points={`${l},${top} ${r},${top} ${r},${bot} ${l},${bot}`} fill={f.front} />
    </>
  );
}

const GOLD: Fills = { top: "#f7e3a0", front: "url(#bs-gold)", side: "#7e5f1d" };
const CONCRETE: Fills = { top: "#d4d2de", front: "#9a98a8", side: "#615f73" };

export default function BuildSequence() {
  const wrap = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      if (reduce) {
        gsap.set([".bs-pylon", ".bs-deck"], { scaleX: 1, scaleY: 1, opacity: 1 });
        gsap.set([".bs-dash"], { opacity: 1, scaleX: 1 });
        gsap.set([".bs-glow", ".bs-ambient"], { opacity: 1 });
        gsap.set(".bs-lamp", { scaleY: 1, opacity: 1 });
        gsap.set(".bs-light", { opacity: 1, scale: 1 });
        gsap.set(".bs-beamfill", { scaleY: 1 });
        gsap.set(q(".bs-stage")[buildSequence.length - 1], { opacity: 1, y: 0 });
        return;
      }

      // hide everything before the first scroll frame so nothing flashes on load
      gsap.set(".bs-pylon", { scaleY: 0 });
      gsap.set(".bs-deck", { scaleX: 0 });
      gsap.set(".bs-dash", { opacity: 0, scaleX: 0 });
      gsap.set([".bs-glow", ".bs-ambient"], { opacity: 0 });
      gsap.set(".bs-lamp", { scaleY: 0, opacity: 0 });
      gsap.set(".bs-light", { opacity: 0, scale: 0 });

      // ── ambient life (independent of scroll) ──
      gsap.fromTo(
        ".bs-ember",
        { y: 0, opacity: 0.85 },
        { y: -20, opacity: 0, duration: 2.6, ease: "sine.out", repeat: -1, stagger: { each: 0.5, from: "random" } }
      );

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      tl.fromTo(".bs-beamfill", { scaleY: 0 }, { scaleY: 1, duration: 4 }, 0);

      // 01 — piers spring up from the ground
      tl.fromTo(
        ".bs-pylon",
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, stagger: 0.18, duration: 1, ease: "back.out(1.3)" },
        0.2
      );

      // 02 — deck swooshes across
      tl.fromTo(".bs-deck", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out" }, 1.2);

      // 03 — road markings pop in
      tl.fromTo(
        ".bs-dash",
        { opacity: 0, scaleX: 0, y: -6 },
        { opacity: 1, scaleX: 1, y: 0, stagger: 0.07, duration: 0.8, ease: "back.out(2)" },
        2.2
      );

      // 04 — it comes alive: glow, lamps, lights, ambient life
      tl.fromTo(".bs-glow", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 3.0);
      tl.fromTo(
        ".bs-lamp",
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, stagger: 0.12, duration: 0.6, ease: "back.out(1.6)" },
        3.05
      );
      tl.fromTo(".bs-ambient", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 3.2);
      tl.fromTo(
        ".bs-light",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: "back.out(2.6)" },
        3.25
      );
      const stages = q(".bs-stage");
      stages.forEach((el: Element, i: number) => {
        tl.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, i * 1);
        if (i < stages.length - 1)
          tl.to(el, { opacity: 0, y: -28, duration: 0.4, ease: "power2.in" }, i * 1 + 0.7);
      });
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      id="process"
      className="relative bg-ink"
      style={{ height: "360vh" }}
    >
      <div ref={pin} className="sticky top-0 flex h-svh flex-col overflow-hidden">
        {/* heading */}
        <div className="container-x pt-16 sm:pt-20 lg:pt-24">
          <span className="eyebrow">The Process</span>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            From blueprint{" "}
            <span className="text-gold-gradient italic">to landmark.</span>
          </h2>
        </div>

        {/* scene */}
        <div className="relative flex flex-1 items-center">
          <div className="container-x grid w-full items-center gap-6 sm:gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            {/* stage readout */}
            <div className="relative h-40 sm:h-44">
              {buildSequence.map((s) => (
                <div key={s.no} className="bs-stage absolute inset-0 opacity-0">
                  <div className="font-serif text-6xl text-(--ui-ghost) sm:text-7xl">{s.no}</div>
                  <h3 className="-mt-6 font-serif text-2xl text-silver sm:-mt-8 sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            {/* SVG — oblique 3D bridge */}
            <div className="relative">
              <svg viewBox="0 0 600 340" className="w-full overflow-visible" fill="none" aria-hidden>
                <defs>
                  <radialGradient id="bs-warm">
                    <stop offset="0" stopColor="#ffcf8a" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#ffcf8a" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="bs-gold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f2d886" />
                    <stop offset="0.5" stopColor="#d9b757" />
                    <stop offset="1" stopColor="#9c7c22" />
                  </linearGradient>
                  <linearGradient id="bs-sheen" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="bs-orb">
                    <stop offset="0" stopColor="#fff6df" />
                    <stop offset="0.5" stopColor="#ffd98a" />
                    <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
                  </radialGradient>
                  <filter id="bs-bloom" x="-120%" y="-120%" width="340%" height="340%">
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* soft bokeh for depth */}
                <circle cx="95" cy="70" r="42" fill="url(#bs-orb)" opacity="0.07" />
                <circle cx="510" cy="92" r="54" fill="url(#bs-orb)" opacity="0.06" />
                <circle cx="320" cy="44" r="30" fill="url(#bs-orb)" opacity="0.08" />
                <circle cx="545" cy="150" r="24" fill="url(#bs-orb)" opacity="0.07" />

                {/* warm glow — stage 4 */}
                <ellipse className="bs-glow" cx="310" cy="120" rx="250" ry="120" fill="url(#bs-warm)" opacity="0" style={oc} />

                {/* ground line */}
                <line x1="20" y1="300" x2="580" y2="300" stroke="#c6bfb0" strokeWidth="1.5" opacity="0.5" />

                {/* ── Piers — each rises as one unit (footing + shaft + cap) ── */}
                {PYLONS.map((x) => (
                  <g key={x} className="bs-pylon" style={ob}>
                    {/* concrete footing */}
                    {boxFaces(x, 286, 300, 20, CONCRETE)}
                    {/* gold shaft */}
                    {boxFaces(x, 204, 288, 13, GOLD)}
                    {/* gold pier cap / crosshead */}
                    {boxFaces(x, 190, 205, 24, GOLD)}
                    {/* specular highlight down the shaft */}
                    <rect x={x - 11} y="206" width="2.6" height="80" rx="1.3" fill="#fff" opacity="0.18" />
                  </g>
                ))}

                {/* ── Deck (3D slab) + lane edge lines, spans left→right ── */}
                <g className="bs-deck" style={ol}>
                  {boxFaces(300, 178, 198, 212, CONCRETE)}
                  {/* glossy sheen across the road surface */}
                  <polygon points="88,178 512,178 548,156 124,156" fill="url(#bs-sheen)" opacity="0.5" />
                  {/* front lane edge line */}
                  <polygon points="100,176 500,176 503,174 103,174" fill="#fff" opacity="0.35" />
                  {/* back lane edge line */}
                  <polygon points="134,158 538,158 535,156 131,156" fill="#fff" opacity="0.3" />
                  {/* front curb shadow */}
                  <polygon points="88,196 512,196 512,198 88,198" fill="#3a3848" opacity="0.7" />
                  {/* gold trim along the front top edge */}
                  <rect x="88" y="176.5" width="424" height="2" rx="1" fill="url(#bs-gold)" opacity="0.6" />
                  {/* far balustrade — gold top rail + slim posts */}
                  <rect x="124" y="149.5" width="424" height="2" rx="1" fill="url(#bs-gold)" opacity="0.85" />
                  {Array.from({ length: 15 }).map((_, i) => {
                    const px = 134 + i * 28;
                    return <rect key={`bal-${px}`} x={px} y="151" width="1.4" height="5.5" fill="#9c7c22" opacity="0.5" />;
                  })}
                  {/* near balustrade (front edge) — mirrors the far rail */}
                  <rect x="88" y="170.5" width="424" height="2" rx="1" fill="url(#bs-gold)" opacity="0.85" />
                  {Array.from({ length: 15 }).map((_, i) => {
                    const px = 98 + i * 28;
                    return <rect key={`balf-${px}`} x={px} y="172" width="1.4" height="6" fill="#9c7c22" opacity="0.5" />;
                  })}
                </g>

                {/* ── Centre lane dashes (stage 3) — parallelograms on the tilted road ── */}
                {Array.from({ length: 9 }).map((_, i) => {
                  const x = 122 + i * 42;
                  return (
                    <polygon
                      key={i}
                      className="bs-dash"
                      points={`${x},168 ${x + 18},168 ${x + 23},164.8 ${x + 5},164.8`}
                      fill="#ffd060"
                      opacity="0.85"
                      style={ol}
                    />
                  );
                })}

                {/* ── Boulevard lamps along the far edge (drawn before the car) ── */}
                {PYLONS.map((x) => {
                  const bx = x + 30; // stand on the far edge, behind the road
                  const baseY = 157;
                  const headY = 116;
                  return (
                    <g key={`lamp-${x}`}>
                      <g className="bs-lamp" style={ob}>
                        {/* foot */}
                        <rect x={bx - 4} y={baseY - 2} width="8" height="4" rx="1.5" fill="#7e5f1d" />
                        {/* slender pole */}
                        <rect x={bx - 1.3} y={headY} width="2.6" height={baseY - headY} rx="1.3" fill="url(#bs-gold)" />
                        {/* lantern holder ring */}
                        <circle cx={bx} cy={headY} r="5.4" fill="#7e5f1d" />
                        {/* finial */}
                        <circle cx={bx} cy={headY - 7.5} r="1.7" fill="#e9cd7c" />
                      </g>
                      {/* soft light puddle on the road */}
                      <ellipse className="bs-light" cx={bx - 9} cy="162" rx="12" ry="3.4" fill="url(#bs-orb)" opacity="0" style={oc} />
                      {/* glow halo */}
                      <circle className="bs-light" cx={bx} cy={headY} r="16" fill="url(#bs-orb)" opacity="0" style={oc} />
                      {/* warm globe */}
                      <circle className="bs-light" cx={bx} cy={headY} r="4" fill="#ffe6ad" opacity="0" style={oc} />
                      {/* bright core */}
                      <circle className="bs-light" cx={bx} cy={headY} r="2.4" fill="#fff6df" opacity="0" filter="url(#bs-bloom)" style={oc} />
                    </g>
                  );
                })}

                {/* ── Drifting embers above the lamps (ambient, revealed stage 4) ── */}
                <g className="bs-ambient">
                  {PYLONS.flatMap((x) => {
                    const bx = x + 30;
                    return [
                      <circle key={`e1-${x}`} className="bs-ember" cx={bx + 3} cy="110" r="1.5" fill="#ffd98a" />,
                      <circle key={`e2-${x}`} className="bs-ember" cx={bx + 8} cy="106" r="1.1" fill="#ffe6ad" />,
                      <circle key={`e3-${x}`} className="bs-ember" cx={bx - 4} cy="108" r="1" fill="#ffcf8a" />,
                    ];
                  })}
                </g>
              </svg>

              {/* vertical progress beam */}
              <div className="absolute -left-5 top-0 hidden h-full w-px bg-(--ui-ghost) lg:block">
                <div
                  className="bs-beamfill h-full w-full origin-top bg-linear-to-b from-gold-soft to-gold-deep"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

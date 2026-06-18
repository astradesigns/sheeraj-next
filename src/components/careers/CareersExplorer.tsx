"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { jobs, jobDepartments, jobTypes } from "@/data/site";

function Helmet({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21a12 12 0 0 1 24 0" />
      <path d="M16 9v6M11 10v5M21 10v5" />
      <path d="M3 21h26v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  );
}

export default function CareersExplorer() {
  const [dept, setDept] = useState("All");
  const [type, setType] = useState("All");

  const filtered = jobs.filter(
    (j) => (dept === "All" || j.department === dept) && (type === "All" || j.type === type)
  );

  return (
    <div>
      {/* filters */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {jobDepartments.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all ${
                dept === d ? "border-gold/60 bg-gold/10 text-gold" : "[border-color:var(--ui-border)] text-mist hover:border-gold/40 hover:text-silver"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="ml-auto rounded-full border [border-color:var(--ui-border)] [background-color:var(--ui-surface-xs)] px-4 py-2 text-xs text-silver outline-none focus:border-gold"
        >
          {jobTypes.map((t) => (
            <option key={t} value={t} className="bg-panel">{t === "All" ? "All types" : t}</option>
          ))}
        </select>
      </div>

      <div className="mb-6 text-sm text-mist">{filtered.length} open {filtered.length === 1 ? "role" : "roles"}</div>

      {/* list */}
      <motion.div layout className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((j) => (
            <motion.div key={j.slug} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35 }}>
              <Link
                href={`/careers/${j.slug}`}
                data-cursor
                className="group relative block h-full overflow-hidden rounded-2xl border [border-color:var(--ui-border)] [background-color:var(--ui-surface-xs)] p-7 transition-all duration-500 hover:border-gold/40"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.4) 1px,transparent 1px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(circle at 85% 0%, #000, transparent 70%)", opacity: 0.08 }} />
                <div className="relative flex items-start justify-between">
                  <span className="text-gold"><Helmet /></span>
                  <span className="translate-x-2 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                </div>
                <h3 className="relative mt-5 font-serif text-2xl tracking-tight">{j.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-mist">{j.summary}</p>
                <div className="relative mt-4 flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-wider">
                  <span className="rounded-full bg-gold/10 px-2.5 py-1 text-gold">{j.department}</span>
                  <span className="rounded-full [background-color:var(--ui-surface-md)] px-2.5 py-1 text-mist">{j.location}</span>
                  <span className="rounded-full [background-color:var(--ui-surface-md)] px-2.5 py-1 text-mist">{j.type}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border [border-color:var(--ui-border)] p-12 text-center text-mist">
          No roles match these filters right now — try a different department.
        </div>
      )}
    </div>
  );
}

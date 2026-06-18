"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm, { type FieldDef } from "@/components/ui/ContactForm";

const APPLY_FIELDS: FieldDef[] = [
  { name: "name", label: "Full name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "company", label: "Current company" },
  { name: "portfolio", label: "LinkedIn / portfolio URL", full: true },
  { name: "message", label: "Why you're a great fit", textarea: true, full: true },
];

export default function ApplyModal({ jobTitle }: { jobTitle: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-gold">
        <span className="relative z-10">Apply for this role</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-base/80 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-h-[88vh] w-full max-w-lg overflow-y-auto"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">Apply now</div>
                  <div className="mt-1 font-serif text-xl">{jobTitle}</div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border [border-color:var(--ui-border-md)] text-mist transition-colors hover:border-gold/60 hover:text-gold"
                >
                  ✕
                </button>
              </div>
              <ContactForm
                fields={APPLY_FIELDS}
                submitLabel="Submit application"
                successTitle="Application received."
                successBody="Thank you for applying — we'll review and reach out if there's a match."
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

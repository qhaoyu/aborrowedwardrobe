"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";

export default function RentalInterestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [travelDates, setTravelDates] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Wardrobe Rental — Enquiry");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nExpected travel dates in KL: ${travelDates}\n\nI'd like to ask about renting a costume.`,
    );
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
          Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-sm border border-[color:var(--color-line)] bg-white/60 px-3 py-2 text-sm text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-terracotta)]"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-sm border border-[color:var(--color-line)] bg-white/60 px-3 py-2 text-sm text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-terracotta)]"
        />
      </div>
      <div>
        <label htmlFor="dates" className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
          Expected travel dates in KL (optional)
        </label>
        <input
          id="dates"
          value={travelDates}
          onChange={(e) => setTravelDates(e.target.value)}
          placeholder="e.g. Dec 2026"
          className="mt-1 w-full rounded-sm border border-[color:var(--color-line)] bg-white/60 px-3 py-2 text-sm text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-terracotta)]"
        />
      </div>
      <button
        type="submit"
        className="mt-2 rounded-sm bg-[color:var(--color-terracotta)] px-6 py-3 text-sm uppercase tracking-wide text-[color:var(--color-cream)] transition-opacity hover:opacity-90"
      >
        Send Enquiry
      </button>
      <p className="text-xs text-[color:var(--color-ink)]/50">
        This opens your email app addressed to us.
      </p>
    </form>
  );
}

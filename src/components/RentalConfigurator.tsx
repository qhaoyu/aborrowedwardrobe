"use client";

import { useState } from "react";
import Image from "next/image";
import { formatMYR } from "@/lib/products";
import {
  dropoffMethodOptions,
  getRentalDuration,
  pickupSlots,
  rentalDurationOptions,
  type DropoffMethodId,
  type PickupSlotId,
  type RentalDurationId,
} from "@/lib/rental";
import type { Costume } from "@/lib/costumes";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function RentalConfigurator({ costume }: { costume: Costume }) {
  const [activePhoto, setActivePhoto] = useState(costume.gallery[0] ?? costume.photo);
  const [date, setDate] = useState("");
  const [durationId, setDurationId] = useState<RentalDurationId>("4h");
  const [pickupSlotId, setPickupSlotId] = useState<PickupSlotId>("morning");
  const [dropoffId, setDropoffId] = useState<DropoffMethodId | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const duration = getRentalDuration(durationId)!;
  const lockedPickupSlot = duration.requiresPickupSlot;

  function handleDurationChange(id: RentalDurationId) {
    setDurationId(id);
    const option = getRentalDuration(id);
    if (option?.requiresPickupSlot) setPickupSlotId(option.requiresPickupSlot);
  }

  const canBook = Boolean(date && dropoffId);

  async function handleBook() {
    if (!canBook) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/rental-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          costumeSlug: costume.slug,
          date,
          durationId,
          pickupSlotId,
          dropoffId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Booking failed.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed.");
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-sm shadow-md">
          <Image
            src={activePhoto}
            alt={costume.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            className="object-cover object-top"
          />
        </div>

        {costume.gallery.length > 1 && (
          <div className="mt-3 grid grid-cols-6 gap-2">
            {costume.gallery.map((photo) => (
              <button
                key={photo}
                type="button"
                onClick={() => setActivePhoto(photo)}
                aria-label="Show this view"
                aria-pressed={activePhoto === photo}
                className={`relative aspect-square overflow-hidden rounded-sm border transition-colors ${
                  activePhoto === photo
                    ? "border-[color:var(--color-terracotta)]"
                    : "border-[color:var(--color-line)] hover:border-[color:var(--color-terracotta)]/50"
                }`}
              >
                <Image src={photo} alt="" fill sizes="80px" className="object-cover object-top" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-terracotta)]">
          {costume.category}
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[color:var(--color-ink)] sm:text-4xl">
          {costume.name}
        </h1>
        <p className="mt-3 text-xl text-[color:var(--color-ink)]/80">
          {formatMYR(duration.priceMYR)}
        </p>

        <p className="mt-6 leading-relaxed text-[color:var(--color-ink)]/80">
          {costume.description}
        </p>

        <div className="mt-8 flex flex-col gap-6">
          <div>
            <label htmlFor="pickup-date" className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
              Pickup Date
            </label>
            <input
              id="pickup-date"
              type="date"
              min={todayISO()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 block w-full max-w-xs rounded-sm border border-[color:var(--color-line)] bg-transparent px-3 py-2 text-sm text-[color:var(--color-ink)]"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
              Pickup Time
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {pickupSlots.map((slot) => {
                const disabled = lockedPickupSlot !== null && slot.id !== lockedPickupSlot;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => setPickupSlotId(slot.id)}
                    aria-pressed={pickupSlotId === slot.id}
                    className={`rounded-sm border px-4 py-2 text-sm transition-colors ${
                      pickupSlotId === slot.id
                        ? "border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)] text-[color:var(--color-cream)]"
                        : "border-[color:var(--color-line)] text-[color:var(--color-ink)] hover:border-[color:var(--color-terracotta)]"
                    } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
            {lockedPickupSlot && (
              <p className="mt-2 text-xs text-[color:var(--color-ink)]/50">
                The 10-hour rental always starts at 8:30 AM.
              </p>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
              Duration
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {rentalDurationOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleDurationChange(option.id)}
                  aria-pressed={durationId === option.id}
                  className={`rounded-sm border px-4 py-2 text-left text-sm transition-colors ${
                    durationId === option.id
                      ? "border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)] text-[color:var(--color-cream)]"
                      : "border-[color:var(--color-line)] text-[color:var(--color-ink)] hover:border-[color:var(--color-terracotta)]"
                  }`}
                >
                  {option.label} — {formatMYR(option.priceMYR)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-ink)]/60">
              Drop-off
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              {dropoffMethodOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDropoffId(option.id)}
                  aria-pressed={dropoffId === option.id}
                  className={`flex-1 rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
                    dropoffId === option.id
                      ? "border-[color:var(--color-terracotta)] bg-[color:var(--color-terracotta)]/10"
                      : "border-[color:var(--color-line)] hover:border-[color:var(--color-terracotta)]"
                  }`}
                >
                  <span className="block font-medium text-[color:var(--color-ink)]">
                    {option.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-[color:var(--color-ink)]/60">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="button"
            disabled={!canBook || loading}
            onClick={handleBook}
            className="rounded-sm bg-[color:var(--color-terracotta)] px-8 py-3 text-sm uppercase tracking-wide text-[color:var(--color-cream)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Redirecting to Stripe…" : `Book & Pay ${formatMYR(duration.priceMYR)}`}
          </button>
          {!canBook && (
            <p className="text-xs text-[color:var(--color-ink)]/50">
              Choose a pickup date and drop-off method to continue.
            </p>
          )}
        </div>

        <p className="mt-8 text-xs text-[color:var(--color-ink)]/50">
          Pick up in person from our studio on Petaling Street, Chinatown, Kuala Lumpur.
        </p>
      </div>
    </div>
  );
}

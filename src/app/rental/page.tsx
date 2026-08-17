import BatikSwatch from "@/components/BatikSwatch";
import RentalInterestForm from "@/components/RentalInterestForm";

export const metadata = {
  title: "Wardrobe Rental (Coming Soon) | A Borrowed Wardrobe",
  description:
    "Rent a traditional costume for a photoshoot walk through Kuala Lumpur. Coming soon from A Borrowed Wardrobe, Petaling Street.",
};

const steps = [
  {
    title: "Book a slot",
    body: "Reserve a costume and a time window online before you arrive in Kuala Lumpur.",
  },
  {
    title: "Get dressed on Petaling Street",
    body: "Stop by our studio, get fitted, and add accessories for your look.",
  },
  {
    title: "Walk, wander, photograph",
    body: "Explore Chinatown and beyond in costume — bring your own photographer or book ours.",
  },
  {
    title: "Return before you fly out",
    body: "Drop the costume back with us any time before your flight home.",
  },
];

export default function RentalPage() {
  return (
    <div>
      <section className="border-b border-[color:var(--color-line)] bg-[color:var(--color-indigo)] text-[color:var(--color-cream)]">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold)]">
            Coming Soon
          </p>
          <h1 className="mt-3 font-serif text-4xl">
            Borrow a costume for the day.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-cream)]/80">
            We&apos;re building a new way to experience Kuala Lumpur: rent a
            full traditional costume, walk the streets of Chinatown for a
            photoshoot, then return it before you leave — no suitcase space
            required.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <h2 className="text-center font-serif text-2xl text-[color:var(--color-ink)] sm:text-3xl">
          How it will work
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-sm border border-[color:var(--color-line)] p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-terracotta)]">
                Step {i + 1}
              </p>
              <p className="mt-2 font-serif text-lg text-[color:var(--color-ink)]">
                {step.title}
              </p>
              <p className="mt-2 text-sm text-[color:var(--color-ink)]/70">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[color:var(--color-line)] bg-white/40">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center">
          <div className="grid grid-cols-2 gap-4">
            <BatikSwatch
              pattern="mega-mendung"
              colorway={["#16324f", "#f2e8c9"]}
              className="aspect-[3/4] w-full rounded-sm shadow-md"
            />
            <BatikSwatch
              pattern="sido-mukti"
              colorway={["#4a1f3d", "#d4af37"]}
              className="mt-8 aspect-[3/4] w-full rounded-sm shadow-md"
            />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[color:var(--color-ink)] sm:text-3xl">
              Be first to know when we launch
            </h2>
            <p className="mt-3 text-sm text-[color:var(--color-ink)]/70">
              Leave your details below and we&apos;ll reach out when
              wardrobe rental is ready to book.
            </p>
            <div className="mt-8">
              <RentalInterestForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

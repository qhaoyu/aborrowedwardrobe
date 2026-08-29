import { notFound } from "next/navigation";
import Link from "next/link";
import RentalConfigurator from "@/components/RentalConfigurator";
import { costumes, getCostumeBySlug } from "@/lib/costumes";

type RentalBookingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return costumes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: RentalBookingPageProps) {
  const { slug } = await params;
  const costume = getCostumeBySlug(slug);
  if (!costume) return {};
  return {
    title: `Rent ${costume.name} | A Borrowed Wardrobe`,
    description: costume.description,
  };
}

export default async function RentalBookingPage({ params }: RentalBookingPageProps) {
  const { slug } = await params;
  const costume = getCostumeBySlug(slug);
  if (!costume) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <Link
        href="/rental"
        className="text-sm uppercase tracking-wide text-[color:var(--color-ink)]/60 hover:text-[color:var(--color-ink)]"
      >
        ← Back to Rental
      </Link>

      <div className="mt-6">
        <RentalConfigurator costume={costume} />
      </div>
    </div>
  );
}

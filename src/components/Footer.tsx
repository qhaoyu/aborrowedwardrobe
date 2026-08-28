import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-line)] bg-[color:var(--color-ink)] text-[color:var(--color-cream)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/mark.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-lg"
            />
            <p className="font-serif text-lg">A Borrowed Wardrobe</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-[color:var(--color-cream)]/70">
            Batik tops, pants, and sweaters made for wandering — designed and sold
            from the heart of Petaling Street, Chinatown, Kuala Lumpur.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-cream)]/50">
            Visit
          </p>
          <p className="mt-3 text-sm text-[color:var(--color-cream)]/80">
            Petaling Street
            <br />
            Chinatown, Kuala Lumpur
            <br />
            Malaysia
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-3 inline-block text-sm text-[color:var(--color-cream)]/80 hover:text-[color:var(--color-cream)]"
          >
            {siteConfig.contactEmail}
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-cream)]/50">
            Explore
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/shop" className="text-[color:var(--color-cream)]/80 hover:text-[color:var(--color-cream)]">
              Shop the Collection
            </Link>
            <Link href="/about" className="text-[color:var(--color-cream)]/80 hover:text-[color:var(--color-cream)]">
              Our Story
            </Link>
            <Link href="/rental" className="text-[color:var(--color-cream)]/80 hover:text-[color:var(--color-cream)]">
              Wardrobe Rental (Coming Soon)
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-[color:var(--color-cream)]/50 sm:px-8">
        © {new Date().getFullYear()} A Borrowed Wardrobe. All rights reserved.
      </div>
    </footer>
  );
}

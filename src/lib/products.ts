export type ProductCategory = "top" | "pants" | "sweater";

export const categoryLabels: Record<ProductCategory, string> = {
  top: "Batik Top",
  pants: "Batik Pants",
  sweater: "Batik Sweater",
};

export type BatikPattern =
  | "parang"
  | "kawung"
  | "mega-mendung"
  | "sekar-jagad"
  | "truntum"
  | "sido-mukti";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  /**
   * The garment's own signature traditional motif, where it has one fixed
   * print baked into the listing. Unset for a garment (like the pants
   * below) whose whole point is that the customer picks any print from the
   * shared collection — forcing one of these six names on it would be the
   * same unverifiable claim the fabric library moved away from.
   */
  pattern?: BatikPattern;
  priceMYR: number;
  description: string;
  story: string;
  sizes: string[];
  colorway: [string, string];
  featured?: boolean;
  /** Path under /public to a real photoshoot image, used in place of the generated BatikSwatch pattern where set. */
  photo?: string;
  /** Additional reference photos (other cuts, flat lay vs. worn) shown alongside `photo` for garments offered in more than one shot. */
  gallery?: string[];
};

export const patternLabels: Record<BatikPattern, string> = {
  parang: "Parang",
  kawung: "Kawung",
  "mega-mendung": "Mega Mendung",
  "sekar-jagad": "Sekar Jagad",
  truntum: "Truntum",
  "sido-mukti": "Sido Mukti",
};

/** One-line cultural meaning shown when a customer is choosing a motif. */
export const patternMeanings: Record<BatikPattern, string> = {
  parang: "Resilience — a diagonal motif traditionally worn as a symbol of strength.",
  kawung: "Balance and purity — four overlapping ovals in a classic lattice.",
  "mega-mendung": "Patience — indigo cloud forms, said to teach calm before the storm.",
  "sekar-jagad": "Flowers of the world — a patchwork of regional motifs in one cloth.",
  truntum: "A love that keeps growing — small star-like flowers scattered like a night sky.",
  "sido-mukti": "Good fortune — traditionally reserved for celebrations.",
};

/**
 * The house's own print collection, named the same way the garments
 * themselves are (Senja, Kota, Pasar…) rather than claimed against the six
 * traditional motifs above. These are real photographed fabric, sorted by
 * eye into families that share a visual structure — not an assertion that
 * e.g. "Kelam" *is* mega mendung, which would need real textile expertise
 * to verify. `BatikPattern` above stays reserved for the traditional term
 * each catalogue-listed garment's own signature print is actually named
 * after.
 */
export type FabricMotif = "arus" | "pasar" | "gemilang" | "kunang" | "kelam" | "sulur";

export const fabricMotifLabels: Record<FabricMotif, string> = {
  arus: "Arus",
  pasar: "Pasar",
  gemilang: "Gemilang",
  kunang: "Kunang",
  kelam: "Kelam",
  sulur: "Sulur",
};

/** One-line mood, shown when a customer is browsing a family — descriptive, not a cultural claim. */
export const fabricMotifMeanings: Record<FabricMotif, string> = {
  arus: "Movement caught mid-fold — the diagonal line every wax-resist brush leaves behind.",
  pasar: "Many patterns pieced into one cloth, the way a market brings everything to one street.",
  gemilang: "Dense and ornate, saved for the occasion worth dressing up for.",
  kunang: "Small and scattered — the quiet print instead of the loud one.",
  kelam: "Dark-grounded and unmistakable, readable from across the room.",
  sulur: "Vines and leaves filling the quiet corners, instead of one bold motif.",
};

export type Design = {
  slug: string;
  motif: FabricMotif;
  /** The individual print's own name within its family, e.g. "Lembayung" within Arus. */
  name: string;
  /** The print's two dominant colors, extracted from its actual photo. */
  colorway: [string, string];
  photo: string;
};

/**
 * The full, shared catalogue of orderable prints — every garment draws from
 * the same library rather than each carrying its own curated shortlist,
 * since the point is for customers to browse the whole collection. Every
 * entry here is backed by real photography (see public/fabrics/); there is
 * no generated-placeholder tier in this list — a family with no photographed
 * print yet simply doesn't appear as an option.
 */
export const designs: Design[] = [
  {
    slug: "arus-lembayung",
    motif: "arus",
    name: "Lembayung",
    colorway: ["#28091a", "#693e2d"],
    photo: "/fabrics/plum-red-diagonal-floral.jpg",
  },
  {
    slug: "arus-delima",
    motif: "arus",
    name: "Delima",
    colorway: ["#770b1d", "#9e414a"],
    photo: "/fabrics/red-magenta-diagonal-wave.jpg",
  },
  {
    slug: "arus-gerhana",
    motif: "arus",
    name: "Gerhana",
    colorway: ["#0e0f17", "#51392a"],
    photo: "/fabrics/navy-gold-burgundy-diagonal.jpg",
  },
  {
    slug: "arus-rempah",
    motif: "arus",
    name: "Rempah",
    colorway: ["#7a4d44", "#511c29"],
    photo: "/fabrics/maroon-gold-diagonal-lattice.jpg",
  },
  {
    slug: "arus-kemuning",
    motif: "arus",
    name: "Kemuning",
    colorway: ["#1f2037", "#786148"],
    photo: "/fabrics/navy-burgundy-gold-diagonal-floral.jpg",
  },
  {
    slug: "pasar-petaling",
    motif: "pasar",
    name: "Petaling",
    colorway: ["#421b24", "#946e52"],
    photo: "/fabrics/purple-orange-patchwork-floral.jpg",
  },
  {
    slug: "pasar-kongsi",
    motif: "pasar",
    name: "Kongsi",
    colorway: ["#541a17", "#745a32"],
    photo: "/fabrics/green-red-pink-patchwork-diagonal.jpg",
  },
  {
    slug: "pasar-serambi",
    motif: "pasar",
    name: "Serambi",
    colorway: ["#4a274f", "#8c738f"],
    photo: "/fabrics/purple-white-spiral-floral-border.jpg",
  },
  {
    slug: "pasar-rantau",
    motif: "pasar",
    name: "Rantau",
    colorway: ["#0e1f4c", "#92664d"],
    photo: "/fabrics/navy-orange-maroon-feather-scroll.jpg",
  },
  {
    slug: "gemilang-seroja",
    motif: "gemilang",
    name: "Seroja",
    colorway: ["#adbfcc", "#4a6a76"],
    photo: "/fabrics/white-teal-red-lotus-paisley.jpg",
  },
  {
    slug: "gemilang-ratu",
    motif: "gemilang",
    name: "Ratu",
    colorway: ["#301b2e", "#8e7b5c"],
    photo: "/fabrics/aubergine-magenta-gold-scroll.jpg",
  },
  {
    slug: "gemilang-puteri",
    motif: "gemilang",
    name: "Puteri",
    colorway: ["#837e84", "#4b111b"],
    photo: "/fabrics/purple-pink-gold-floral-lattice.jpg",
  },
  {
    slug: "gemilang-sutera",
    motif: "gemilang",
    name: "Sutera",
    colorway: ["#1e1e1d", "#4c4942"],
    photo: "/fabrics/black-cream-monochrome-floral.jpg",
  },
  {
    slug: "gemilang-tembaga",
    motif: "gemilang",
    name: "Tembaga",
    colorway: ["#5b3b19", "#7a7166"],
    photo: "/fabrics/copper-indigo-paisley-swirl.jpg",
  },
  {
    slug: "gemilang-angkasa",
    motif: "gemilang",
    name: "Angkasa",
    colorway: ["#4c4632", "#bab0a1"],
    photo: "/fabrics/cream-green-phoenix-floral.jpg",
  },
  {
    slug: "gemilang-cendana",
    motif: "gemilang",
    name: "Cendana",
    colorway: ["#7d180d", "#d29e67"],
    photo: "/fabrics/burgundy-gold-blue-ikat-scroll.jpg",
  },
  {
    slug: "kunang-kelip",
    motif: "kunang",
    name: "Kelip",
    colorway: ["#774f25", "#300a1c"],
    photo: "/fabrics/black-gold-magenta-star-floral.jpg",
  },
  {
    slug: "kunang-merona",
    motif: "kunang",
    name: "Merona",
    colorway: ["#52170f", "#9f4730"],
    photo: "/fabrics/red-pink-gold-star-floral.jpg",
  },
  {
    slug: "kunang-damai",
    motif: "kunang",
    name: "Damai",
    colorway: ["#60040d", "#815851"],
    photo: "/fabrics/maroon-teal-cream-floral.jpg",
  },
  {
    slug: "kunang-ranting",
    motif: "kunang",
    name: "Ranting",
    colorway: ["#dfdad7", "#977068"],
    photo: "/fabrics/cream-maroon-dusty-blue-branch-floral.jpg",
  },
  {
    slug: "kunang-melur",
    motif: "kunang",
    name: "Melur",
    colorway: ["#ced1cc", "#929d8e"],
    photo: "/fabrics/white-blue-orange-ditsy-floral.jpg",
  },
  {
    slug: "kelam-bayang",
    motif: "kelam",
    name: "Bayang",
    colorway: ["#0c0c0c", "#7f8285"],
    photo: "/fabrics/black-cream-paisley-scroll.jpg",
  },
  {
    slug: "kelam-marun",
    motif: "kelam",
    name: "Marun",
    colorway: ["#3c1d1f", "#6e473b"],
    photo: "/fabrics/black-crimson-gold-leaf.jpg",
  },
  {
    slug: "kelam-retak",
    motif: "kelam",
    name: "Retak",
    colorway: ["#4a354a", "#5f5f57"],
    photo: "/fabrics/blue-red-gold-crackle-floral.jpg",
  },
  {
    slug: "kelam-nila",
    motif: "kelam",
    name: "Nila",
    colorway: ["#07255a", "#1e4d82"],
    photo: "/fabrics/indigo-tonal-blue-floral.jpg",
  },
  {
    slug: "kelam-mutiara",
    motif: "kelam",
    name: "Mutiara",
    colorway: ["#141a23", "#4d4030"],
    photo: "/fabrics/navy-gold-pearl-floral.jpg",
  },
  {
    slug: "kelam-kesuma",
    motif: "kelam",
    name: "Kesuma",
    colorway: ["#1d1a3a", "#6f5857"],
    photo: "/fabrics/navy-red-blue-gold-floral-vine.jpg",
  },
  {
    slug: "kelam-kuntum",
    motif: "kelam",
    name: "Kuntum",
    colorway: ["#403842", "#5b5b61"],
    photo: "/fabrics/navy-red-green-tulip-floral.jpg",
  },
  {
    slug: "kelam-embun",
    motif: "kelam",
    name: "Embun",
    colorway: ["#8f9eb3", "#1c325e"],
    photo: "/fabrics/navy-white-tonal-paisley.jpg",
  },
  {
    slug: "sulur-pucuk",
    motif: "sulur",
    name: "Pucuk",
    colorway: ["#bebba5", "#5a5340"],
    photo: "/fabrics/cream-brown-green-vine-split.jpg",
  },
  {
    slug: "sulur-zaitun",
    motif: "sulur",
    name: "Zaitun",
    colorway: ["#444d67", "#d2cec7"],
    photo: "/fabrics/cream-navy-olive-floral.jpg",
  },
  {
    slug: "sulur-dahan",
    motif: "sulur",
    name: "Dahan",
    colorway: ["#477189", "#d3dbda"],
    photo: "/fabrics/cream-teal-navy-branch-floral.jpg",
  },
  {
    slug: "sulur-cengkih",
    motif: "sulur",
    name: "Cengkih",
    colorway: ["#451610", "#662f24"],
    photo: "/fabrics/maroon-copper-diamond-floral.jpg",
  },
  {
    slug: "sulur-karat",
    motif: "sulur",
    name: "Karat",
    colorway: ["#161113", "#452f27"],
    photo: "/fabrics/navy-rust-lattice-vine.jpg",
  },
  {
    slug: "sulur-pandan",
    motif: "sulur",
    name: "Pandan",
    colorway: ["#6e3113", "#92664b"],
    photo: "/fabrics/rust-cream-leaf-lattice.jpg",
  },
  {
    slug: "sulur-rimba",
    motif: "sulur",
    name: "Rimba",
    colorway: ["#310611", "#714838"],
    photo: "/fabrics/wine-multicolor-leaf-vine.jpg",
  },
];

export function getDesignBySlug(slug: string): Design | undefined {
  return designs.find((d) => d.slug === slug);
}

/**
 * Exactly one listing per category — no individual product names or
 * per-piece stories. Each one's own gallery groups every photo shot for
 * that category (flat lay and worn, every colorway tried so far); the
 * actual print is chosen from the shared collection on the product page,
 * same as before.
 */
export const products: Product[] = [
  {
    slug: "batik-top",
    name: "Batik Top",
    category: "top",
    priceMYR: 199,
    description:
      "Short-sleeve batik shirts, hand-block-printed and cut for warm-weather travel. Pick the print from the full collection.",
    story: "Hand-block-printed in our Petaling Street studio, piece by piece.",
    sizes: ["S", "M", "L", "XL"],
    colorway: ["#1c2340", "#c9a13a"],
    featured: true,
    photo: "/products/tops/black-gold/model.jpg",
    gallery: [
      "/products/tops/black-gold/model.jpg",
      "/products/tops/blue/model.jpg",
      "/products/tops/blue/flat.jpg",
      "/products/tops/bright-blue/model.jpg",
      "/products/tops/bright-blue/flat.jpg",
      "/products/tops/dark-gold/flat.jpg",
      "/products/tops/green-white/model.jpg",
      "/products/tops/green-white/flat.jpg",
      "/products/tops/sky-blue/flat.jpg",
    ],
  },
  {
    slug: "batik-pants",
    name: "Batik Pants",
    category: "pants",
    priceMYR: 199,
    description:
      "Batik trousers cut two ways — a wide-leg palazzo and a gathered harem, both finished with an easy elastic waist. Pick the fit here, then choose any print from the full collection.",
    story: "Cut loose for the tropical heat, from the same Petaling Street studio.",
    sizes: ["S", "M", "L", "XL"],
    colorway: ["#2e1f1c", "#c23a6a"],
    featured: true,
    photo: "/products/pants/pink/model.jpg",
    gallery: [
      "/products/pants/pink/model.jpg",
      "/products/pants/pink/flat.jpg",
      "/products/pants/purple/model.jpg",
      "/products/pants/purple/flat.jpg",
      "/products/pants/red-green/model.jpg",
      "/products/pants/red-green/flat.jpg",
    ],
  },
  {
    slug: "batik-sweater",
    name: "Batik Sweater",
    category: "sweater",
    priceMYR: 299,
    description:
      "A zip-front bomber cut in batik florals, ribbed at the collar, cuffs and hem for cooler evenings. Pick this silhouette, then choose any print from the full collection.",
    story: "Warm enough for the walk home once Petaling Street cools down.",
    sizes: ["S", "M", "L", "XL"],
    colorway: ["#8ba3ac", "#7a2f3a"],
    featured: true,
    photo: "/products/sweaters/flower/model.jpg",
    gallery: [
      "/products/sweaters/flower/model.jpg",
      "/products/sweaters/flower/flat.jpg",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatMYR(amount: number): string {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
  }).format(amount);
}

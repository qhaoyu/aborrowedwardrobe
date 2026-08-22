export type ProductCategory = "shirt" | "dress";

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
  pattern: BatikPattern;
  priceMYR: number;
  description: string;
  story: string;
  sizes: string[];
  colorway: [string, string];
  featured?: boolean;
  /** Path under /public to a real photoshoot image, used in place of the generated BatikSwatch pattern where set. */
  photo?: string;
  /** Motifs this cut can be ordered in. The customer chooses one before adding to cart; `pattern` is just the first/signature option. */
  designs: BatikPattern[];
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

/** Representative colorway used to render a pattern in the motif picker, independent of any one product's own colorway. */
export const patternColorways: Record<BatikPattern, [string, string]> = {
  parang: ["#7a2e2e", "#d99a3d"],
  kawung: ["#1f3a3d", "#c9b458"],
  "mega-mendung": ["#1e3a5f", "#e8e2d0"],
  "sekar-jagad": ["#8a3b1f", "#2c6e49"],
  truntum: ["#2b2b2b", "#c94f4f"],
  "sido-mukti": ["#4a1f3d", "#d4af37"],
};

export const products: Product[] = [
  {
    slug: "senja-batik-shirt",
    name: "Senja Shirt",
    category: "shirt",
    pattern: "parang",
    priceMYR: 189,
    description:
      "A relaxed, breathable short-sleeve shirt hand-block-printed in a diagonal parang motif — traditionally worn to symbolise resilience.",
    story:
      "Named for the golden hour over Petaling Street, when lantern light meets the last of the sun.",
    sizes: ["S", "M", "L", "XL"],
    colorway: ["#7a2e2e", "#d99a3d"],
    featured: true,
    photo: "/products/pink-batik-top-skirt/rob01666.jpg",
    designs: ["parang", "kawung", "mega-mendung", "truntum"],
  },
  {
    slug: "kota-batik-shirt",
    name: "Kota Shirt",
    category: "shirt",
    pattern: "kawung",
    priceMYR: 199,
    description:
      "Structured cotton shirt in the kawung motif — four overlapping ovals said to represent balance and purity.",
    story:
      "Inspired by the geometry of shophouse tiles along Jalan Petaling.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colorway: ["#1f3a3d", "#c9b458"],
    featured: true,
    photo: "/products/colorful-mesh-blouse-blue-skirt/rob01656.jpg",
    designs: ["kawung", "parang", "sekar-jagad", "sido-mukti"],
  },
  {
    slug: "awan_biru-batik-shirt",
    name: "Awan Biru Shirt",
    category: "shirt",
    pattern: "mega-mendung",
    priceMYR: 209,
    description:
      "Indigo cloud-motif shirt in a soft viscose blend — mega mendung patterns are said to teach patience, like clouds before rain.",
    story: "A nod to the monsoon skies over the Klang Valley.",
    sizes: ["S", "M", "L", "XL"],
    colorway: ["#1e3a5f", "#e8e2d0"],
    photo: "/products/blue-red-gold-brocade-gown/rob01895.jpg",
    designs: ["mega-mendung", "truntum", "kawung", "sekar-jagad"],
  },
  {
    slug: "pasar-batik-shirt",
    name: "Pasar Shirt",
    category: "shirt",
    pattern: "sekar-jagad",
    priceMYR: 195,
    description:
      "A patchwork-style print combining several regional motifs — sekar jagad translates roughly to 'flowers of the world.'",
    story: "One shirt, many journeys — much like the market it's named for.",
    sizes: ["S", "M", "L", "XL"],
    colorway: ["#8a3b1f", "#2c6e49"],
    photo: "/products/gold-teal-peplum-set/rob00443.jpg",
    designs: ["sekar-jagad", "parang", "mega-mendung", "sido-mukti"],
  },
  {
    slug: "malam-batik-dress",
    name: "Malam Wrap Dress",
    category: "dress",
    pattern: "sido-mukti",
    priceMYR: 259,
    description:
      "A flowing midi wrap dress in the sido mukti motif, traditionally reserved for celebrations and worn for good fortune.",
    story: "For evenings that turn into stories worth retelling.",
    sizes: ["XS", "S", "M", "L"],
    colorway: ["#4a1f3d", "#d4af37"],
    featured: true,
    photo: "/products/blue-gold-batik-gown/rob02040.jpg",
    designs: ["sido-mukti", "truntum", "parang", "kawung"],
  },
  {
    slug: "chinatown-batik-dress",
    name: "Chinatown Shift Dress",
    category: "dress",
    pattern: "truntum",
    priceMYR: 239,
    description:
      "A tailored shift dress in the truntum motif — small star-like flowers symbolising a love that keeps growing.",
    story: "Cut for walking the five-foot ways of old Kuala Lumpur.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colorway: ["#2b2b2b", "#c94f4f"],
    photo: "/products/black-red-floral-batik-dress/rob02244.jpg",
    designs: ["truntum", "sido-mukti", "sekar-jagad", "mega-mendung"],
  },
  {
    slug: "lantera-batik-dress",
    name: "Lantera Maxi Dress",
    category: "dress",
    pattern: "mega-mendung",
    priceMYR: 279,
    description:
      "A floor-length maxi in cool indigo cloud tones, cut loose for the tropical heat with a fitted waist tie.",
    story: "Named for the paper lanterns strung above Petaling Street at dusk.",
    sizes: ["S", "M", "L"],
    colorway: ["#16324f", "#f2e8c9"],
    featured: true,
    photo: "/products/gold-champagne-sash-dress/rob09258.jpg",
    designs: ["mega-mendung", "sido-mukti", "truntum", "kawung"],
  },
  {
    slug: "warisan-batik-dress",
    name: "Warisan Sundress",
    category: "dress",
    pattern: "kawung",
    priceMYR: 219,
    description:
      "A lightweight sundress with adjustable straps, printed in a classic kawung lattice for everyday wear.",
    story: "Warisan means 'heritage' — worn forward, not just looked back on.",
    sizes: ["XS", "S", "M", "L"],
    colorway: ["#3d5a3d", "#e8c05a"],
    photo: "/products/yellow-gold-red-cape-set/rob09816.jpg",
    designs: ["kawung", "sekar-jagad", "parang", "truntum"],
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

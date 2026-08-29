export type CostumeCategory = "gown" | "two-piece" | "pantsuit" | "kaftan";

export const costumeCategoryLabels: Record<CostumeCategory, string> = {
  gown: "Gowns",
  "two-piece": "Two-Piece Sets",
  pantsuit: "Pantsuits",
  kaftan: "Kaftans",
};

export type Costume = {
  slug: string;
  name: string;
  category: CostumeCategory;
  /** Real Kuala Lumpur location shown in the shoot — a suggested photo spot, not how the costume is organized. */
  location: string;
  description: string;
  /** Cover photo shown in the gallery grid. */
  photo: string;
  /** Every photo shot for this look, in order — shown in the detail lightbox. */
  gallery: string[];
};

function look(folder: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/editorial/${folder}/${String(i + 1).padStart(2, "0")}.jpg`);
}

/**
 * One entry per costume in public/editorial/ — real editorial photography,
 * not shop merchandise (see products.ts). Names are invented rather than
 * claimed against a specific tradition or ceremony, the same reasoning as
 * the fabric library in products.ts: we can describe what's visibly there
 * (a kebaya-style top, a songket-pattern skirt, a beaded crown) without
 * asserting which exact culture or occasion a prop styling is drawn from.
 * Browsing is organized by `category` (what the outfit actually is);
 * `location` is real but secondary — a suggested photo spot, shown in the
 * detail view rather than used to group anything.
 */
export const costumes: Costume[] = [
  {
    slug: "sabah-rungus-traditional-attire",
    name: "Sabah Rungus Traditional Attire",
    category: "two-piece",
    location: "Rooftop Bar, Kuala Lumpur",
    description:
      "Angular tribal-print shoulder pieces and a beaded headpiece over a voluminous striped skirt, shot on a rooftop at dusk.",
    photo: "/editorial/sabah-rungus-traditional-attire/01.jpg",
    gallery: look("sabah-rungus-traditional-attire", 3),
  },
  {
    slug: "sarawak-indigenous-community-attire",
    name: "Sarawak Indigenous Community Attire",
    category: "gown",
    location: "Chinatown, Kuala Lumpur",
    description:
      "An asymmetric brocade gown with a diamond-patchwork skirt trimmed in pom-poms, framed by a stone lion at a Chinatown gate.",
    photo: "/editorial/sarawak-indigenous-community-attire/01.jpg",
    gallery: look("sarawak-indigenous-community-attire", 2),
  },
  {
    slug: "terengganu-selendang-attire",
    name: "Terengganu Selendang Attire",
    category: "gown",
    location: "Mural Alley, Kuala Lumpur",
    description:
      "A draped navy songket gown with a gold brooch and a tall gold crown, set against a mural in a quiet KL alley.",
    photo: "/editorial/terengganu-selendang-attire/01.jpg",
    gallery: look("terengganu-selendang-attire", 6),
  },
  {
    slug: "malaysia-batik-gown-1",
    name: "Malaysia Batik Gown 1",
    category: "two-piece",
    location: "Sultan Abdul Samad Building",
    description:
      "A cropped batik blazer over a matching midi dress, glowing under the lit clock tower of the Sultan Abdul Samad Building.",
    photo: "/editorial/malaysia-batik-gown-1/01.jpg",
    gallery: look("malaysia-batik-gown-1", 5),
  },
  {
    slug: "look-05",
    name: "Kwai Chai Muse",
    category: "gown",
    location: "Kwai Chai Hong",
    description:
      "A strapless gold-and-navy batik column gown with a dramatic royal-blue satin train, framed by Kwai Chai Hong's painted walls and string lights.",
    photo: "/editorial/look-05/01.jpg",
    gallery: look("look-05", 8),
  },
  {
    slug: "malacca-regal-bride-attire",
    name: "Malacca Regal Bride Attire",
    category: "gown",
    location: "Petaling Street",
    description:
      "A beaded blue-and-gold gown with a tiered skirt and an elaborate phoenix-crown headdress, shot beneath the Petaling Street gate.",
    photo: "/editorial/malacca-regal-bride-attire/01.jpg",
    gallery: look("malacca-regal-bride-attire", 1),
  },
  {
    slug: "kelantan-mak-yong-elegance-attire",
    name: "Kelantan Mak Yong Elegance Attire",
    category: "two-piece",
    location: "Back Alley, Kuala Lumpur",
    description:
      "A sheer fishnet cape trimmed in yellow pompoms over a purple songket-pattern skirt, topped with a tall pointed crown.",
    photo: "/editorial/kelantan-mak-yong-elegance-attire/01.jpg",
    gallery: look("kelantan-mak-yong-elegance-attire", 2),
  },
  {
    slug: "baba-nyonya-attire",
    name: "Baba Nyonya Attire",
    category: "two-piece",
    location: "Upper House Rooftop, Kuala Lumpur",
    description:
      "Two beaded kebaya-style tops — one floral, one teal — each paired with a satin skirt, shot together on a rooftop at dusk.",
    photo: "/editorial/baba-nyonya-attire/01.jpg",
    gallery: look("baba-nyonya-attire", 8),
  },
  {
    slug: "malaysia-batik-gown-1-2",
    name: "Malaysia Batik Gown 1",
    category: "gown",
    location: "Kwai Chai Hong",
    description:
      "An ornate floral batik sheath gown with a matching structured cape, shot in Kwai Chai Hong's lantern-lit alley.",
    photo: "/editorial/malaysia-batik-gown-1-2/01.jpg",
    gallery: look("malaysia-batik-gown-1-2", 5),
  },
  {
    slug: "negeri-sembilan-minangkabau-attire",
    name: "Negeri Sembilan Minangkabau Attire",
    category: "gown",
    location: "Street Art Wall, Kuala Lumpur",
    description:
      "A gold crescent headdress over a maroon-and-gold brocade long-sleeve dress, set against a hand-painted mural wall.",
    photo: "/editorial/negeri-sembilan-minangkabau-attire/01.jpg",
    gallery: look("negeri-sembilan-minangkabau-attire", 1),
  },
  {
    slug: "look-12",
    name: "Lantern Garland",
    category: "gown",
    location: "Heritage Street, Kuala Lumpur",
    description:
      "A cream-and-maroon songket dress with a floral garland draped over one shoulder, beneath a street strung with paper lanterns.",
    photo: "/editorial/look-12/01.jpg",
    gallery: look("look-12", 2),
  },
  {
    slug: "terengganu-ulek-mayang-attire",
    name: "Terengganu Ulek Mayang Attire",
    category: "two-piece",
    location: "Lantern Courtyard, Kuala Lumpur",
    description:
      "A green-and-gold peplum top with sculptural shoulder pieces, a gold brocade fishtail skirt, and a flying silk sash, in a lantern-hung courtyard.",
    photo: "/editorial/terengganu-ulek-mayang-attire/01.jpg",
    gallery: look("terengganu-ulek-mayang-attire", 4),
  },
  {
    slug: "the-perak-royal-grace-attire",
    name: "The Perak Royal Grace Attire",
    category: "pantsuit",
    location: "Mural Wall, Kuala Lumpur",
    description:
      "A grey-and-blue songket peplum top with teal palazzo pants and a gold pointed crown, framed by a hand-painted fan mural.",
    photo: "/editorial/the-perak-royal-grace-attire/01.jpg",
    gallery: look("the-perak-royal-grace-attire", 2),
  },
  {
    slug: "look-15",
    name: "Kasturi Walk",
    category: "two-piece",
    location: "Kasturi Walk, Central Market",
    description:
      "A bold floral-paisley batik jacket over a solid orange skirt, shot beneath the Kasturi Walk archway by Central Market.",
    photo: "/editorial/look-15/01.jpg",
    gallery: look("look-15", 1),
  },
  {
    slug: "sarawak-dayak-heritage-attire",
    name: "Sarawak Dayak Heritage Attire",
    category: "gown",
    location: "Flower Stall Alley, Kuala Lumpur",
    description:
      "A coral satin gown with a woven songket train and a silver beaded crown, shot beside a wall of flower-garland stalls.",
    photo: "/editorial/sarawak-dayak-heritage-attire/01.jpg",
    gallery: look("sarawak-dayak-heritage-attire", 1),
  },
  {
    slug: "peranakan-elegance-bridal-attire",
    name: "Peranakan Elegance Bridal Attire",
    category: "gown",
    location: "Petaling Street",
    description:
      "A pink-and-gold brocade gown with an embroidered floral border and a pearl-tasseled headdress, outside a Petaling Street restaurant.",
    photo: "/editorial/peranakan-elegance-bridal-attire/01.jpg",
    gallery: look("peranakan-elegance-bridal-attire", 5),
  },
  {
    slug: "perak-warrior-royalty-attire",
    name: "Perak Warrior Royalty Attire",
    category: "two-piece",
    location: "Mural Alley, Kuala Lumpur",
    description:
      "A red kebaya-style top with a gold cape collar and black beaded fringe, under a winged crown as the sky turns dusk-purple.",
    photo: "/editorial/perak-warrior-royalty-attire/01.jpg",
    gallery: look("perak-warrior-royalty-attire", 5),
  },
  {
    slug: "sarawak-colorful-tribal-attire",
    name: "Sarawak Colorful Tribal Attire",
    category: "gown",
    location: "Market Alley, Kuala Lumpur",
    description:
      "A one-shoulder red satin gown with a geometric songket panel and a pompom-trimmed cape collar, shot through a market alley.",
    photo: "/editorial/sarawak-colorful-tribal-attire/01.jpg",
    gallery: look("sarawak-colorful-tribal-attire", 3),
  },
  {
    slug: "look-21",
    name: "Teahouse Arch",
    category: "pantsuit",
    location: "Heritage Shophouse, Kuala Lumpur",
    description:
      "A floral-embroidered top with sculptural shoulders, wide charcoal palazzo pants, and a silver fan crown, beneath a heritage tea-shop archway.",
    photo: "/editorial/look-21/01.jpg",
    gallery: look("look-21", 3),
  },
  {
    slug: "look-22",
    name: "Cobalt Shawl",
    category: "gown",
    location: "Wet Market, Kuala Lumpur",
    description:
      "A beaded cobalt shawl draped over a floral batik sheath dress, finished with a gold flower crown, at a lantern-strung market.",
    photo: "/editorial/look-22/01.jpg",
    gallery: look("look-22", 5),
  },
  {
    slug: "look-23",
    name: "Golden Threshold",
    category: "kaftan",
    location: "Heritage Interior, Kuala Lumpur",
    description:
      "A golden tie-dye kaftan with a red brocade sash and a sunburst crown, standing before ornate stained-glass doors.",
    photo: "/editorial/look-23/01.jpg",
    gallery: look("look-23", 2),
  },
];

export function getCostumeBySlug(slug: string): Costume | undefined {
  return costumes.find((c) => c.slug === slug);
}

export interface NewInProduct {
  id: number;
  name: string;
  highlightedName: string;
  description: string;
  price: string;
  anime: string;
}

export const newInProducts: NewInProduct[] = [
  {
    id: 1,
    name: "CURSED FORM",
    highlightedName: "HOODIE",
    description:
      "420GSM HEAVYWEIGHT · OVERSIZED · TONAL EMBROIDERY · JJK-INSPIRED",
    price: "R1,499",
    anime: "JUJUTSU KAISEN",
  },

  {
    id: 2,
    name: "GRAND LINE",
    highlightedName: "TEE",
    description:
      "220GSM HEAVYWEIGHT · RELAXED FIT · GRAPHIC BACK PRINT · ONE PIECE-INSPIRED",
    price: "R599",
    anime: "ONE PIECE",
  },

  {
    id: 3,
    name: "SAIYAN FORM",
    highlightedName: "JACKET",
    description:
      "COTTON DUCK · OVERSIZED CUT · UTILITY POCKETS · DRAGON BALL-INSPIRED",
    price: "R2,499",
    anime: "DRAGON BALL",
  },

  {
    id: 4,
    name: "FLAME BREATH",
    highlightedName: "CAP",
    description:
      "6-PANEL · EMBROIDERED · ADJUSTABLE · DEMON SLAYER-INSPIRED",
    price: "R499",
    anime: "DEMON SLAYER",
  },

  {
    id: 5,
    name: "SHINOBI TECH",
    highlightedName: "JACKET",
    description:
      "RIPSTOP · REFLECTIVE DETAILING · UTILITY FIT · NARUTO-INSPIRED",
    price: "R2,799",
    anime: "NARUTO",
  },
];
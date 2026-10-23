export interface NewInProduct {
  id: number;
  name: string;
  highlightedName: string;
  description: string;
  price: string;
  anime: string;
  collectionId: number;
  collectionCategory: string;
  collectionSku: string;
  collectionImageFileId: string;
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
    collectionId: 1,
    collectionCategory: "TOPS",
    collectionSku: "JUJUTSU-KAISEN-NEW-01",
    collectionImageFileId: "jujutsu-kaisen-tops-01.jpg",
  },

  {
    id: 2,
    name: "GRAND LINE",
    highlightedName: "TEE",
    description:
      "220GSM HEAVYWEIGHT · RELAXED FIT · GRAPHIC BACK PRINT · ONE PIECE-INSPIRED",
    price: "R599",
    anime: "ONE PIECE",
    collectionId: 2,
    collectionCategory: "TOPS",
    collectionSku: "ONE-PIECE-NEW-01",
    collectionImageFileId: "one-piece-tops-01.jpg",
  },

  {
    id: 3,
    name: "SAIYAN FORM",
    highlightedName: "JACKET",
    description:
      "COTTON DUCK · OVERSIZED CUT · UTILITY POCKETS · DRAGON BALL-INSPIRED",
    price: "R2,499",
    anime: "DRAGON BALL",
    collectionId: 3,
    collectionCategory: "JACKETS",
    collectionSku: "DBZ-26-NEW-01",
    collectionImageFileId: "dragon-ball-tops-03.jpg",
  },

  {
    id: 4,
    name: "FLAME BREATH",
    highlightedName: "CAP",
    description:
      "6-PANEL · EMBROIDERED · ADJUSTABLE · DEMON SLAYER-INSPIRED",
    price: "R499",
    anime: "DEMON SLAYER",
    collectionId: 4,
    collectionCategory: "ACCESSORIES",
    collectionSku: "DEMON-SLAYER-NEW-01",
    collectionImageFileId: "demon-slayer-shoes-01.jpg",
  },

  {
    id: 5,
    name: "SHINOBI TECH",
    highlightedName: "JACKET",
    description:
      "RIPSTOP · REFLECTIVE DETAILING · UTILITY FIT · NARUTO-INSPIRED",
    price: "R2,799",
    anime: "NARUTO",
    collectionId: 5,
    collectionCategory: "JACKETS",
    collectionSku: "NARUTO-NEW-01",
    collectionImageFileId: "naruto-tops-01.jpg",
  },
];
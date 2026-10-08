export type ProductCategory = "HOODIES" | "TEES" | "JACKETS" | "ACCESSORIES";

export interface DragonBallProduct {
  id: number;
  sku: string;
  name: string;
  highlightedName: string;
  price: number;
  badge: string;
  category: ProductCategory;
  /** File name in the Appwrite `product-images` bucket */
  imageFileId: string;
}

export const dragonBallProducts: DragonBallProduct[] = [
  {
    id: 101,
    sku: "DBZ-26-101",
    name: "GOKU OVERSIZED",
    highlightedName: "TEE",
    price: 599,
    badge: "BEST SELLER",
    category: "TEES",
    imageFileId: "dragon-ball-tops-01.jpg",
  },
  {
    id: 102,
    sku: "DBZ-26-102",
    name: "VEGETA",
    highlightedName: "HOODIE",
    price: 1499,
    badge: "NEW IN",
    category: "HOODIES",
    imageFileId: "dragon-ball-tops-02.jpg",
  },
  {
    id: 103,
    sku: "DBZ-26-103",
    name: "GOKU",
    highlightedName: "JACKET",
    price: 2499,
    badge: "POPULAR",
    category: "JACKETS",
    imageFileId: "dragon-ball-tops-03.jpg",
  },
  {
    id: 104,
    sku: "DBZ-26-104",
    name: "SPIRIT BOMB",
    highlightedName: "TEE",
    price: 599,
    badge: "LIMITED",
    category: "TEES",
    imageFileId: "dragon-ball-tops-04.jpg",
  },
  {
    id: 105,
    sku: "DBZ-26-105",
    name: "SSJ GOKU",
    highlightedName: "HOODIE",
    price: 1499,
    badge: "NEW IN",
    category: "HOODIES",
    imageFileId: "dragon-ball-tops-05.jpg",
  },
  {
    id: 106,
    sku: "DBZ-26-106",
    name: "FRIEZA",
    highlightedName: "TEE",
    price: 599,
    badge: "BEST SELLER",
    category: "TEES",
    imageFileId: "dragon-ball-tops-06.jpg",
  },
  {
    id: 107,
    sku: "DBZ-26-107",
    name: "GOHAN",
    highlightedName: "JACKET",
    price: 2499,
    badge: "NEW IN",
    category: "JACKETS",
    imageFileId: "dragon-ball-tops-07.jpg",
  },
  {
    id: 108,
    sku: "DBZ-26-108",
    name: "DRAGON BALL",
    highlightedName: "TEE",
    price: 599,
    badge: "LIMITED",
    category: "TEES",
    imageFileId: "dragon-ball-tops-08.jpg",
  },
];

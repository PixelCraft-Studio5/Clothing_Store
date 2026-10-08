export interface CollectionProduct {
  id: number;
  sku: string;
  name: string;
  highlightedName: string;
  price: number;
  badge: string;
  category: string;
  /** File name in the Appwrite `product-images` bucket */
  imageFileId: string;
}

interface BucketProductOptions {
  /** Lowercase bucket slug, e.g. "jujutsu-kaisen" */
  slug: string;
  name: string;
  price: number;
  badge: string;
}

const PIECE_TYPES = [
  { key: "tops", label: "TOP", category: "TOPS" },
  { key: "pants", label: "PANTS", category: "PANTS" },
  { key: "shoes", label: "SHOES", category: "SHOES" },
] as const;

const PIECES_PER_TYPE = 10;

/**
 * Builds one product per file in the `product-images` bucket for a series.
 * Files follow the pattern `{slug}-{tops|pants|shoes}-{01..10}.jpg`.
 */
export const createBucketProducts = ({
  slug,
  name,
  price,
  badge,
}: BucketProductOptions): CollectionProduct[] => {
  const products: CollectionProduct[] = [];
  let id = 1;

  for (const type of PIECE_TYPES) {
    for (let n = 1; n <= PIECES_PER_TYPE; n++) {
      const num = String(n).padStart(2, "0");

      products.push({
        id,
        sku: `${slug.toUpperCase()}-${type.key.toUpperCase()}-${num}`,
        name,
        highlightedName: `${type.label} ${num}`,
        price,
        badge,
        category: type.category,
        imageFileId: `${slug}-${type.key}-${num}.jpg`,
      });

      id++;
    }
  }

  return products;
};

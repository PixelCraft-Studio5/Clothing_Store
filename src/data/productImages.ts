// Public Appwrite storage settings (read-only bucket, no API key needed in the browser).
// Values come from the .env file and are exposed to the client via import.meta.env.
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const PRODUCT_IMAGES_BUCKET_ID =
  import.meta.env.VITE_APPWRITE_PRODUCT_IMAGES_BUCKET_ID;

/**
 * Builds the public view URL for a file in the `product-images` bucket.
 * Example fileId: "dragon-ball-tops-01.jpg"
 */
export const getProductImageUrl = (fileId: string): string =>
  `${APPWRITE_ENDPOINT}/storage/buckets/${PRODUCT_IMAGES_BUCKET_ID}/files/${encodeURIComponent(fileId)}/view?project=${APPWRITE_PROJECT_ID}`;

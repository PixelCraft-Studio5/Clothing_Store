// Public Appwrite storage settings (read-only bucket, no API key needed in the browser).
const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "6abbc711000145ad6e08";
const PRODUCT_IMAGES_BUCKET_ID = "product-images";

/**
 * Builds the public view URL for a file in the `product-images` bucket.
 * Example fileId: "dragon-ball-tops-01.jpg"
 */
export const getProductImageUrl = (fileId: string): string =>
  `${APPWRITE_ENDPOINT}/storage/buckets/${PRODUCT_IMAGES_BUCKET_ID}/files/${encodeURIComponent(fileId)}/view?project=${APPWRITE_PROJECT_ID}`;

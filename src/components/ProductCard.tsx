import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import type { CartItem } from "./CartDrawer";
import type { CollectionProduct } from "../data/collectionProducts";
import { getProductImageUrl } from "../data/productImages";

interface ProductCardProps {
  product: CollectionProduct;
  isTarget?: boolean;
  onAddToCart: (item: CartItem) => void;
  onOpenDetails: (product: CollectionProduct) => void;
}

const formatPrice = (price: number) => `R${price.toLocaleString("en-US")}`;

const ProductCard = ({
  product,
  isTarget = false,
  onAddToCart,
  onOpenDetails,
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const altText = `${product.name} ${product.highlightedName}`;

  return (
    <article
      id={`product-${product.sku}`}
      className={`product-card ${isTarget ? "is-target" : ""}`}
      tabIndex={isTarget ? -1 : undefined}
    >

      {/* IMAGE AREA */}
      <div className="product-image">
        <button
          className="product-image-trigger"
          type="button"
          aria-label={`View details for ${altText}`}
          onClick={() => onOpenDetails(product)}
        >
          {imageFailed ? (
            <span className="product-image-placeholder">IMAGE HERE</span>
          ) : (
            <img
              className="product-image-photo"
              src={getProductImageUrl(product.imageFileId)}
              alt={altText}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          )}
        </button>

        <button
          className={`product-wishlist ${isLiked ? "is-liked" : ""}`}
          type="button"
          aria-pressed={isLiked}
          aria-label={`Save ${altText}`}
          onClick={() => setIsLiked((liked) => !liked)}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        </button>

        <span className="product-badge">{product.badge}</span>
      </div>

      {/* DETAILS */}
      <div className="product-body">
        <div className="product-title-row">
          <div className="product-info">
            <button
              className="product-name-button"
              type="button"
              onClick={() => onOpenDetails(product)}
            >
              {product.name} <span>{product.highlightedName}</span>
            </button>
            <p className="product-sku">{product.sku}</p>
          </div>

          <div className="product-price">
            <strong>{formatPrice(product.price)}</strong>
            <span>INCL. VAT</span>
          </div>
        </div>

        <button
          className="product-add"
          type="button"
          onClick={() =>
            onAddToCart({
              id: product.sku,
              name: altText,
              code: product.sku,
              price: product.price,
              quantity: 1,
            })
          }
        >
          ADD <Plus size={14} />
        </button>
      </div>

    </article>
  );
};

export default ProductCard;

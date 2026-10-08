import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import type { CollectionProduct } from "../data/collectionProducts";
import { getProductImageUrl } from "../data/productImages";

interface ProductCardProps {
  product: CollectionProduct;
}

const formatPrice = (price: number) => `R${price.toLocaleString("en-US")}`;

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const altText = `${product.name} ${product.highlightedName}`;

  return (
    <article className="product-card">

      {/* IMAGE AREA */}
      <div className="product-image">
        <span className="product-badge">{product.badge}</span>

        <button
          className={`product-wishlist ${isLiked ? "is-liked" : ""}`}
          type="button"
          aria-pressed={isLiked}
          aria-label={`Save ${altText}`}
          onClick={() => setIsLiked((liked) => !liked)}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
        </button>

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
      </div>

      {/* DETAILS */}
      <div className="product-body">
        <div className="product-title-row">
          <div className="product-info">
            <h3>
              {product.name} <span>{product.highlightedName}</span>
            </h3>
            <p className="product-sku">{product.sku}</p>
          </div>

          <div className="product-price">
            <strong>{formatPrice(product.price)}</strong>
            <span>INCL. VAT</span>
          </div>
        </div>

        <button className="product-add" type="button">
          ADD <Plus size={14} />
        </button>
      </div>

    </article>
  );
};

export default ProductCard;

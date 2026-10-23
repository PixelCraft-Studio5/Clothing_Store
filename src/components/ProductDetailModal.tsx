import { useEffect, useState } from "react";
import { ArrowRight, RefreshCw, Truck, X } from "lucide-react";
import type { CollectionProduct } from "../data/collectionProducts";
import type { CartItem } from "./CartDrawer";
import { getProductImageUrl } from "../data/productImages";

interface ProductDetailModalProps {
  product: CollectionProduct;
  collectionName: string;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const formatPrice = (price: number) =>
  `R${price.toLocaleString("en-ZA")}`;

const ProductDetailModal = ({
  product,
  collectionName,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) => {
  const [selectedSize, setSelectedSize] = useState("L");
  const [imageFailed, setImageFailed] = useState(false);
  const productName = `${product.name} ${product.highlightedName}`;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleAddToBag = () => {
    onAddToCart({
      id: `${product.sku}-${selectedSize}`,
      name: `${productName} / ${selectedSize}`,
      code: product.sku,
      price: product.price,
      quantity: 1,
    });
    onClose();
  };

  return (
    <div
      className="product-detail-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="product-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
      >
        <div className="product-detail-gallery">
          <div className="product-detail-thumbnails" aria-hidden="true">
            <div className="product-detail-thumbnail is-active">
              {!imageFailed && (
                <img src={getProductImageUrl(product.imageFileId)} alt="" />
              )}
            </div>
          </div>

          <div className="product-detail-image">
            {imageFailed ? (
              <span className="product-image-placeholder">IMAGE HERE</span>
            ) : (
              <img
                src={getProductImageUrl(product.imageFileId)}
                alt={productName}
                onError={() => setImageFailed(true)}
              />
            )}
            <span className="product-detail-image-count">1 / 1</span>
          </div>
        </div>

        <div className="product-detail-info">
          <button
            className="product-detail-close"
            type="button"
            onClick={onClose}
            aria-label="Close product details"
          >
            <X size={20} />
          </button>

          <span className="product-detail-badge">{product.badge}</span>
          <p className="product-detail-collection">{collectionName}</p>
          <h2 id="product-detail-title">
            {product.name}
            <span>{product.highlightedName}</span>
          </h2>
          <p className="product-detail-sku">{product.sku}</p>

          <div className="product-detail-price">
            <strong>{formatPrice(product.price)}</strong>
            <span>INCL. VAT</span>
          </div>

          <p className="product-detail-description">
            Made for everyday wear, this {product.category.toLowerCase()} piece
            brings {collectionName} energy to your rotation.
          </p>

          <div className="product-detail-size">
            <div className="product-detail-size-heading">
              <span>SIZE</span>
              <span>{selectedSize} SELECTED</span>
            </div>
            <div className="product-detail-size-options">
              {SIZES.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "is-selected" : ""}
                  type="button"
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            className="product-detail-add"
            type="button"
            onClick={handleAddToBag}
          >
            ADD TO BAG <ArrowRight size={17} />
          </button>

          <div className="product-detail-promises">
            <span><Truck size={19} /> FREE SHIPPING OVER R 3,500</span>
            <span><RefreshCw size={17} /> 30-DAY EXCHANGE</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailModal;

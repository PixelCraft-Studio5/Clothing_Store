import type { NewInProduct } from "../data/newInProducts";
import type { CartItem } from "./CartDrawer";

interface NewInRowProps {
  product: NewInProduct;
  onAddToCart: (item: CartItem) => void;
}

const NewInRow = ({ product, onAddToCart }: NewInRowProps) => {
  const addProductToCart = () => {
    onAddToCart({
      id: product.id,
      name: `${product.name} ${product.highlightedName}`,
      code: product.anime,
      price: Number(product.price.replace(/[^\d]/g, "")),
      quantity: 1,
    });
  };

  return (
    <article className="new-in-row">

      {/* NUMBER */}

      <div className="new-in-number">
        {String(product.id).padStart(2, "0")}
      </div>


      {/* PRODUCT NAME */}

      <div className="new-in-product">

        <h2>
          {product.name}{" "}

          <span>
            {product.highlightedName}
          </span>
        </h2>

      </div>


      {/* DESCRIPTION */}

      <div className="new-in-description">

        <p>
          {product.description}
        </p>

        <span className="new-in-anime">
          {product.anime}
        </span>

      </div>


      {/* PRICE */}

      <div className="new-in-price">

        <strong>
          {product.price}
        </strong>

        <span>
          INCL. VAT
        </span>

      </div>


      {/* PRODUCT ACTIONS */}
      <div className="new-in-actions">
        <a className="new-in-view" href="#collection">
          VIEW IN COLLECTION
        </a>

        <button
          className="new-in-add"
          type="button"
          onClick={addProductToCart}
        >
          ADD TO BAG
        </button>
      </div>

    </article>
  );
};

export default NewInRow;
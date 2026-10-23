import type { CartItem } from "../components/CartDrawer";
import NewInRow from "../components/NewInRow";
import { newInProducts } from "../data/newInProducts";
import "../styles/new-in.css";

interface NewInProps {
  onAddToCart: (item: CartItem) => void;
  onViewInCollection: (product: (typeof newInProducts)[number], origin: DOMRect) => void;
}

const NewIn = ({ onAddToCart, onViewInCollection }: NewInProps) => {
  return (

    <main className="new-in-page" id="new">

      {/* =================================
          HEADER
      ================================= */}

      <header className="new-in-header">

        <h1 className="new-in-title">

          <span>NEW</span>

          <span className="orange">
            IN
          </span>

        </h1>


        <div className="new-in-count">

          THIS WEEK — {newInProducts.length * 5} PIECES

        </div>

      </header>


      {/* =================================
          PRODUCT LIST
      ================================= */}

      <section className="new-in-list">

        {newInProducts.map((product) => (

          <NewInRow
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewInCollection={onViewInCollection}
          />

        ))}

      </section>


    </main>

  );
};

export default NewIn;
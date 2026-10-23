import { useEffect } from "react";
import "../styles/cart.css";

export interface CartItem {
  id: number | string;
  name: string;
  code: string;
  price: number;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: CartItem["id"]) => void;
}

const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onRemove,
}: CartDrawerProps) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return `R${price.toLocaleString("en-ZA")}`;
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* BACKDROP */}
      <button
        type="button"
        className={`cart-backdrop ${isOpen ? "cart-backdrop--visible" : ""}`}
        onClick={onClose}
        aria-label="Close shopping bag"
        tabIndex={isOpen ? 0 : -1}
      />

      {/* CART DRAWER */}
      <aside
        id="cart-drawer"
        role="dialog"
        aria-modal={isOpen}
        aria-labelledby="cart-title"
        className={`cart-drawer ${
          isOpen ? "cart-drawer--open" : ""
        }`}
        aria-hidden={!isOpen}
      >
        {/* HEADER */}
        <header className="cart-header">
          <h2 id="cart-title">
            BAG <span>({itemCount})</span>
          </h2>

          <button
            type="button"
            className="cart-close"
            onClick={onClose}
            aria-label="Close shopping bag"
          >
            CLOSE <span>×</span>
          </button>
        </header>

        {/* CART CONTENT */}
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>YOUR BAG IS EMPTY.</p>

              <button
                type="button"
                className="cart-empty-button"
                onClick={onClose}
              >
                CONTINUE SHOPPING →
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    <p>
                      {item.code} · QTY {item.quantity}
                    </p>
                  </div>

                  <div className="cart-item-price">
                    <strong>
                      {formatPrice(item.price * item.quantity)}
                    </strong>

                    <button
                      onClick={() => onRemove(item.id)}
                      className="remove-item"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CART FOOTER */}
        <footer className="cart-footer">
          <div className="cart-subtotal">
            <span>SUBTOTAL</span>

            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <button
            className="checkout-button"
            type="button"
            disabled={items.length === 0}
          >
            CHECKOUT
            <span>→</span>
          </button>

          <p className="cart-note">
            FREE SHIPPING OVER R 3,500&nbsp;&nbsp; · &nbsp;&nbsp;
            30-DAY EXCHANGE
          </p>
        </footer>
      </aside>
    </>
  );
};

export default CartDrawer;
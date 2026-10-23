import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";

export interface CollectionNavItem {
  id: number;
  label: string;
}

interface NavbarProps {
  cartCount: number;
  cartAdditionSignal?: number;
  isCartOpen: boolean;
  onCartOpen: () => void;
  onNavigate?: () => void;
  collectionItems?: CollectionNavItem[];
  activeCollectionId?: number;
  onCollectionNavigate?: (collectionId: number, origin: DOMRect) => void;
}

const Navbar = ({
  cartCount,
  cartAdditionSignal = 0,
  isCartOpen,
  onCartOpen,
  onNavigate,
  collectionItems,
  activeCollectionId,
  onCollectionNavigate,
}: NavbarProps) => {
  const previousAdditionSignal = useRef(cartAdditionSignal);
  const [bagAnimationKey, setBagAnimationKey] = useState(0);

  useEffect(() => {
    if (previousAdditionSignal.current === cartAdditionSignal) return;

    previousAdditionSignal.current = cartAdditionSignal;
    setBagAnimationKey((key) => key + 1);
  }, [cartAdditionSignal]);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <a className="logo" href="#home" aria-label="PIXEL home" onClick={onNavigate}>
        PIX<span>EL</span>
      </a>

      {/* NAVIGATION */}
      <div className="nav-links">
        {collectionItems ? (
          collectionItems.map((item) => (
            <a
              key={item.id}
              href={`#collection-${item.id}`}
              aria-current={
                item.id === activeCollectionId ? "page" : undefined
              }
              onClick={(event) => {
                event.preventDefault();
                onCollectionNavigate?.(
                  item.id,
                  event.currentTarget.getBoundingClientRect()
                );
              }}
            >
              {item.label}
            </a>
          ))
        ) : (
          <>
            <a href="#collection" onClick={onNavigate}>COLLECTION</a>
            <a href="#drop02" onClick={onNavigate}>DROP 02</a>
            <a href="#lookbook" onClick={onNavigate}>LOOKBOOK</a>
            <a href="#new" onClick={onNavigate}>NEW IN</a>
          </>
        )}
      </div>

      {/* BAG */}
      <button
        className="bag-button"
        onClick={onCartOpen}
        aria-label={`Open shopping bag, ${cartCount} item${
          cartCount === 1 ? "" : "s"
        }`}
        aria-controls="cart-drawer"
        aria-expanded={isCartOpen}
        aria-haspopup="dialog"
      >
        <ShoppingBag
          key={bagAnimationKey}
          className={bagAnimationKey > 0 ? "bag-icon--added" : undefined}
          size={14}
          strokeWidth={1.5}
        />
        <span>BAG ({cartCount})</span>
      </button>
    </nav>
  );
};

export default Navbar;
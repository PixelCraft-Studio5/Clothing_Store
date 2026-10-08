import { ShoppingBag } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  isCartOpen: boolean;
  onCartOpen: () => void;
}

const Navbar = ({
  cartCount,
  isCartOpen,
  onCartOpen,
}: NavbarProps) => {
  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        PIX<span>EL</span>
      </div>

      {/* NAVIGATION */}
      <div className="nav-links">
        <a href="#collection">COLLECTION</a>
        <a href="#drop02">DROP 02</a>
        <a href="#lookbook">LOOKBOOK</a>
        <a href="#new">NEW IN</a>
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
        <ShoppingBag size={14} strokeWidth={1.5} />
        <span>BAG ({cartCount})</span>
      </button>
    </nav>
  );
};

export default Navbar;
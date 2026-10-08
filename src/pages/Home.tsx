import { useCallback, useState } from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import HeroGallery from "../components/HeroGallery";
import HeroContent from "../components/HeroContent";
import BottomStatusBar from "../components/BottomStatusBar";
import CartDrawer, { type CartItem } from "../components/CartDrawer";
import Collection from "./Collection";
import Inked from "./Inked";
import AfterDark from "./AfterDark";
import Lookbook from "./Lookbook";
import NewIn from "./NewIn";
import FinalPage from "./FinalPage";

const Home = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);

  const addToCart = (item: CartItem) => {
    setCartItems((items) => {
      const existingItem = items.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...items, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <>
      <main className="site">
        <AnnouncementBar />

        <Navbar
          cartCount={cartCount}
          isCartOpen={isCartOpen}
          onCartOpen={openCart}
        />

        <section className="hero" id="drop02">
          <HeroGallery />
          <HeroContent />
        </section>

        <BottomStatusBar />

        <Inked />

        <Collection />

        <AfterDark />

        <Lookbook />

        <NewIn onAddToCart={addToCart} />

        <FinalPage />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        onRemove={removeFromCart}
      />
    </>
  );
};

export default Home;

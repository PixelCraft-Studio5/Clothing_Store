import { useCallback, useState } from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import Navbar from "../components/Navbar";
import HeroGallery from "../components/HeroGallery";
import HeroContent from "../components/HeroContent";
import BottomStatusBar from "../components/BottomStatusBar";
import CartDrawer, { type CartItem } from "../components/CartDrawer";
import CheckoutFlow from "../components/CheckoutFlow";
import Collection from "./Collection";
import Inked from "./Inked";
import AfterDark from "./AfterDark";
import Lookbook from "./Lookbook";
import NewIn from "./NewIn";
import FinalPage from "./FinalPage";
import type { CollectionNavigationTarget } from "./Collection";

const Home = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartAdditionSignal, setCartAdditionSignal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCollection, setActiveCollection] =
    useState<CollectionNavigationTarget | null>(null);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);

  const addToCart = (item: CartItem) => {
    setCartAdditionSignal((signal) => signal + 1);
    setCartItems((items) => {
      const existingItem = items.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return items.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
              }
            : cartItem
        );
      }

      return [...items, { ...item }];
    });
  };

  const removeFromCart = (id: CartItem["id"]) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  if (isCheckoutOpen) {
    return (
      <CheckoutFlow
        items={cartItems}
        onBackToBag={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
        onComplete={() => {
          setCartItems([]);
          setIsCheckoutOpen(false);
        }}
      />
    );
  }

  return (
    <>
      <main className="site" id="home">
        <AnnouncementBar />

        <Navbar
          cartCount={cartCount}
          cartAdditionSignal={cartAdditionSignal}
          isCartOpen={isCartOpen}
          onCartOpen={openCart}
        />

        <section className="hero">
          <HeroGallery />
          <HeroContent />
        </section>

        <BottomStatusBar />

        <Inked />

        <Collection
          activeCollection={activeCollection}
          onOpenCollection={setActiveCollection}
          onCloseCollection={() => setActiveCollection(null)}
          cartCount={cartCount}
          cartAdditionSignal={cartAdditionSignal}
          isCartOpen={isCartOpen}
          onCartOpen={openCart}
          onAddToCart={addToCart}
        />

        <AfterDark />

        <Lookbook />

        <NewIn
          onAddToCart={addToCart}
          onViewInCollection={(product, rect) =>
            setActiveCollection({
              collectionId: product.collectionId,
              category: product.collectionCategory,
              productSku: product.collectionSku,
              origin: {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
              },
            })
          }
        />

        <FinalPage />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        items={cartItems}
        onRemove={removeFromCart}
      />
    </>
  );
};

export default Home;

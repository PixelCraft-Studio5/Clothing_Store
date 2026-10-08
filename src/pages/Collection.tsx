import { useMemo, useState } from "react";

import CollectionOverlay, {
  type CollectionOverlayConfig,
  type OriginRect,
} from "../components/CollectionOverlay";

import CollectionCard, {
  type CollectionItem,
} from "../components/CollectionCard";

import CollectionHeader from "../components/CollectionHeader";

import { dragonBallProducts } from "../data/dragonBallProducts";
import { createBucketProducts } from "../data/collectionProducts";

import "../styles/collection.css";
import jujutsuImage from "../assets/wallpaper sukuna e itadori JJK.jfif";
import onePieceImage from "../assets/onepeice.jfif";
import dragonBallImage from "../assets/DBz.jfif";
import demonSlayerImage from "../assets/demonslayer.jfif";
import narutoImage from "../assets/naruto.jfif";

const collections: CollectionItem[] = [
  {
    id: 1,
    title: "JUJUTSU KAISEN",
    items: 24,
    tag: "CURSED ENERGY",
    image: jujutsuImage,
  },

  {
    id: 2,
    title: "ONE PIECE",
    items: 21,
    tag: "GRAND LINE",
    image: onePieceImage,
  },

  {
    id: 3,
    title: "DRAGON BALL",
    items: 18,
    tag: "KI DETECTED",
    tagStyle: "orange",
    image: dragonBallImage,
  },

  {
    id: 4,
    title: "DEMON SLAYER",
    items: 14,
    tag: "BREATHING FORM",
    image: demonSlayerImage,
  },

  {
    id: 5,
    title: "NARUTO",
    items: 30,
    tag: "SHINOBI CODE",
    image: narutoImage,
  },
];

const BUCKET_TABS = ["ALL", "TOPS", "PANTS", "SHOES"];
const EYEBROW = "ANIME INSPIRED STREETWEAR";

/** Overlay content for each collection, keyed by collection id. */
const overlayConfigs: Record<number, CollectionOverlayConfig> = {
  1: {
    title: "JUJUTSU KAISEN",
    eyebrow: EYEBROW,
    tagline: "CURSED ENERGY",
    description: "Explore our Jujutsu Kaisen collection — built around the sorcerers and the cursed world they protect.",
    backgroundImage: jujutsuImage,
    tabs: BUCKET_TABS,
    products: createBucketProducts({ slug: "jujutsu-kaisen", name: "JUJUTSU KAISEN", price: 1499, badge: "NEW IN" }),
  },

  2: {
    title: "ONE PIECE",
    eyebrow: EYEBROW,
    tagline: "GRAND LINE",
    description: "Explore our One Piece collection — built for the crew, the voyage, and the search for the greatest treasure.",
    backgroundImage: onePieceImage,
    tabs: BUCKET_TABS,
    products: createBucketProducts({ slug: "one-piece", name: "ONE PIECE", price: 599, badge: "NEW IN" }),
  },

  3: {
    title: "DRAGON BALL Z",
    eyebrow: EYEBROW,
    tagline: "POWER. LEGACY. NO LIMITS.",
    description: "Explore our Dragon Ball Z collection — inspired by the warriors, the battles, and the dream.",
    backgroundImage: dragonBallImage,
    tabs: ["ALL", "HOODIES", "TEES", "JACKETS", "ACCESSORIES"],
    products: dragonBallProducts,
  },

  4: {
    title: "DEMON SLAYER",
    eyebrow: EYEBROW,
    tagline: "BREATHING FORM",
    description: "Explore our Demon Slayer collection — built around the breathing styles, the hunters, and the night.",
    backgroundImage: demonSlayerImage,
    tabs: BUCKET_TABS,
    products: createBucketProducts({ slug: "demon-slayer", name: "DEMON SLAYER", price: 499, badge: "NEW IN" }),
  },

  5: {
    title: "NARUTO",
    eyebrow: EYEBROW,
    tagline: "SHINOBI CODE",
    description: "Explore our Naruto collection — inspired by the village, the shinobi, and the will of fire.",
    backgroundImage: narutoImage,
    tabs: BUCKET_TABS,
    products: createBucketProducts({ slug: "naruto", name: "NARUTO", price: 2799, badge: "NEW IN" }),
  },
};

interface ActiveCollection {
  id: number;
  origin: OriginRect;
}

const Collection = () => {
  const [active, setActive] = useState<ActiveCollection | null>(null);

  const activeConfig = useMemo(
    () => (active ? overlayConfigs[active.id] : undefined),
    [active]
  );

  const handleSelect = (collection: CollectionItem, rect: DOMRect) => {
    setActive({
      id: collection.id,
      origin: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
    });
  };

  return (
    <main className="collection-page" id="collection">

      {/* HEADER */}
      <CollectionHeader />

      {/* COLLECTION GRID */}
      <section className="collection-grid">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onSelect={handleSelect}
          />
        ))}
      </section>

      {active && activeConfig && (
        <CollectionOverlay
          config={activeConfig}
          origin={active.origin}
          onClose={() => setActive(null)}
        />
      )}

    </main>
  );
};

export default Collection;

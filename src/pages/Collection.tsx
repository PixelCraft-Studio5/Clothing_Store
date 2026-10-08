import CollectionCard, {
  type CollectionItem,
} from "../components/CollectionCard";

import CollectionHeader from "../components/CollectionHeader";

import "../styles/collection.css";
import jujutsuImage from "../assets/jujutsu-kaisen.jpg";
import onePieceImage from "../assets/one-piece.jpg";
import dragonBallImage from "../assets/dragon-ball-z.jpg";
import demonSlayerImage from "../assets/demon-slayer.jpg";
import narutoImage from "../assets/naruto.jpg";

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

const Collection = () => {
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
          />
        ))}
      </section>

    </main>
  );
};

export default Collection;
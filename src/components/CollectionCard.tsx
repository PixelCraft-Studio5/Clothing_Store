import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export interface CollectionItem {
  id: number;
  title: string;
  items: number;
  tag: string;
  tagStyle?: "normal" | "orange";
  image?: string;
}

interface CollectionCardProps {
  collection: CollectionItem;
  onSelect?: (collection: CollectionItem, rect: DOMRect) => void;
}

const CollectionCard = ({ collection, onSelect }: CollectionCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="collection-card">
      {/* IMAGE AREA */}
      <div
        className="collection-image"
        role="button"
        tabIndex={0}
        onClick={(event) =>
          onSelect?.(collection, event.currentTarget.getBoundingClientRect())
        }
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect?.(collection, event.currentTarget.getBoundingClientRect());
          }
        }}
      >
        {collection.image && !imageFailed ? (
          <img
            src={collection.image}
            alt={`${collection.title} collection`}
            onError={() => setImageFailed(true)}
          />
        ) : null}

        {/* TAG */}
        <div
          className={`collection-tag ${
            collection.tagStyle === "orange" ? "orange-tag" : ""
          }`}
        >
          {collection.tag}
        </div>

        {/* HOVER OVERLAY */}
        <div className="collection-overlay">
          <span>VIEW COLLECTION</span>

          <ArrowUpRight size={18} />
        </div>

        {/* BOTTOM GRADIENT */}
        <div className="collection-gradient" />

        {/* CARD INFORMATION */}
        <div className="collection-info">
          <h2>{collection.title}</h2>

          <div className="collection-count">
            <span className="count-orange">·</span>

            <span className="count-number">
              {collection.items.toString().padStart(2, "0")}
            </span>

            <span className="count-label">ITEMS</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CollectionCard;
import { useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import type { CollectionProduct } from "../data/collectionProducts";
import "../styles/dragon-ball.css";
import "../styles/dragon-ball-toolbar.css";
import "../styles/dragon-ball-product.css";

export interface OriginRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface CollectionOverlayConfig {
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  backgroundImage: string;
  /** Category tabs. The first entry must be "ALL". */
  tabs: string[];
  products: CollectionProduct[];
}

interface CollectionOverlayProps {
  config: CollectionOverlayConfig;
  origin: OriginRect;
  onClose: () => void;
}

type SortOption = "featured" | "price-asc" | "price-desc";

const PAGES = ["01", "02", "03", "04", "05"];
const CLOSE_DURATION_MS = 700;

const CollectionOverlay = ({ config, origin, onClose }: CollectionOverlayProps) => {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isClosing, setIsClosing] = useState(false);

  const visibleProducts = useMemo(() => {
    const filtered =
      activeTab === "ALL"
        ? config.products
        : config.products.filter((product) => product.category === activeTab);

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [activeTab, sortBy, config.products]);

  const handleClose = () => {
    if (isClosing) return;

    setIsClosing(true);
    window.setTimeout(onClose, CLOSE_DURATION_MS);
  };

  const stageStyle = {
    "--origin-top": `${origin.top}px`,
    "--origin-left": `${origin.left}px`,
    "--origin-width": `${origin.width}px`,
    "--origin-height": `${origin.height}px`,
  } as CSSProperties;

  return (
    <div
      className={`dbz-stage ${isClosing ? "is-closing" : ""}`}
      style={stageStyle}
    >
      {/* BACKGROUND LAYERS */}
      <div className="dbz-backdrop" />

      <div className="dbz-bg">
        <img src={config.backgroundImage} alt="" />
      </div>

      {/* CONTENT */}
      <div className="dbz-content">

        <header className="dbz-hero">
          <button className="dbz-back" type="button" onClick={handleClose}>
            <ArrowLeft size={16} />
            BACK TO COLLECTION
          </button>

          <p className="dbz-eyebrow">{config.eyebrow}</p>

          <h1 className="dbz-title">{config.title}</h1>

          <p className="dbz-tagline">{config.tagline}</p>

          <p className="dbz-description">{config.description}</p>

          <span className="dbz-rule" />
        </header>

        <div className="dbz-toolbar">
          <nav className="dbz-tabs">
            {config.tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`dbz-tab ${activeTab === tab ? "is-active" : ""}`}
                aria-pressed={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>

          <label className="dbz-sort">
            <span>SORT BY</span>

            <div className="dbz-select-wrap">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
              >
                <option value="featured">FEATURED</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
              </select>
              <ChevronDown size={16} />
            </div>
          </label>
        </div>

        <section className="dbz-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {visibleProducts.length === 0 && (
            <p className="dbz-empty">NO PIECES IN THIS CATEGORY YET</p>
          )}
        </section>

        <footer className="dbz-pagination">
          <div className="dbz-pages">
            {PAGES.map((page, index) => (
              <button
                key={page}
                type="button"
                className={index === 0 ? "is-active" : ""}
              >
                {page}
              </button>
            ))}
          </div>

          <div className="dbz-arrows">
            <button type="button" aria-label="Previous page">
              <ArrowLeft size={18} />
            </button>
            <button type="button" aria-label="Next page">
              <ArrowRight size={18} />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default CollectionOverlay;

import { ArrowUpRight } from "lucide-react";

const HeroContent = () => {
  return (
    <div className="hero-content">
      {/* BACKGROUND WIREFRAME */}
      <div className="wireframe wireframe-one" />
      <div className="wireframe wireframe-two" />
      <div className="wireframe wireframe-three" />

      {/* SMALL LABEL */}
      <div className="season-label">
        <span />
        SEASON 26 — DROP 02
      </div>

      {/* MAIN TITLE */}
      <h1 className="hero-title">
        <span>BUILT</span>
        <span>AROUND</span>

        <span className="orange">ANIME.</span>

        <span>DESIGNED</span>
        <span>TO BE</span>
        <span>WORN.</span>
      </h1>

      {/* DESCRIPTION */}
      <p className="hero-description">
        Heavyweight blanks. Hand-pulled
        <br />
        prints. Oversized silhouettes. A
        <br />
        limited collection inspired by
        <br />
        the series that stayed with us.
      </p>

      {/* CTA */}
      <div className="hero-actions">
        <a className="shop-button" href="#collection">
          SHOP COLLECTION
          <ArrowUpRight size={15} />
        </a>

        <div className="collection-stats">
          <span className="orange-text">108</span>
          <span>PIECES</span>

          <span className="separator">·</span>

          <span className="orange-text">26</span>
          <span>NEW THIS WEEK</span>
        </div>
      </div>

      {/* RUN INFORMATION */}
      <div className="run-info">
        RUN I — CITY / RUN II — AFTERDARK
      </div>
    </div>
  );
};

export default HeroContent;
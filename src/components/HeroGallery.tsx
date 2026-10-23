import { useState } from "react";
import heroImage from "../assets/hero.jpg";

const HeroGallery = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="hero-gallery">
      {/* TOP LABEL */}
      <div className="gallery-label">
        <span className="orange-square" />
        DROP 02 — LIVE
      </div>

      {/* CROSSHAIR */}
      <div className="crosshair">
        <span className="crosshair-horizontal" />
        <span className="crosshair-vertical" />
        <span className="crosshair-circle" />
      </div>

      {/* MAIN IMAGE AREA */}
      <div className={`hero-media ${imageLoaded ? "loaded" : ""}`}>
        {heroImage && (
          <img
            src={heroImage}
            alt="Campaign"
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </div>

      {/* ORANGE CIRCLE */}
      <div className="vertical-circle">
        <span>WEAR</span>
        <span>YOUR</span>
        <span>OWN</span>
        <span>CODE</span>
      </div>

      {/* PROJECT LABEL */}
      <div className="project-label">
        <span>PROJECT EVA</span>
        <strong>&gt;01</strong>
        <small>REBUILD OF STREETWEAR</small>
      </div>

      {/* BOTTOM LEFT DATA */}
      <div className="campaign-info">
        <span>SS/26 — CAMPAIGN 02</span>

        <span className="coordinates">
          35.6762° N · 139.6503° E
        </span>
      </div>

      {/* DECORATIVE CIRCLE */}
      <div className="lower-circle">
        <span>NR</span>
      </div>

      {/* DECORATIVE LABEL */}
      <div className="nerve-label">
        <div className="globe">
          ◎
        </div>

        <div>
          <strong>NERV ONLY</strong>
          <small>HIGH FREQUENCY / NEW ERA</small>
        </div>
      </div>
    </div>
  );
};

export default HeroGallery;

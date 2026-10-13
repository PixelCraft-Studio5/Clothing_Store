import LookbookImage from "../components/LookbookImage";
import catDragonBall from "../assets/cat-dragon-ball.jpg";
import catJujutsu from "../assets/cat-jujutsu.jpg";
import jewelryImage from "../assets/Subtle Anime Jewelry for Adults — Fandom You Can Wear to Work.jfif";

import "../styles/lookbook.css";

const Lookbook = () => {
  return (
    <main className="lookbook-page" id="lookbook">

      {/* =====================================
          HEADER
      ====================================== */}

      <header className="lookbook-header">

        <h1 className="lookbook-title">
          <span className="lookbook-white">
            LOOK
          </span>

          <span className="lookbook-orange">
            BOOK
          </span>
        </h1>

        <div className="lookbook-header-meta">
          PRINTS — RUN I / II
        </div>

      </header>


      {/* =====================================
          IMAGE GRID
      ====================================== */}

      <section className="lookbook-grid">

        {/* LARGE IMAGE (spans full height, left) */}
        <LookbookImage
          className="lookbook-main-image"
          image={catDragonBall}
          number=""
          caption="RUN I — CITY · MODEL 04"
        />

        {/* SMALL IMAGE (top right) */}
        <LookbookImage
          className="lookbook-side-image"
          image={catJujutsu}
          number="02"
          caption="RUN II — AFTERDARK · MODEL 11"
        />

        {/* EDITORIAL IMAGE (bottom right — technical text overlaps it) */}
        <div className="lookbook-jewelry">

          <div className="lookbook-technical-media">
            <img
              src={jewelryImage}
              alt="Subtle anime jewelry — fandom you can wear to work"
            />
          </div>

          <div className="lookbook-technical-caption">

            <div>
              SHOT ON LOCATION 35.6762° N,
            </div>

            <div>
              139.6503° E
            </div>

            <div>
              PROCESSED — HALFTONE 45 LPI
            </div>

            <div>
              · GRAIN 12%
            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          BOTTOM EDITORIAL
      ====================================== */}

      <section className="lookbook-footer">

        {/* BIG STATEMENT */}

        <h2 className="lookbook-statement">

          <span>
            ONE SILHOUETTE,
          </span>

          <span className="statement-orange">
            EVERY ARC.
          </span>

        </h2>

      </section>

    </main>
  );
};

export default Lookbook;
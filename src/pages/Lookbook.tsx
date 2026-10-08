import LookbookImage from "../components/LookbookImage";

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

        {/* LARGE IMAGE */}
        <LookbookImage
          className="lookbook-main-image"
          number=""
          caption="RUN I — CITY · MODEL 04"
        />

        {/* SMALL IMAGE */}
        <LookbookImage
          className="lookbook-side-image"
          number="02"
          caption="RUN II — AFTERDARK · MODEL 11"
        />

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


        {/* TECHNICAL INFO */}

        <div className="lookbook-technical">

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

      </section>

    </main>
  );
};

export default Lookbook;
import OrangeDivider from "../components/OrangeDivider";
import DropButton from "../components/DropButton";

import "../styles/after-dark.css";

const AfterDark = () => {
  const handleShopDrop = () => {
    console.log("Opening After Dark drop...");
  };

  return (
    <main className="after-dark-page">

      {/* TOP PAGE BREAKER */}
      <OrangeDivider />

      {/* MAIN DROP SECTION */}
      <section className="after-dark-hero">

        {/* HUGE BACKGROUND TEXT */}
        <div
          className="after-dark-background"
          aria-hidden="true"
        >
          DROP 02
        </div>

        {/* CONTENT */}
        <div className="after-dark-content">

          {/* DROP LABEL */}
          <div className="after-dark-label">
            SS/26&nbsp;&nbsp;·&nbsp;&nbsp;DROP 02
          </div>

          {/* TITLE */}
          <h1 className="after-dark-title">

            <span className="title-white">
              AFTER
            </span>

            <span className="title-orange">
              DARK
            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="after-dark-description">
            Reflective graphics. Dark colourways.
            <br />
            Oversized fits. A 48-piece release
            <br />
            inspired by the night-time worlds of
            <br />
            anime.
          </p>

          {/* RELEASE TIME */}
          <div className="after-dark-date">
            FRIDAY&nbsp;&nbsp;·&nbsp;&nbsp;22:00
          </div>

          {/* BUTTON */}
          <DropButton onClick={handleShopDrop}>
            SHOP THE DROP
          </DropButton>

          {/* STATS */}
          <div className="after-dark-stats">

            <div className="after-dark-stat">
              <strong>22:00</strong>

              <span>
                RELEASE
              </span>
            </div>

            <div className="after-dark-stat">
              <strong>48</strong>

              <span>
                PIECES
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* BOTTOM PAGE BREAKER */}
      <OrangeDivider />

    </main>
  );
};

export default AfterDark;
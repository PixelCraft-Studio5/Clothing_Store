import "../styles/FinalCTA.css";

const FinalCTA = () => {
  return (
    <section className="final-cta">

      {/* TOP ORANGE LINE */}
      <div className="final-cta-line" />

      <div className="final-cta-content">

        {/* SMALL LABEL */}

        <p className="final-cta-kicker">
          THE WHOLE CATALOGUE — 108 PIECES
        </p>


        {/* LARGE TITLE */}

        <h1 className="final-cta-title">

          <span className="final-cta-white">
            REP YOUR
          </span>

          <span className="final-cta-orange">
            ARC.
          </span>

        </h1>


        {/* BACKGROUND WORD */}

        <div className="final-cta-background">
          SHOP
        </div>


        {/* DESCRIPTION */}

        <p className="final-cta-description">
          The complete SS/26 collection is live
          <br />
          now. Free shipping over R 3,500,
          <br />
          exchanges within 30 days, no questions.
        </p>


        {/* BUTTON */}

        <a className="final-cta-button" href="#collection">
          SHOP COLLECTION
        </a>


        {/* BENEFITS */}

        <div className="final-cta-benefits">

          <span>
            SHIPPING 2–4 DAYS
          </span>

          <b>·</b>

          <span>
            30-DAY EXCHANGE
          </span>

          <b>·</b>

          <span>
            MEMBERS — EARLY ACCESS
          </span>

        </div>

      </div>

    </section>
  );
};

export default FinalCTA;
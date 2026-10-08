import { ArrowUpRight } from "lucide-react";
import "../styles/inked.css";

const Inked = () => {
  return (
    <main className="inked-page">

      {/* BACKGROUND SS26 */}
      <div className="inked-background-text">
        SS26
      </div>

      {/* TOP CONTENT */}
      <section className="inked-main">

        {/* LEFT SIDE */}
        <div className="inked-copy">

          <h1 className="inked-title">
            <span>INKED TO BE</span>
            <span className="orange-word">WORN.</span>
          </h1>

          <p className="inked-description">
            Every graphic begins as hand-drawn
            <br />
            line art, then moves from screen
            <br />
            to heavyweight deadstock fabric in
            <br />
            small runs. No gloss. No mass
            <br />
            production. Just well-made pieces
            <br />
            inspired by the anime we grew up
            <br />
            with.
          </p>

          {/* BUTTONS */}
          <div className="inked-buttons">

            <button className="inked-primary-button">
              <span>SHOP COLLECTION</span>
              <ArrowUpRight size={16} />
            </button>

            <button className="inked-secondary-button">
              VIEW LOOKBOOK
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="inked-spec-wrapper">

          <div className="inked-spec">

            <div className="spec-line">
              SPEC. 26-110
            </div>

            <div className="spec-divider" />

            <div className="spec-details">

              <div>
                FABRIC — 14OZ COTTON DUCK
              </div>

              <div>
                PRINT — HAND-PULLED, 3 PASS
              </div>

              <div>
                ORIGIN — RUN I. TOKYO BLOCK
              </div>

              <div>
                ID — NT-26-110-BLK
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Inked;
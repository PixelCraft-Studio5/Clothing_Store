import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="pixel-footer">

      {/* =================================
          MAIN FOOTER
      ================================= */}

      <div className="footer-main">


        {/* BRAND */}

        <div className="footer-brand">

          <div className="footer-logo">

            <span>PIX</span>
            <span>EL</span>

          </div>

          <p>
            Anime streetwear, engineered
            <br />
            in the city. Worn in every
            <br />
            world.
          </p>

        </div>


        {/* SHOP */}

        <div className="footer-column">

          <h3>
            SHOP
          </h3>

          <a href="/new-in">
            NEW IN
          </a>

          <a href="/collection/jujutsu-kaisen">
            JUJUTSU KAISEN
          </a>

          <a href="/collection/one-piece">
            ONE PIECE
          </a>

          <a href="/collection/naruto">
            NARUTO
          </a>

        </div>


        {/* SUPPORT */}

        <div className="footer-column">

          <h3>
            SUPPORT
          </h3>

          <a href="/shipping">
            SHIPPING
          </a>

          <a href="/returns">
            RETURNS
          </a>

          <a href="/size-guide">
            SIZE GUIDE
          </a>

          <a href="/contact">
            CONTACT
          </a>

        </div>


        {/* FOLLOW */}

        <div className="footer-column">

          <h3>
            FOLLOW
          </h3>

          <a
            href="#instagram"
            target="_blank"
            rel="noreferrer"
          >
            INSTAGRAM
          </a>

          <a
            href="#tiktok"
            target="_blank"
            rel="noreferrer"
          >
            TIKTOK
          </a>

          <a
            href="#discord"
            target="_blank"
            rel="noreferrer"
          >
            DISCORD
          </a>

          <a href="/newsletter">
            NEWSLETTER
          </a>

        </div>

      </div>


      {/* =================================
          FOOTER BOTTOM
      ================================= */}

      <div className="footer-bottom">

        <span className="footer-copyright">
          © 2026 PIXEL
        </span>


        {/* TECHNICAL BAR */}

        <div className="footer-bars">
          {Array.from({
            length: 25,
          }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

       
        <a
          className="footer-disclaimer"
          href="https://www.pixelcraftstudios.co.za/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MADE BY https://www.pixelcraftstudios.co.za/
        </a>

      </div>

    </footer>
  );
};

export default Footer;
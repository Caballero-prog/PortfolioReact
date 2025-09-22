// HeroSection.jsx
import "./HeroSection.css";
import Software from "../assets/Software.svg";

const HeroSection = () => {
  return (
    <div className="hero-background">
      {/* Hero Section */}
      <p className="portfolio-name">
        <b className="dot">Port</b>folio<b className="dot">.</b>
      </p>
      <section className="main-container">
        <header className="hero-container">
          <h2 className="greeting">Hi,</h2>
          <h1 className="hero-title">
            my name is <b>Leonardo</b>
            <b className="dot">.</b>
          </h1>
          <h2 className="hero-subtitle">
            I'm a <b className="dot">software developer</b> living in Espoo,
            Finland.
          </h2>
        </header>
        <div className="image-container">
          <img src={Software} alt="Coder" />
        </div>
      </section>
      <section className="hero-description">
        <p>
          "I like to write clean, easy-to-read code and build websites that are
          both visually appealing and function smoothly behind the scenes."
        </p>
      </section>
    </div>
  );
};

export default HeroSection;

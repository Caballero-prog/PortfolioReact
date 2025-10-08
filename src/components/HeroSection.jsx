import "./HeroSection.css";
import profileImg from "../assets/hiking.jpg";

const HeroSection = () => {
  return (
    <div className="hero-frame">
      <section className="main-container">
        <article className="pillar-container">
          <div className="pillar"></div>
        </article>
        <section className="hero-section">
          <h1 className="portfolio-name">
            <b className="dot">Port</b>folio<b className="dot">.</b>
          </h1>
          <article className="hero-container">
            <h2>
              Hello <b className="dot">&</b> Welcome
            </h2>
            <h2 className="hero-title">
              My name is <b>Leonardo</b>.
            </h2>
            <h2 className="hero-subtitle">
              I'm a <b className="dot">software developer</b> from Espoo,
              Finland<b className="dot">.</b>
            </h2>
          </article>
        </section>
        <figure className="profile-img">
          <img src={profileImg} alt="Profile" />
        </figure>
      </section>
    </div>
  );
};

export default HeroSection;

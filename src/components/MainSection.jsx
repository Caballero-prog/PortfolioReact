import "./MainSection.css";
import aboutImg from "../assets/college.jpg";
import skillsImg from "../assets/writing.jpg";

const MainSection = () => {
  return (
    <main className="main-grid">
      <section className="about-grid">
        <article className="about-card">
          <h2 className="section-title">
            About<b className="dot">.</b>
          </h2>
          <p className="section-description">
            I started studying <b>software development</b> at
            <b> Business College Helsinki</b> and have been <b>coding</b> almost
            daily since then. Each step has helped me better understand how
            <b> websites</b> are structured and connected behind the scenes,
            from layout and styling to interactivity and functionality.
          </p>
          <p className="section-description">
            I enjoy learning through <b>practice</b> and solving small
            <b> challenges</b>. Even small breakthroughs feel rewarding and keep
            me motivated to grow into a <b>confident developer</b>. My goal is
            to build <b>websites</b> that not only <b>look great</b> but also
            <b> perform smoothly</b> and provide a good user experience.
          </p>
        </article>
        <figure className="about-img-container">
          <img loading="lazy" src={aboutImg} alt="" />
        </figure>
      </section>
      <section className="skills-grid">
        <article className="skills-card">
          <h2 className="section-title">
            Skills<b className="dot">.</b>
          </h2>
          <p className="section-description">
            My background includes studying a wide range of web technologies
            across both frontend and backend development. I've worked with tools
            and languages like <b> HTML</b>, <b> CSS</b>, <b> JavaScript</b>,
            <b> React</b>, <b> Node.js</b>, <b> C#</b>, and <b> .NET</b> to build
            responsive user interfaces and APIs.
          </p>
          <p className="section-description">
            I've also learned how data is managed using relational and
            non-relational databases such as <b>PostgreSQL</b> and
            <b> MongoDB</b>. I regularly use <b>Visual Studio Code</b>,
            <b> GitHub</b>, and <b>browser developer tools</b> to streamline
            development, collaborate, and debug projects effectively.
          </p>
        </article>
        <figure className="skills-img-container">
          <img loading="lazy" src={skillsImg} alt="" />
        </figure>
      </section>
    </main>
  );
};

export default MainSection;

// SkillsSection.jsx
import "./Skills.css";
import SkillsImg from "../assets/Skills.svg";

const Skills = () => {
  return (
    <div className="skills-background">
    <article className="skills-container">
      <section className="skills-wrapper">
        <h2 className="skills-title">
          Skills<b className="dot">.</b>
        </h2>
        <p className="skills-description">
          My background includes studying a wide range of web technologies
          across both frontend and backend development. I've worked with tools
          and languages like <b>HTML</b>, <b>CSS</b>, <b>JavaScript</b>,{" "}
          <b>React</b>, <b>Node.js</b>, <b>C#</b>, and <b>.NET</b> to build
          responsive user interfaces and APIs.
        </p>
        <p className="skills-description">
          I've also learned how data is managed using relational and
          non-relational databases such as <b>PostgreSQL</b> and <b>MongoDB</b>.
          I regularly use <b>Visual Studio Code</b>, <b>GitHub</b>, and{" "}
          <b>browser developer tools</b> to streamline development, collaborate,
          and debug projects effectively.
        </p>
      </section>
      <div className="skills-image">
        <img src={SkillsImg} alt="Skills" />
      </div>
    </article>
    </div>
  );
};
export default Skills;

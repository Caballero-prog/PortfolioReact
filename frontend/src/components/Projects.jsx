// Projects.jsx
import "./Projects.css";
import WeatherCard from "./WeatherCard";

const Projects = () => {
  return (
    <>
      <section className="projects-heading">
        <p>
          “Here you'll find examples of my work, built to solve real-world
          problems.”
        </p>
      </section>
      <article className="projects-container">
        <WeatherCard />
        <section className="projects-wrapper">
          <h2 className="projects-title">
            Weather App<b className="dot">.</b>
          </h2>
          <p className="projects-description">
            The Weather App was built using <b>React</b> for the user interface,
            with asynchronous data fetching handled through <b>axios</b> and
            state management using <b>React hooks</b>. Weather data is retrieved
            from the <b>Open-Meteo API</b> to display real-time conditions for
            selected cities.
          </p>
          <p className="projects-description">
            On the backend, the API was built with <b>Node.js</b> and{" "}
            <b>Fastify</b> to handle requests efficiently and provide weather
            data to the frontend. This setup demonstrates skills in{" "}
            <b>API design</b> and <b>frontend-backend communication</b>.
          </p>
        </section>
      </article>
    </>
  );
};

export default Projects;

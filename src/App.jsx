import "./App.css";
import HeroSection from "./components/HeroSection";
import MainSection from "./components/MainSection";
import Belt from "./components/Belt";
import ProjectsBelt from "./components/ProjectsBelt";
import WeatherApp from "./components/WeatherApp";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <HeroSection />
      <Belt />
      <MainSection />
      <ProjectsBelt/>
      <WeatherApp/>
      <Contact/>
      <Footer/>
    </>
  );
}

export default App;

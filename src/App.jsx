import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QutoeHero from "./components/QuoteHero";
import Services from "./components/Services";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Portfolio from "./components/Portfolio";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";

import LOGO from "./assets/Logo.png";
import HERO1 from "./assets/hero/hero1.webp";
import HERO2 from "./assets/hero/hero2.webp";
import HERO3 from "./assets/hero/hero3.webp";

function App() {
  return (
    <>
      <Navbar logoSrc={LOGO} />
      <Hero
        images={[
          {
            src: HERO1,
            alt: "Backside view of Colleen playing Harp",
          },
          { src: HERO2, alt: "Still of Colleen with her harp" },
          {
            src: HERO3,
            alt: "Second still of Colleen with her harp",
          },
        ]}
      />
      <QutoeHero />
      <About />
      <Services />

      <Gallery />
      <Portfolio />
      <Reviews />
      <Contact />
    </>
  );
}

export default App;

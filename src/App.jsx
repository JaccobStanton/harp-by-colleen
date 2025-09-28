import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// your existing sections:
import Hero from "./components/Hero";
import QutoeHero from "./components/QuoteHero";
import Services from "./components/Services";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Portfolio from "./components/Portfolio";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";

import AboutMe from "./components/AboutMe/AboutMe";
import LOGO from "./assets/Logo.png";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // wait one frame so the page has rendered
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" }); // no smooth
      });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" }); // always start at top on new page
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <QutoeHero />
      <About id="about" />
      <Services id="services" />
      <Gallery id="gallery" />
      <Portfolio id="portfolio" />
      <Reviews id="reviews" />
      <Contact id="contact" />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar logoSrc={LOGO} />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutme" element={<AboutMe />} />
      </Routes>
    </>
  );
}

// src/pages/AboutMe.jsx (or your AboutMe page component)
import * as React from "react";
import { Box } from "@mui/material";
import AboutMeTop from "./AboutMeTop";
import AboutMeBottom from "./AboutMeBottom";
import Footer from "../Footer";

export default function AboutMe() {
  const anchorRef = React.useRef(null);

  // In case the browser tries to jump before React paints,
  // nudge it after mount if a hash is present.
  React.useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash) || anchorRef.current;
    if (el) {
      // small timeout lets layout settle before scrolling
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }, []);

  return (
    <>
      {/* Anchor target */}
      <Box id="aboutme" ref={anchorRef} />

      <AboutMeTop />
      <AboutMeBottom />
      <Footer />
    </>
  );
}

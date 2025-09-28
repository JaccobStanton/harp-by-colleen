// src/components/Portfolio.jsx
import * as React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { PlayArrowRounded, PauseRounded } from "@mui/icons-material";
import LeafImg from "../assets/leaf.png";

import TRACK1 from "../assets/recordings/Arabesque_Debussy.mp3";
import TRACK2 from "../assets/recordings/Ave_Maria.mp3";
import TRACK3 from "../assets/recordings/Can't_Help_Falling_in_Love_Elvis.mp3";
import TRACK4 from "../assets/recordings/Here_Comes_the_Sun_The_Beatles.mp3";
import TRACK5 from "../assets/recordings/Largo_from_the_New_World_Dvorak.mp3";
import TRACK6 from "../assets/recordings/Perfect_Ed Sheeran.mp3";
import TRACK7 from "../assets/recordings/Rondeu_Mouret.mp3";
import TRACK8 from "../assets/recordings/Savasana.mp3";

const CORAL = "#e08b74";
const ACCENT = "rgb(160,164,142)";
const SHADOW = "0 18px 40px -8px rgba(224,139,116,0.45)";

export default function Portfolio({
  eyebrow = "Portfolio",
  title = "Curated Selections for Clients & Events",
  blurb = `A selection of harp recordings, handpicked for their timeless appeal and emotional resonance. Perfect for setting the mood at your next event or simply enjoying a moment of tranquility.`,
  items = [
    { title: "Arabesque – Debussy", src: TRACK1 },
    { title: "Ave Marie", src: TRACK2 },
    { title: "Can't Help Falling Inlove With You – Elvis", src: TRACK3 },
    { title: "Here Comes The Sun – The Beatles", src: TRACK4 },
    { title: "Largo From The New World - Dvorak", src: TRACK5 },
    { title: "Perfect - Ed Sheeran", src: TRACK6 },
    { title: "Rondeu - Mouret", src: TRACK7 },
    { title: "Savasana", src: TRACK8 },
  ],
}) {
  // reveal on scroll
  const rootRef = React.useRef(null);
  const [reveal, setReveal] = React.useState(false);
  React.useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setReveal(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);
  const FADE_MS = 1200;
  const MOVE_MS = 800;
  const STAGGER_MS = 900;
  const fadeStyle = (d = 0) => ({
    opacity: reveal ? 1 : 0,
    transform: reveal ? "none" : "translateY(10px)",
    transition: `opacity ${FADE_MS}ms ease-out ${
      reveal ? d : 0
    }ms, transform ${MOVE_MS}ms ease-out ${reveal ? d : 0}ms`,
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      transform: "none",
      opacity: 1,
    },
  });

  // audio state (single active track)
  const audioRefs = React.useRef([]);
  const [active, setActive] = React.useState(null); // index or null
  const [progress, setProgress] = React.useState(0); // 0..1 for active only

  const stopAll = React.useCallback(() => {
    audioRefs.current.forEach((a) => {
      if (a && !a.paused) a.pause();
    });
  }, []);

  const handleToggle = (i) => {
    const el = audioRefs.current[i];
    if (!el) return;
    // user gesture -> safe to play/pause
    if (active === i && !el.paused) {
      el.pause();
      setActive(null);
      setProgress(0);
      return;
    }
    // pause others, play this
    stopAll();
    el.currentTime = el.currentTime || 0;
    el.play();
    setActive(i);
  };

  // attach timeupdate for progress on active
  React.useEffect(() => {
    const el = active != null ? audioRefs.current[active] : null;
    if (!el) return;
    const onTime = () =>
      setProgress(el.duration ? el.currentTime / el.duration : 0);
    const onEnd = () => {
      setActive(null);
      setProgress(0);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
    };
  }, [active]);

  // pause audio on unmount
  React.useEffect(() => () => stopAll(), [stopAll]);

  return (
    <Box
      ref={rootRef}
      component="section"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 10, md: 14 },
        overflowX: "hidden",
      }}
    >
      <Container disableGutters sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
        {/* Header */}
        <Box sx={{ maxWidth: 1100, mx: "auto", textAlign: "center" }}>
          <Box
            component="img"
            src={LeafImg}
            alt=""
            aria-hidden
            draggable={false}
            sx={{
              width: { xs: 40, sm: 52 },
              height: "auto",
              mb: 1,
              mx: "auto",
              display: "block",
              ...fadeStyle(0),
            }}
          />
          <Typography
            variant="overline"
            sx={{
              color: ACCENT,
              letterSpacing: ".24em",
              fontSize: { xs: 12, sm: 13, md: 14 },
              textTransform: "uppercase",
              mb: 1.5,
              display: "block",
              ...fadeStyle(0),
            }}
          >
            {eyebrow}
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontFamily:
                '"Cormorant Garamond","Garamond","Times New Roman",serif',
              color: "#555749",
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: "-0.01em",
              fontSize: "clamp(28px, 6.2vw, 64px)",
              textWrap: "balance",
              mb: 1.5,
              ...fadeStyle(STAGGER_MS),
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: 16, sm: 17, md: 18 },
              lineHeight: 1.8,
              mb: { xs: 5, md: 8 },
              maxWidth: 980,
              mx: "auto",
              ...fadeStyle(STAGGER_MS * 2),
            }}
          >
            {blurb}
          </Typography>
        </Box>

        {/* Grid of recordings (4-up md+, 2-up sm, stacked xs) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: { xs: 4, md: 6 },
            ...fadeStyle(STAGGER_MS * 2),
          }}
        >
          {items.slice(0, 8).map((track, i) => {
            const playing = active === i;
            return (
              <Box key={i}>
                {/* Cover / play surface */}
                <Box
                  onClick={() => handleToggle(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleToggle(i)}
                  sx={{
                    position: "relative",
                    aspectRatio: "4 / 5",
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    cursor: "pointer",
                    // simple “artwork” background; swap for real cover if you have one
                    background:
                      "radial-gradient(120% 140% at 20% 10%, #f5e8e3 0%, #efe7db 42%, #e9e0d2 100%)",
                    boxShadow: "0 18px 20px -8px rgba(0,0,0,0.15)",
                    transition: "box-shadow 240ms ease, transform 120ms ease",
                    "&:hover": { boxShadow: SHADOW },
                    "&:active": { transform: "scale(0.997)" },
                    "&:focus-visible": {
                      outline: `2px solid ${CORAL}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  {/* Play/Pause button centered */}
                  <IconButton
                    aria-label={playing ? "Pause" : "Play"}
                    sx={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: { xs: 64, sm: 72 },
                      height: { xs: 64, sm: 72 },
                      bgcolor: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                      boxShadow: "0 10px 18px rgba(0,0,0,0.28)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(i);
                    }}
                  >
                    {playing ? (
                      <PauseRounded sx={{ fontSize: { xs: 36, sm: 40 } }} />
                    ) : (
                      <PlayArrowRounded sx={{ fontSize: { xs: 40, sm: 46 } }} />
                    )}
                  </IconButton>

                  {/* Coral progress bar (only while playing) */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      height: 4,
                      width: playing ? `${Math.round(progress * 100)}%` : "0%",
                      bgcolor: CORAL,
                      transition: "width 120ms linear",
                    }}
                  />
                </Box>

                {/* Title */}
                <Typography
                  component="h3"
                  align="center"
                  sx={{
                    mt: { xs: 2.5, md: 3 },
                    fontFamily:
                      '"Cormorant Garamond","Garamond","Times New Roman",serif',
                    color: "#555749",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    fontSize: { xs: 22, sm: 24, md: 26 },
                    lineHeight: 1.25,
                    textWrap: "balance",
                  }}
                >
                  {track.title}
                </Typography>

                {/* CTA-style listen link */}
                <Typography
                  onClick={() => handleToggle(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleToggle(i)}
                  align="center"
                  sx={{
                    mt: 1,
                    fontSize: 12,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "#555749",
                    cursor: "pointer",
                    width: "fit-content",
                    mx: "auto",
                    borderBottom: "1px solid rgba(224,139,116,0.6)",
                    pb: 0.75,
                    "&:hover": { color: CORAL },
                  }}
                >
                  {playing ? "Pause" : "Listen"}
                </Typography>

                {/* Hidden audio element (preload=none for performance) */}
                <audio
                  ref={(el) => (audioRefs.current[i] = el)}
                  src={track.src}
                  preload="none"
                />
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import LeafImg from "../../assets/leaf.png";

export default function AboutMeBottom() {
  const rootRef = React.useRef(null);
  const [reveal, setReveal] = React.useState(false);

  // Start the animation when the hero scrolls into view (once).
  React.useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setReveal(true);
          io.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  // Animation timings (ms) — slow + elegant
  const FADE_MS = 1200;
  const MOVE_MS = 800;
  const STAGGER_MS = 900;

  const fadeStyle = (delay) => ({
    opacity: reveal ? 1 : 0,
    transform: reveal ? "none" : "translateY(10px)",
    transition: `opacity ${FADE_MS}ms ease-out ${
      reveal ? delay : 0
    }ms, transform ${MOVE_MS}ms ease-out ${reveal ? delay : 0}ms`,
    // Respect reduced motion
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      transform: "none",
      opacity: 1,
    },
  });

  return (
    <Box
      ref={rootRef}
      component="section"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 10, sm: 12, md: 16 },
      }}
    >
      <Container
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: { xs: 3, sm: 4 },
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={LeafImg}
          alt=""
          aria-hidden="true"
          draggable={false}
          loading="eager"
          decoding="async"
          sx={{
            mx: "auto",
            display: "block",
            width: { xs: 56, sm: 68, md: 80 },
            height: "auto",
            mb: { xs: 4, sm: 5 },
            ...fadeStyle(0), // leaf can fade with the first heading if you want
          }}
        />

        {/* 1) Headline */}
        <Typography
          component="h1"
          sx={{
            color: "#555749",
            fontFamily:
              '"Cormorant Garamond", "Garamond", "Times New Roman", serif',
            textTransform: "uppercase",
            fontWeight: 500,
            fontSize: "clamp(18px, 5.2vw, 42px)",
            letterSpacing: { xs: ".02em", md: ".035em" },
            lineHeight: 1.15,
            textWrap: "balance",
            mb: { xs: 3, sm: 4, md: 5 },
            ...fadeStyle(0),
          }}
        >
          Behind The Music
        </Typography>

        {/* 2) Supporting copy */}
        <Typography
          component="p"
          sx={{
            color: "#555749",
            maxWidth: 1000,
            mx: "auto",
            fontSize: { xs: 16, sm: 18, md: 20 },
            lineHeight: 1.7,
            mb: { xs: 5, md: 8 },
            whiteSpace: "pre-line", // <- key line
            ...fadeStyle(STAGGER_MS),
          }}
        >
          {`She earned her Bachelor of Science in Music Therapy from Maryville University in 2017 and went on to complete a Master of Music in Harp Performance at Webster University in 2021. During her graduate studies, Colleen was honored as the winner of Webster’s Concerto Competition, performing Mozart’s Concerto for Flute, Harp, and Orchestra.

Colleen is the principal harpist for the St. Louis Philharmonic and has performed with a wide array of esteemed ensembles including the St. Louis Symphony, Union Avenue Opera, Winter Opera, the St. Louis Bach Society, Metropolitan Orchestra of St. Louis, among many others. A versatile and in-demand performer, she has brought her artistry to over 100 wedding ceremonies and events.

Colleen Stumbo is a classically trained harpist with a passion for blending tradition and modernity through music. Whether performing a classical piece or a pop hit, Colleen creates a rich, engaging atmosphere that resonates with a wide range of audiences. Colleen loves to share her unique interpretations of contemporary favorites of artists like Taylor Swift, The Beatles, Elton John, and more.

Outside of her musical pursuits, Colleen finds joy in teaching & practicing yoga, gardening, and spending time outdoors with her family and dog, Hercules.

If you're interested in having harp music at your special event please don't hesitate to contact me and we can plan the perfect music for your event! I look forward to hearing from you!`}
        </Typography>

        {/* 3) Signature */}
        <Typography
          component="p"
          aria-label="signature"
          sx={{
            fontFamily: '"Allura", cursive',
            fontSize: { xs: 20, sm: 30, md: 44 },
            lineHeight: 1,
            color: "#e08b74",
            ...fadeStyle(STAGGER_MS * 2),
          }}
        >
          Colleen Stumbo
        </Typography>
      </Container>
    </Box>
  );
}

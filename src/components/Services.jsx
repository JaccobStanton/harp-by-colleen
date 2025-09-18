// src/components/Services.jsx
import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

import SERVICE1 from "../assets/services/service1.webp";
import SERVICE2 from "../assets/services/service2.webp";
import SERVICE3 from "../assets/services/service3.webp";
import LeafImg from "../assets/leaf.png";

const CORAL = "#e08b74";
const SHADOW = "0 18px 20px -8px rgba(224,139,116,0.45)"; // #e08b74 @ 45%

export default function Services({
  eyebrow = "Services",
  items = [
    {
      src: SERVICE1,
      alt: "Harp at an outdoor event",
      title: "Events",
      blurb:
        "From corporate gatherings to private parties, add a refined, memorable atmosphere with professional harp music, available for indoor or outdoor events.",
    },
    {
      src: SERVICE2,
      alt: "Harp in a wedding ceremony setting",
      title: "Weddings",
      blurb:
        "Elevate your ceremony and reception with elegant, live harp music tailored to your love story—now booking for weddings of all sizes.",
    },
    {
      src: SERVICE3,
      alt: "Harp at an indoor event",
      title: "Recitals & More",
      blurb:
        "Book solo recitals, gallery openings, memorials, and special requests with flexible programs crafted to fit your occasion.",
    },
  ],
}) {
  // reveal-on-scroll
  const [reveal, setReveal] = React.useState(false);
  // 1) add a ref
  const sentinelRefServices = React.useRef(null);

  // 2) observe the sentinel instead of the whole section
  React.useEffect(() => {
    if (!sentinelRefServices.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setReveal(true);
          io.disconnect();
        }
      },
      {
        threshold: 0, // any pixel visible
        rootMargin: "0px 0px -10% 0px", // start a bit before it hits center
      }
    );
    io.observe(sentinelRefServices.current);
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

  return (
    <Box
      ref={sentinelRefServices}
      component="section"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 8, md: 12 },
        overflowX: "clip",
      }}
    >
      <Container
        disableGutters
        sx={{
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          width: "100%",
        }}
      >
        {/* Header (leaf + overline “Services”) */}
        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
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
              color: "rgb(160,164,142)",
              letterSpacing: ".24em",
              fontSize: { xs: 12, sm: 13, md: 14 },
              textTransform: "uppercase",
              display: "block",
              ...fadeStyle(0),
            }}
          >
            {eyebrow}
          </Typography>
        </Box>

        {/* Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 4, md: 6 },
            alignItems: "start",
            ...fadeStyle(STAGGER_MS), // grid fades after the header
          }}
        >
          {items.map((item, i) => (
            <Box key={i}>
              {/* Image */}
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: "4 / 5",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  bgcolor: "grey.100",
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                  transition: "box-shadow 260ms ease",
                  "&:hover": { boxShadow: SHADOW },
                  "&:focus-visible": {
                    outline: `2px solid ${CORAL}`,
                    outlineOffset: 2,
                  },
                }}
                tabIndex={0}
              >
                <Box
                  component="img"
                  src={item.src}
                  alt={item.alt || ""}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              {/* Title */}
              <Typography
                component="h3"
                align="center"
                sx={{
                  mt: { xs: 3, md: 3.5 },
                  fontFamily:
                    '"Cormorant Garamond", "Garamond", "Times New Roman", serif',
                  color: "#555749",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  fontSize: { xs: 28, sm: 32, md: 36 },
                  lineHeight: 1.15,
                  textWrap: "balance",
                }}
              >
                {item.title}
              </Typography>

              {/* Blurb */}
              <Typography
                align="center"
                sx={{
                  mt: 1.5,
                  mx: "auto",
                  maxWidth: 520,
                  color: "text.secondary",
                  fontSize: { xs: 15.5, sm: 16.5, md: 18 },
                  lineHeight: 1.8,
                }}
              >
                {item.blurb}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

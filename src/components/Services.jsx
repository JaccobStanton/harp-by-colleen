// src/components/Services.jsx
import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

import SERVICE1 from "../assets/services/service1.webp";
import SERVICE2 from "../assets/services/service2.webp";
import SERVICE3 from "../assets/services/service3.webp";

const CORAL = "#e08b74";
const SHADOW = "0 18px 20px -8px rgba(224,139,116,0.45)"; // #e08b74 @ 45%

export default function Services({
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
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 8, md: 12 },
        overflowX: "clip", // belt-and-suspenders: no stray horizontal scroll
      }}
    >
      {/* Full-width container from your theme (maxWidth=false by default). */}
      <Container
        disableGutters
        sx={{
          px: { xs: 2, sm: 3, md: 4, lg: 6 }, // site gutters
          width: "100%",
        }}
      >
        {/* CSS Grid -> no negative margins, no overflow; 1 col on xs, 3 cols from md up */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 4, md: 6 }, // uses theme.spacing under the hood
            alignItems: "start",
          }}
        >
          {items.map((item, i) => (
            <Box key={i}>
              {/* Image wrapper: equal sizes via aspect-ratio; hover coral shadow */}
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

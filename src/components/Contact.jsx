// src/components/About.jsx
import * as React from "react";
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import CONTACT from "../assets/contact/contact.webp";
import LeafSrc from "../assets/leaf.png";

const CORAL = "#e08b74";
const PANEL_MIN_H = { xs: 500, sm: 600, md: 760, lg: 840, xl: 900 };

export default function Contact({
  image = { src: CONTACT, alt: "Smiling bride holding flowers" },
  eyebrow = "Contact",
  title = "The Sound of Elegance Awaits",
  copy = `Professional harp for weddings, events, and more.`,
  cta = { label: "Contact", href: "mailto:harpist314@gmail.com" },
  leafSrc = LeafSrc,
}) {
  const rootRef = React.useRef(null);
  const [reveal, setReveal] = React.useState(false);

  React.useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setReveal(true);
          io.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  const FADE_MS = 1200;
  const MOVE_MS = 800;
  const STAGGER_MS = 900;

  const fadeStyle = (delay = 0) => ({
    opacity: reveal ? 1 : 0,
    transform: reveal ? "none" : "translateY(10px)",
    transition: `opacity ${FADE_MS}ms ease-out ${
      reveal ? delay : 0
    }ms, transform ${MOVE_MS}ms ease-out ${reveal ? delay : 0}ms`,
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
        py: { xs: 8, md: 12 },
      }}
    >
      <Container disableGutters sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
        <Box
          sx={{
            maxWidth: 1280,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 0 }, // touch on md+
            alignItems: "stretch",
          }}
        >
          {/* LEFT: content panel (centered) */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              // remove the inner seam on md+
              borderRight: { xs: "1px solid", md: "none" },
              // outer corners rounded (left), inner corners square (right)
              borderTopLeftRadius: "var(--radius)",
              borderBottomLeftRadius: "var(--radius)",
              borderTopRightRadius: { xs: "var(--radius)", md: 0 },
              borderBottomRightRadius: { xs: "var(--radius)", md: 0 },

              minHeight: PANEL_MIN_H,
              height: "100%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: { xs: 3, sm: 4, md: 6 },
            }}
          >
            <Box sx={{ maxWidth: 760, width: "100%" }}>
              {leafSrc && (
                <Box
                  component="img"
                  src={leafSrc}
                  alt=""
                  aria-hidden
                  draggable={false}
                  sx={{
                    width: { xs: 34, sm: 40 },
                    height: "auto",
                    mb: { xs: 1, sm: 1.5 },
                    mx: "auto",
                    display: "block",
                    ...fadeStyle(0),
                  }}
                />
              )}

              <Typography
                variant="overline"
                sx={{
                  color: "rgb(160,164,142)",
                  letterSpacing: ".24em",
                  fontSize: { xs: 12, sm: 13, md: 14 },
                  textTransform: "uppercase",
                  display: "block",
                  mb: { xs: 1.5, sm: 2 },
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
                  fontSize: "clamp(28px, 5.6vw, 56px)",
                  textWrap: "balance",
                  mb: { xs: 2.5, sm: 3 },
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
                  mb: { xs: 3, sm: 4 },
                  mx: "auto",
                  maxWidth: 720,
                  ...fadeStyle(STAGGER_MS * 2),
                }}
              >
                {copy}
              </Typography>

              <Button
                href={cta.href}
                variant="outlined"
                size="large"
                sx={{
                  borderColor: CORAL,
                  color: "#555749",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  px: { xs: 2.5, sm: 3 },
                  py: { xs: 1, sm: 1.25 },
                  fontSize: { xs: 12, sm: 13, md: 14 },
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                  transition:
                    "background-color 180ms ease, color 150ms ease, border-color 150ms ease",
                  "&:hover": {
                    borderColor: CORAL,
                    backgroundColor: "rgba(224,139,116,0.06)",
                    color: "text.primary",
                  },
                  ...fadeStyle(STAGGER_MS * 3),
                }}
              >
                {cta.label}
              </Button>
            </Box>
          </Paper>

          {/* RIGHT: image (outer corners rounded on right, inner corners square) */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              bgcolor: "grey.100",
              border: "1px solid",
              borderColor: "divider",
              minHeight: PANEL_MIN_H,
              aspectRatio: { xs: "4 / 5", md: "auto" },
              height: "100%",

              borderTopRightRadius: "var(--radius)",
              borderBottomRightRadius: "var(--radius)",
              borderTopLeftRadius: { xs: "var(--radius)", md: 0 },
              borderBottomLeftRadius: { xs: "var(--radius)", md: 0 },
            }}
          >
            <Box
              component="img"
              src={image.src}
              alt={image.alt || ""}
              loading="eager"
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
        </Box>
      </Container>
    </Box>
  );
}

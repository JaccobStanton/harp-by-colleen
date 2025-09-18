// src/components/Gallery.jsx
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Dialog,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import GALLERY1 from "../assets/gallery/gallery1.webp";
import GALLERY2 from "../assets/gallery/gallery2.webp";
import GALLERY3 from "../assets/gallery/gallery3.webp";
import GALLERY4 from "../assets/gallery/gallery4.webp";
import GALLERY5 from "../assets/gallery/gallery5.webp";
import GALLERY6 from "../assets/gallery/gallery6.webp";
import GALLERY7 from "../assets/gallery/gallery7.webp";
import GALLERY8 from "../assets/gallery/gallery8.webp";

import LeafImg from "../assets/leaf.png";

const CORAL = "#e08b74";

export default function Gallery({
  eyebrow = "Gallery",
  title = "Moments That Sing",
  blurb = `A collection of images where touch meets tone. See Colleen coax color from every string.`,
  items = [
    { src: GALLERY1, alt: "Bouquet close-up" },
    { src: GALLERY2, alt: "Couple by the ocean" },
    { src: GALLERY3, alt: "Outdoor portrait" },
    { src: GALLERY4, alt: "Ceremony seating" },
    { src: GALLERY5, alt: "Palm and sky" },
    { src: GALLERY6, alt: "Interior with lights" },
    { src: GALLERY7, alt: "Interior with lights" },
    { src: GALLERY8, alt: "Interior with lights" },
  ],
}) {
  // Reveal-on-scroll
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
      { threshold: 0.25, rootMargin: "0px 0px -15% 0px" }
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

  // Lightbox
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openIndex, setOpenIndex] = React.useState(null);
  const handleOpen = (i) => setOpenIndex(i);
  const handleClose = () => setOpenIndex(null);

  // Images start fading after the blurb
  const IMG_BASE_DELAY = STAGGER_MS * 3; // after leaf(0), title(1x), blurb(2x)

  return (
    <Box
      ref={rootRef}
      component="section"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 10, md: 14 },
        overflowX: "clip",
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
              color: "rgb(160,164,142)",
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
              mb: { xs: 2, sm: 2.5, md: 3 },
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

        {/* Uniform grid: 2 rows × 4 columns on md+ (stacks on small) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {items.slice(0, 8).map((it, i) => (
            <Box
              key={i}
              sx={{
                position: "relative",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                bgcolor: "grey.100",
                aspectRatio: "4 / 3", // same size tiles
                cursor: "zoom-in",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                transition: "box-shadow 240ms ease, transform 120ms ease",
                "&:hover": {
                  boxShadow: "0 18px 40px -8px rgba(224,139,116,0.45)",
                },
                "&:active": { transform: "scale(0.995)" },
                ...fadeStyle(IMG_BASE_DELAY + i * 120), // fade images after text, slight stagger
              }}
              role="button"
              tabIndex={0}
              onClick={() => handleOpen(i)}
              onKeyDown={(e) => (e.key === "Enter" ? handleOpen(i) : null)}
            >
              <Box
                component="img"
                src={it.src}
                alt={it.alt || ""}
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
          ))}
        </Box>
      </Container>

      {/* Lightbox Dialog */}
      <Dialog
        open={openIndex !== null}
        onClose={handleClose}
        // keep fullscreen on small screens; remove if you want fullscreen always
        fullScreen={fullScreen}
        // put the dark overlay on the Backdrop (not on the Paper)
        BackdropProps={{
          sx: { backgroundColor: "rgba(0,0,0,0.85)" },
        }}
        PaperProps={{
          sx: {
            // remove default dialog margins/size caps
            m: 0,
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            bgcolor: "transparent", // Paper is transparent now
            boxShadow: "none",
          },
        }}
      >
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          sx={{
            position: "fixed",
            top: 12,
            right: 12,
            color: "#fff",
            bgcolor: "rgba(0,0,0,0.35)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>

        {/* Fill the viewport; no extra padding */}
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "grid",
            placeItems: "center",
            p: 0, // <-- remove the padding that made the image look smaller
          }}
          onClick={handleClose}
        >
          {openIndex !== null && (
            <Box
              component="img"
              src={items[openIndex].src}
              alt={items[openIndex].alt || ""}
              onClick={(e) => e.stopPropagation()}
              sx={{
                // let it breathe, but use more of the viewport
                maxWidth: "min(98vw, 1600px)",
                maxHeight: "92vh",
                width: "auto",
                height: "auto",
                display: "block",
                borderRadius: "var(--radius)",
                boxShadow: "0 18px 40px -8px rgba(0,0,0,0.55)",
              }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
}

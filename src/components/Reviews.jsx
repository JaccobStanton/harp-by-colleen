import * as React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import LeafImg from "../assets/leaf.png";
// Replace with your real path; you asked to reference it as FLOWER:
import FLOWER from "../assets/flower.png";

const CORAL = "#e08b74";
const ACCENT = "rgb(160,164,142)";

const REVIEWS_DEFAULT = [
  {
    quote:
      "Working with Colleen was amazing! Everyone at my wedding loved her and loved how unique the harp was. Colleen is very kind and talented. She made picking out my ceremony music very easy. She can play pretty much anything on the harp, from classical to pop music. I would highly recommend Harp by colleen to evervone!",
    name: "Joanna H.",
    reviewedOn: "Reviewed on Dec 02, 2020",
  },
  {
    quote:
      "Easily one of the best decisions we made during the planning process was having Colleen play during our ceremony! She is a joy to work with. She is very helpful and walks you through the process (if you need it) of picking out songs and figuring out the best flow to the evening. Keeping in touch with her was easy and she answers any questions you may have in a timely manner. When we finally met her at the venue it felt like we already knew her! She is an accomplished musician and her songs are so beautiful. Colleen definitely enhanced our day and made it one to never forget!",
    name: "Sam D.",
    reviewedOn: "Reviewed on Oct 01, 2019",
  },

  {
    quote:
      "Colleen was complimented by all our guests. She arrived early and interacted with our guests. The harp was perfect for our ceremony and the brunch that followed. I appreciated her communication with me. She reminded me to pick songs and gave me a list of songs that was very helpful. I would highly recommend.",
    name: "Gina M.",
    reviewedOn: "Reviewed on Jan 24, 2019",
  },
  {
    quote: "Colleen was great and helped make our wedding ceremony perfect!!",
    name: "Ellen M.",
    reviewedOn: "Reviewed Jan 23, 2019",
  },
  {
    quote:
      "Colleen was wonderful to work with and did an amazing job providing music for our ceremony. She made the process very easy when deciding music, and was able to sample music on the spot to help us choose. She is talented on multiple instruments, allowing you to have a variety of choices for your wedding. She kept the entire ceremony flowing and it was absolutely beautiful! I highly recommend her for any event you may have.",
    name: "Emily S.",
    reviewedOn: "Reviewed on Oct 31, 2018",
  },
  {
    quote:
      "Colleen is extremely talented and did an amazing job at my wedding!!! She made our ceremony complete with the harp!!!",
    name: "Heather B.",
    reviewedOn: "Reviewed on Oct 23, 2018",
  },
  {
    quote:
      "Colleen's music was beautiful. She will incorporate any song you want plus give you suggestions. It was seamless from start to finish. It was the perfect touch to our wedding ceremony that we were looking for. I would highly suggest Colleen for your event.",
    name: "Sheri M.",
    reviewedOn: "Reviewed on Oct 22, 2018",
  },
  {
    quote:
      "We hired Colleen, as a surprise for our daughter, to play at her wedding as she walked down the aisle. She was very pleasant to work with, not to mention an amazing harpist!! We wanted to create a unique and unforgettable experience, and her beautiful harp music did just that. Her professionalism, responsiveness and talent is top rated! Would definitely recommend her to anyone looking for beautiful music at your wedding or occasion.",
    name: "Christina A.",
    reviewedOn: "Reviewed on Oct 21, 2018",
  },
];

export default function Reviews({
  eyebrow = "Testimonials",
  title = "What My Clients Say",
  items = REVIEWS_DEFAULT,
}) {
  // Reveal-on-scroll (same pattern used previously)
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

  // Carousel state
  const [index, setIndex] = React.useState(0);
  const count = items.length;
  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  // Swipe (simple)
  const touchX = React.useRef(null);
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 48) dx > 0 ? prev() : next();
    touchX.current = null;
  };

  // Keyboard arrows
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));

  const cardMinH = { xs: 320, sm: 360, md: 420, lg: 460 };

  return (
    <Box
      ref={rootRef}
      component="section"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        py: { xs: 10, md: 14 },
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
              mb: { xs: 5, md: 7 },
              ...fadeStyle(STAGGER_MS),
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Review card */}
        <Paper
          role="region"
          aria-label="Client reviews carousel"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          sx={{
            position: "relative",
            maxWidth: 1280,
            mx: "auto",
            p: { xs: 3, sm: 4, md: 6 },
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "var(--radius)",
            bgcolor: "background.paper",
            minHeight: cardMinH,
            textAlign: "center",
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
            gap: 2,
            ...fadeStyle(STAGGER_MS * 2), // card appears after title
          }}
        >
          {/* Left / Right arrows */}
          <IconButton
            aria-label="Previous review"
            onClick={prev}
            sx={{
              position: "absolute",
              left: { xs: 6, sm: 10 },
              top: "50%",
              transform: "translateY(-50%)",
              color: ACCENT,
              "&:hover": { color: CORAL, background: "transparent" },
            }}
          >
            <ChevronLeftRoundedIcon sx={{ fontSize: upMd ? 36 : 30 }} />
          </IconButton>

          <IconButton
            aria-label="Next review"
            onClick={next}
            sx={{
              position: "absolute",
              right: { xs: 6, sm: 10 },
              top: "50%",
              transform: "translateY(-50%)",
              color: ACCENT,
              "&:hover": { color: CORAL, background: "transparent" },
            }}
          >
            <ChevronRightRoundedIcon sx={{ fontSize: upMd ? 36 : 30 }} />
          </IconButton>

          {/* Flower */}
          <Box
            component="img"
            src={FLOWER}
            alt=""
            aria-hidden
            draggable={false}
            sx={{
              width: { xs: 44, sm: 52 },
              height: "auto",
              display: "block",
              mb: { xs: 1, sm: 1.5 },
              ...fadeStyle(STAGGER_MS * 3),
            }}
          />

          {/* Quote */}
          <Typography
            sx={{
              color: "#555749",
              maxWidth: 980,
              mx: "auto",
              fontSize: { xs: 14.5, sm: 15.5, md: 16 },
              lineHeight: 1.9,
              px: { xs: 0.5, sm: 1 },
              ...fadeStyle(STAGGER_MS * 4),
            }}
          >
            {/* smart quotes for elegance */}“{items[index].quote}”
          </Typography>

          {/* Reviewed on */}
          <Typography
            variant="caption"
            sx={{
              mt: { xs: 2, sm: 2.5 },
              color: ACCENT,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              ...fadeStyle(STAGGER_MS * 5),
            }}
          >
            {items[index].reviewedOn}
          </Typography>

          {/* Signature */}
          <Typography
            aria-label="Reviewer"
            sx={{
              fontFamily: '"Allura", cursive',
              fontSize: { xs: 26, sm: 32 },
              lineHeight: 1.1,
              color: CORAL,
              mt: 0.5,
              ...fadeStyle(STAGGER_MS * 5 + 150),
            }}
          >
            {items[index].name}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

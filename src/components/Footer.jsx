import * as React from "react";
import { Box, Container, Typography, Link as MUILink } from "@mui/material";
import LABEL from "../assets/Logo.png";

const CORAL = "#e08b74";

export default function Footer({
  social = [
    { label: "Instagram", href: "https://www.instagram.com/colleenharpist/" },
    { label: "Facebook", href: "https://www.facebook.com/colleenharpist" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  quickLinks = [
    { label: "Orchestra", href: "https://www.stlphilharmonic.org" },
    {
      label: "Harp Guide",
      href: "https://www.harp-school.com/guides/choose-your-harp/?srsltid=AfmBOorZxFhpT89bpieh8h_3X2FTNR5kn9x9OYFIIXRAVmuKS1PqQZix",
    },
    {
      label: "Venues",
      href: "https://www.theknot.com/marketplace/wedding-reception-venues-st-louis-mo/affordable?utm_source=google&utm_medium=cpc&utm_campaign=MARKETPLACE_EVERGREEN&utm_content=performance_cpc_search-ad_pmax_venue&gad_source=1&gad_campaignid=22997580416&gbraid=0AAAAADiu8TnFBMnyhDRDl9VAbOdEWYPey&gclid=CjwKCAjwlt7GBhAvEiwAKal0csXlbJLRb-nySf37LEOFYHeMrNCaHKbRtgtW2xIwIsZAcrpnPDVffBoCwO8QAvD_BwE",
    },
  ],
  poweredBy = "Powered by Vite + React",
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
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  const FADE_MS = 900;
  const MOVE_MS = 600;
  const fadeStyle = (d = 0) => ({
    opacity: reveal ? 1 : 0,
    transform: reveal ? "none" : "translateY(8px)",
    transition: `opacity ${FADE_MS}ms ease-out ${
      reveal ? d : 0
    }ms, transform ${MOVE_MS}ms ease-out ${reveal ? d : 0}ms`,
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      transform: "none",
      opacity: 1,
    },
  });

  const linkSx = {
    color: "text.secondary",
    letterSpacing: ".22em",
    textTransform: "uppercase",
    fontSize: { xs: 12, sm: 12.5, md: 13 },
    textDecoration: "none",
    display: "block",
    "&:hover": { color: CORAL },
  };

  return (
    <Box
      ref={rootRef}
      component="footer"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        borderTop: "0.5px solid",
        borderColor: "#555749",
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container disableGutters sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
        {/* Top: two equal columns, centered; divider doesn't consume layout */}
        <Box
          sx={{
            position: "relative",
            maxWidth: { xs: 720, sm: 860, md: 980 }, // <— pull columns inward
            mx: "auto",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
            },
            gap: { xs: 4, md: 8 },
            justifyContent: "center", // <— center the two tracks
            alignItems: "start",
            minWidth: 0,
            ...fadeStyle(0),
          }}
        >
          {/* Vertical divider (md+) */}
          <Box
            aria-hidden
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              bgcolor: "#555749",
              transform: "translateX(-50%)",
              opacity: 0.8,
              zIndex: 0,
            }}
          />

          {/* Social (left) */}
          <Box
            sx={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "center", md: "center" }, // <— center column
              textAlign: { xs: "left", md: "center" }, // <— center labels
              gap: 2,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontFamily:
                  '"Cormorant Garamond","Garamond","Times New Roman",serif',
                fontWeight: 500,
                fontSize: { xs: 26, sm: 30, md: 34 },
                color: "#555749",
                letterSpacing: "-0.01em",
              }}
            >
              Social Media
            </Typography>

            <Box
              component="nav"
              aria-label="Social links"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              {social.map((l) => (
                <MUILink key={l.label} href={l.href} sx={linkSx}>
                  {l.label}
                </MUILink>
              ))}
            </Box>
          </Box>

          {/* Quick Links (right) — centered under heading */}
          <Box
            sx={{
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "center", md: "center" }, // <— center column
              textAlign: { xs: "left", md: "center" }, // <— center labels
              gap: 2,
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontFamily:
                  '"Cormorant Garamond","Garamond","Times New Roman",serif',
                fontWeight: 500,
                fontSize: { xs: 26, sm: 30, md: 34 },
                color: "#555749",
                letterSpacing: "-0.01em",
              }}
            >
              Quick Links
            </Typography>

            <Box
              component="nav"
              aria-label="Quick links"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "center" }, // <— centered stack
                gap: 1.25,
              }}
            >
              {quickLinks.map((l) => (
                <MUILink key={l.label} href={l.href} sx={linkSx}>
                  {l.label}
                </MUILink>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Middle: centered brand logo image */}
        <Box
          sx={{
            textAlign: "center",
            mt: { xs: 6, md: 8 },
            ...fadeStyle(150),
          }}
        >
          <MUILink
            href="/"
            underline="none"
            aria-label="Home"
            sx={{ display: "inline-block" }}
          >
            <Box
              component="img"
              src={LABEL}
              alt="Brand logo"
              sx={{
                height: { xs: 32, sm: 40, md: 48 }, // responsive logo height
                width: "auto",
                display: "block",
                mx: "auto",
                filter: "none",
              }}
            />
          </MUILink>
        </Box>

        {/* Bottom: small credits */}
        <Box
          sx={{
            textAlign: "center",
            mt: { xs: 2.5, md: 3 },
            ...fadeStyle(250),
          }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              letterSpacing: ".24em",
              textTransform: "uppercase",
              fontSize: { xs: 10.5, sm: 11, md: 12 },
              mb: 1,
            }}
          >
            {poweredBy}
          </Typography>
          <MUILink
            href="mailto:JaccobStanton@gmail.com?subject=Website%20Inquiry"
            aria-label="Email Jake Stanton"
            underline="always"
            sx={{
              color: "text.secondary",
              letterSpacing: ".24em",
              textTransform: "uppercase",
              fontSize: { xs: 10.5, sm: 11, md: 12 },
              display: "inline-block",
              "&:hover": { color: CORAL },
            }}
          >
            Made by Jake Stanton
          </MUILink>
        </Box>
      </Container>
    </Box>
  );
}

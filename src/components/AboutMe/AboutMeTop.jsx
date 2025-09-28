import * as React from "react";
import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import HERO1 from "../../assets/gallery/gallery4.webp";
import HERO2 from "../../assets/gallery/gallery5.webp";
import HERO3 from "../../assets/gallery/gallery6.webp";

export default function AboutMeTop({
  id = "top",
  images = [
    {
      src: HERO1,
      alt: "Backside view of Colleen playing Harp",
    },
    { src: HERO2, alt: "Still of Colleen with her harp" },
    {
      src: HERO3,
      alt: "Second still of Colleen with her harp",
    },
  ],
  overlay = {
    eyebrow: "About Me",
    title: "Learn More About Colleen",
    ctaLabel: "BOOK A CONSULT",
    show: true,
  },
}) {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        display: "block",
        backgroundColor: "background.default",
        py: { xs: 2, sm: 3, md: 4, lg: 6 },
        scrollMarginTop: { xs: "80px", md: "80px" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          px: { xs: 2, md: 3, lg: 4 },
          position: "relative",
        }}
      >
        {/* Flex row of images */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            gap: { xs: 2, md: 3, lg: 4 },
            alignItems: "stretch",
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {[0, 1, 2].map((i) => {
            const item = images[i];
            return (
              <Box
                key={i}
                sx={{
                  flex: "1 1 0",
                  minWidth: 0,
                  borderRadius: "var(--radius)",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: {
                      xs: 280,
                      sm: 380,
                      md: 600,
                      lg: 680,
                      xl: 760,
                      customXL: 840,
                    },
                    borderRadius: "inherit",
                    overflow: "hidden",
                    bgcolor: "grey.100",
                    outline: "1px solid transparent",
                  }}
                >
                  {item?.src && (
                    <Box
                      component="img"
                      src={item.src}
                      alt={item.alt || ""}
                      loading="eager"
                      sx={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>

        {overlay?.show && (
          <Paper
            elevation={0}
            sx={{
              position: "absolute",
              left: "50%",
              bottom: { xs: 16, sm: 24, md: 40, lg: 56 },
              transform: "translateX(-50%)",
              px: { xs: 3, sm: 4, md: 5, lg: 6 },
              py: { xs: 2.5, sm: 3, md: 3.5, lg: 4 },
              maxWidth: { xs: "min(100% - 32px, 720px)", md: 820, lg: 920 },
              borderRadius: "var(--radius)",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              zIndex: 1,
            }}
          >
            <Stack spacing={{ xs: 1, sm: 1.25, md: 1.5 }} alignItems="center">
              {/* Eyebrow */}
              <Typography
                variant="overline"
                sx={{
                  color: "rgb(160, 164, 142)",
                  letterSpacing: ".24em",
                  fontSize: { xs: 12, sm: 13, md: 14, lg: 15 },
                }}
              >
                {overlay.eyebrow}
              </Typography>

              {/* Title */}
              <Typography
                component="h1"
                align="center"
                sx={{
                  fontFamily: "Marcellus, serif",
                  color: "#555749",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  fontSize: { xs: 28, sm: 36, md: 48, lg: 56, xl: 64 },
                }}
              >
                {overlay.title}
              </Typography>
            </Stack>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

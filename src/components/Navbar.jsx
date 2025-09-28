import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Link as MUILink,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Link as RouterLink } from "react-router-dom";
const NAV_HEIGHT = 72;

function Brand({ logoSrc, href = "/" }) {
  return (
    <MUILink
      component={RouterLink}
      to={href}
      underline="none"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        color: "text.primary",
        lineHeight: 0,
      }}
      aria-label="Home"
    >
      {logoSrc ? (
        <Box
          component="img"
          src={logoSrc}
          alt="Logo"
          sx={{ height: 58, width: "auto" }}
        />
      ) : (
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            letterSpacing: ".08em",
            // mimic the elegant serif-y lockup in your screenshot:
            fontFamily:
              "'Inter Variable', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
          }}
        >
          LOGO
        </Typography>
      )}
    </MUILink>
  );
}

function NavLinkButton({ label, to = "#", withMenu = false, menuItems = [] }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const baseSx = {
    px: { xs: 1, sm: 1.25, md: 1.75 },
    py: 1,
    color: "#555749",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: ".18em",
    fontSize: { xs: 12, sm: 12.5, md: 13.5 },
    "&:hover": { color: "text.primary", opacity: 0.8 },
  };

  if (!withMenu) {
    return (
      <Button
        component={RouterLink}
        to={to}
        variant="text"
        disableRipple
        sx={baseSx}
      >
        {label}
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="text"
        disableRipple
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownRoundedIcon fontSize="small" />}
        sx={baseSx}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
      >
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {menuItems.map((mi) => (
          <MenuItem
            key={mi.label}
            onClick={() => setAnchorEl(null)}
            href={mi.href}
            component={RouterLink}
            to={to}
          >
            {mi.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default function Navbar({ logoSrc }) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);

  // Left and right groups (your requested order)
  const left = [
    { label: "Home", to: "/" },
    { label: "About", to: "/#about" },
    { label: "Services", to: "/#services" },
    // {
    //   label: "Pages",
    //   href: "/pages",
    //   withMenu: true,
    //   menuItems: [
    //     { label: "About", href: "/about" },
    //     { label: "Contact", href: "/contact" },
    //   ],
    // },
  ];

  const right = [
    { label: "Gallery", to: "/#gallery" },
    { label: "Testimonials", to: "/#reviews" },
    { label: "Contact", to: "/#contact" },
  ];

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: "background.default",
        borderBottom: "1px solid",
        borderRadius: 0,
        borderColor: "divider",
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: NAV_HEIGHT }}>
        {/* Content wrapper (use Box for max-width control instead of Container to avoid your false/boolean prop mismatch) */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* Desktop / tablet ≥ md */}
          <Box
            sx={{
              display: { xs: "none", md: "grid" },
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
            }}
          >
            {/* Left links: evenly spaced inside their side */}
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              {left.map((item) => (
                <NavLinkButton key={item.label} {...item} />
              ))}
            </Stack>

            {/* Center logo */}
            <Brand logoSrc={logoSrc} />

            {/* Right links: evenly spaced inside their side */}
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              {right.map((item) => (
                <NavLinkButton key={item.label} {...item} />
              ))}
            </Stack>
          </Box>

          {/* Mobile < md */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
              size="large"
              edge="start"
              sx={{ ml: -1 }}
            >
              <MenuRoundedIcon />
            </IconButton>

            <Brand logoSrc={logoSrc} />

            {/* Spacer to balance the left IconButton width */}
            <Box sx={{ width: 40 }} />
          </Box>
        </Box>
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ disableScrollLock: true }}
        // style the *paper* so the entire drawer (not just the content box) gets the bg
        PaperProps={{
          sx: {
            width: 300,
            borderRadius: 0,
            bgcolor: "background.default",
            color: "text.primary",
            backgroundImage: "none",
          },
        }}
      >
        <Box sx={{ width: "100%", pt: 1 }}>
          <List sx={{ py: 1 }}>
            {left.map((i) => (
              <ListItem key={`m-${i.label}`} disablePadding>
                <ListItemButton
                  href={i.href}
                  component={RouterLink}
                  to={i.to}
                  onClick={() => setOpen(false)}
                  sx={{
                    px: 2,
                    py: 1.25,
                    // default text style
                    "& .MuiListItemText-primary": {
                      color: "#555749",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: ".18em",
                      transition: "color 160ms ease",
                    },
                    // hover / focus / active -> coral
                    "&:hover .MuiListItemText-primary": { color: "#e08b74" },
                    "&.Mui-focusVisible .MuiListItemText-primary": {
                      color: "#e08b74",
                    },
                    "&:active .MuiListItemText-primary": { color: "#e08b74" },
                  }}
                >
                  <ListItemText
                    primary={i.label}
                    primaryTypographyProps={{
                      variant: "button",
                      sx: { fontSize: 13 },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <List sx={{ py: 1 }}>
            {right.map((i) => (
              <ListItem key={`m-${i.label}`} disablePadding>
                <ListItemButton
                  href={i.href}
                  component={RouterLink}
                  to={i.to}
                  onClick={() => setOpen(false)}
                  sx={{
                    px: 2,
                    py: 1.25,
                    "& .MuiListItemText-primary": {
                      color: "#555749",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: ".18em",
                      transition: "color 160ms ease",
                    },
                    "&:hover .MuiListItemText-primary": { color: "#e08b74" },
                    "&.Mui-focusVisible .MuiListItemText-primary": {
                      color: "#e08b74",
                    },
                    "&:active .MuiListItemText-primary": { color: "#e08b74" },
                  }}
                >
                  <ListItemText
                    primary={i.label}
                    primaryTypographyProps={{
                      variant: "button",
                      sx: { fontSize: 13 },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

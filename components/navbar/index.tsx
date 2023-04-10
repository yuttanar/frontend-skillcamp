import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Badge, Button, Hidden, ListItemIcon } from "@mui/material";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import TopHeaderBanner from './TopHeaderBanner'

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navbarItems: { label: string; url: string }[] = [
  { label: "Home", url: "/" },
  { label: "Shop Collection", url: "/shop-collection" },
  { label: "Our Story", url: "/our-story" },
  { label: "Contact", url: "/contact" },
];

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }} >
      <Typography  variant="h6" sx={{ my: 2 }} data-testid="navbar-brand-name-mobile">
        happy kids
      </Typography>
      <Divider />
      <List>
        {navbarItems.map((item, key) => (
          <ListItem key={key} disablePadding data-testid="navbar-link-mobile">
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "left" }}>
          <ListItemIcon>
              <AccountCircle /> Login
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "left" }}>
            <ListItemIcon>
              <ShoppingCart /> Cart
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <TopHeaderBanner />
      <div className="text-center mt-10 mb-4 text-5xl tracking-widest hidden sm:block">
        <Link data-testid="navbar-brand-name" href="/">happy kids</Link>
      </div>

      <header className="bg-white hidden sm:block">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1"></div>

          <div className="flex flex-row lg:justify-center lg:flex-auto">
            {navbarItems.map((item, key) => (
              <div className="flex-auto px-3" key={key}>
                <Link
                  href={item.url}
                  data-testid="navbar-link"
                  className={`text-sm leading-6 ${
                    router.pathname == item.url
                      ? "text-amber-600"
                      : "text-gray-900"
                  } hover:text-amber-500`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="lg:flex lg:flex-1 lg:justify-end" data-testid="navbar-button">
            <Button
              variant="text"
              size="small"
              color="inherit"
              startIcon={<AccountCircle />}
            >
              Log in
            </Button>
            <Button
              variant="text"
              size="small"
              color="inherit"
              startIcon={<ShoppingCart />}
            >
              {" "}
              <Badge badgeContent={0} color="primary" showZero />
            </Button>
          </div>
        </nav>
      </header>

      <Hidden smUp>
        <Box sx={{ display: "flex" }} data-testid="navbar-mobile">
          <CssBaseline />
          <div className="w-full">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}
              >
                happy kids
              </Typography>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                data-testid="navbar-mobile-toggle"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </div>
          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              anchor={"right"}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
      </Hidden>
    </>
  );
}

import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Root } from "./components/pages/root";
import VacationsPage from "./components/pages/vacations";
import RegisterPage from "./components/pages/registration";
import LoginPage from "./components/pages/login";
import AddVacationPage from "./components/pages/add-vacation";
import { useAuth } from "./context/AuthContext";
import EditVacation from "./components/pages/edit-vacation";
import VacationsReports from "./components/pages/reports";
import HomePage from "./components/pages/home";
import FaqPage from "./components/pages/faq";
import BlogPage from "./components/pages/blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "vacations",
        element: <VacationsPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "faq",
        element: <FaqPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "add-vacation",
        element: <AddVacationPage />,
      },
      {
        path: "edit-vacation",
        element: <EditVacation />,
      },
      {
        path: "vacations-reports",
        element: <VacationsReports />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const { logout, user } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const nav = useNavigate();
  const pages = [
    {
      name: "vacations",
      click: () => {
        nav("/vacations/");
      },
      admin: false,
    },
    {
      name: "Blog",
      click: () => {
        nav("/blog");
      },
      admin: false,
    },
    {
      name: "FAQ",
      click: () => {
        nav("/faq");
      },
      admin: false,
    },
    {
      name: "Add Vacation",
      click: () => {
        nav("/add-vacation");
      },
      admin: true,
    },
    {
      name: "Reports",
      click: () => {
        nav("/vacations-reports");
      },
      admin: true,
    },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Home Page
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-app-bar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-app-bar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages
                .filter((p) => user?.role === "admin" || !p.admin)
                .map(({ name, click }) => (
                  <MenuItem
                    key={name}
                    onClick={() => {
                      handleCloseNavMenu();
                      click();
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>{name}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
              .filter((p) => user?.role === "admin" || !p.admin)
              .map(({ name, click }) => (
                <Button
                  key={name}
                  onClick={() => {
                    handleCloseNavMenu();
                    click();
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {name}
                </Button>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user && (
              <Tooltip title="Open settings">
                <p
                  onClick={handleOpenUserMenu}
                  style={{
                    marginBlock: "auto",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "gray",
                    color: "white",
                    fontSize: "20px",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {user?.first_name.charAt(0).toUpperCase()}
                </p>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting == "Logout") {
                      const confirmed = confirm(
                        "Are you sure you want to log out?"
                      );
                      if (confirmed) logout();
                    }
                    handleCloseUserMenu();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export { ResponsiveAppBar };

export default App;

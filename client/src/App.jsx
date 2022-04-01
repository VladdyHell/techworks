import React from "react";
import { hot } from "react-hot-loader";
import { Routes, Route } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  Container,
} from "@material-ui/core";
import "./App.css";
import LandingPage, { navHeight } from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Footer, { footerPadding, footerFontSize } from "./components/Footer";
import AuthPage from "./pages/AuthPage";

export const totalHeroShrink = navHeight + footerPadding + footerFontSize;

const theme = createTheme({
  palette: {
    common: {
      black: "#1B262C",
    },
    primary: {
      main: "#3282B8",
      light: "#BBE1FA",
      dark: "#0F4C75",
    },
    // secondary: "#BBE1FA",
    secondary: {
      main: "#B86832",
      light: '#FAD4BB',
      dark: '#75380F',
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const useStyles = makeStyles((theme) => ({
  baseContainer: {
    minHeight: `calc(100vh - ${theme.spacing(totalHeroShrink)}px)`,
    marginTop: theme.spacing(navHeight),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container className={classes.baseContainer}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/auth/:page" element={<AuthPage />} />
          {/*<Route path="/signin" element={<LoginPage />} />*/}
        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default hot(module)(App);

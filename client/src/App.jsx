// Ecosystem
import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// MUI
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  Container,
} from "@material-ui/core";

// Pages
import LandingPage, { navHeight } from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import NewsFeed from "./pages/NewsFeed";
import Profile from "./pages/Profile";

// Components
import Navbar from "./components/layouts/Navbar";
// import LoginPage from "./pages/LoginPage";
import Footer, {
  footerPadding,
  footerFontSize,
} from "./components/layouts/Footer";
import PrivateRoute from "./components/layouts/PrivateRoute";

// Redux
// import { configureStore as store } from "./store";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authorize } from "./thunks/auth";
import setAuthToken from "./utils/setAuthToken";

// console.log('APP DID MOUNT')

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
      light: "#FAD4BB",
      dark: "#75380F",
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

function App({ authorize }) {
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    authorize();

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container className={classes.baseContainer}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="*"
            element={
              <h1 style={{ fontSize: "64px", textAlign: "center" }}>
                404 Not Found
              </h1>
            }
          />
          <Route path="/auth/:page" element={<AuthPage />} />
          <Route path="/home" element={<PrivateRoute component={NewsFeed} />} />
          <Route
            path="/profile/me"
            element={<PrivateRoute component={Profile} />}
          />
          {/*<Route path="/signin" element={<LoginPage />} />*/}
        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

App.propTypes = {
  authorize: PropTypes.func.isRequired,
};

export default hot(module)(connect(null, { authorize })(App));

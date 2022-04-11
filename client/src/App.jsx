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
  responsiveFontSizes,
} from "@material-ui/core";
import {
  yellow,
  green,
  pink,
  blue,
  white,
  red,
} from "@material-ui/core/colors";

// Pages
import LandingPage, { navHeight } from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import NewsFeed from "./pages/NewsFeed";
import Profile from "./pages/Profile";

// Pages
import Navbar from "./components/layouts/Navbar";
// import LoginPage from "./pages/LoginPage";
import Footer, {
  footerPadding,
  footerFontSize,
} from "./components/layouts/Footer";
import PrivateRoute from "./components/layouts/PrivateRoute";
import LoadingScreen from "./components/layouts/LoadingScreen";
// import CreateProfile from "./pages/CreateProfile";

// Components
import ProfileInfo from "./components/profile/ProfileInfo";
import ProfileAbout from './components/profile/ProfileAbout';

// Redux
// import { configureStore as store } from "./store";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authorize } from "./thunks/auth";
import setAuthToken from "./utils/setAuthToken";

// console.log('APP DID MOUNT')

export const totalHeroShrink = navHeight + footerPadding + footerFontSize;

let theme = createTheme({
  palette: {
    common: {
      black: "#1B262C",
    },
    primary: {
      main: blue[500] /*"#3282B8"*/,
      // light: "#BBE1FA",
      // dark: "#0F4C75",
    },
    // secondary: "#BBE1FA",
    secondary: {
      main: red[500] /*"#B86832"*/,
      // light: "#FAD4BB",
      // dark: "#75380F",
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

theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  baseContainer: {
    minHeight: `calc(100vh - ${theme.spacing(totalHeroShrink)}px)`,
    marginTop: theme.spacing(navHeight),
  },
}));

function App({ authorize, authorizing, isAuthenticated }) {
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

    if (!localStorage.profileBG) {
      localStorage.setItem("profileBG", Math.floor(Math.random() * 4));
    }
  }, []);

  return authorizing ? (
    <LoadingScreen />
  ) : (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container className={classes.baseContainer} disableGutters>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <LandingPage />
              ) : (
                <PrivateRoute component={NewsFeed} />
              )
            }
          />
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
          >
            <Route
              path=""
              element={<PrivateRoute component={ProfileInfo} />}
            />
            <Route
              path="about"
              element={<PrivateRoute component={ProfileAbout} />}
            />
            <Route
              path="photos"
              element={<h1>Photos</h1>}
            />
          </Route>
          {/*<Route
              path="create"
              element={<PrivateRoute component={CreateProfile} />}
            />
          </Route>*/}
          {/*<Route path="/signin" element={<LoginPage />} />*/}
        </Routes>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

App.propTypes = {
  authorize: PropTypes.func.isRequired,
  authorizing: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authorizing: state.auth.authorizing,
  isAuthenticated: state.auth.isAuthenticated,
});

export default hot(module)(connect(mapStateToProps, { authorize })(App));

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  useTheme,
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { AccountCircle, BlurCircular } from "@material-ui/icons";
import { yellow, green, pink, orange } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { auth } from "../../reducers/auth";
import { logout } from "../../actions/auth";
import { DarkModeToggle } from "react-dark-mode-toggle-2";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    color: "unset",
    textDecoration: "none",
  },
  iconButton: {
    [theme.breakpoints.down("xs")]: {
      padding: 8,
    },
  },
  avatar: {
    // marginLeft: theme.spacing(3),
    color: theme.palette.grey[50],
    backgroundColor: () => {
      const profileColors = [yellow[700], green[500], pink[500], orange[500]];
      return (
        // Math.floor(Math.random() * profileColors.length)
        profileColors[localStorage.profileBG]
      );
    },
  },
  link: {
    color: "unset",
    textDecoration: "none",
  },
  rightItems: { display: "flex", alignItems: "center" },
}));

function Navbar({
  isDarkMode,
  setIsDarkMode,
  isLoading,
  isAuthenticated,
  logout,
  user,
}) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  console.log(pathname);

  const theme = useTheme();
  const classes = useStyles();

  const handleLogout = () => {
    logout();
    navigate("/auth/signin");
  };

  const DarkModeToggler = (
    <DarkModeToggle
      onChange={(bool) => {
        localStorage.setItem("isDarkMode", bool);
        setIsDarkMode(bool);
        false && console.log(localStorage.isDarkMode);
      }}
      isDarkMode={eval(localStorage.isDarkMode)}
      size={64}
    />
  );

  const isDarkModeLS = eval(localStorage.isDarkMode);
  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkModeLS);
    setIsDarkMode(isDarkModeLS);
  }, [isDarkModeLS]);

  return (
    <AppBar
      position="fixed"
      color="primary"
      style={{
        background: eval(localStorage.isDarkMode) && theme.palette.grey["A400"],
      }}
    >
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.logo}>
          <BlurCircular />
          <Typography /*button*/ variant="h6" component="h1">
            TechWorks
          </Typography>
        </Link>
        {pathname != "/auth/signin" || pathname != "/auth/signup" ? (
          !isAuthenticated ? (
            <div className={classes.rightItems}>
              {DarkModeToggler}
              <Link to="auth/signin" role="button" className={classes.link}>
                <Button variant="text" color="inherit">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <div className={classes.rightItems}>
              {DarkModeToggler}
              <IconButton
                onClick={() => navigate("/profile/me")}
                classes={{ root: classes.iconButton }}
              >
                {/*<AccountCircle color="secondary" fontSize="large" className={classes.avatar} />;*/}
                <Avatar className={classes.avatar}>
                  {user && user.firstName[0].toUpperCase()}
                </Avatar>
              </IconButton>
              <Button onClick={handleLogout} variant="text" color="inherit">
                Logout
              </Button>
            </div>
          )
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  isLoading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

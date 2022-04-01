import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { AccountCircle, BlurCircular } from "@material-ui/icons";

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
  avatar: {
    marginLeft: theme.spacing(3),
  },
  link: {
    color: "unset",
    textDecoration: "none",
  },
}));

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Link to="/" className={classes.logo}>
          <BlurCircular />
          <Typography button variant="h6" component="h1">
            TechWorks
          </Typography>
        </Link>
        {pathname != "/auth/signin" || pathname != "/auth/signup" ? (
          !isLoggedIn ? (
            <Link to="auth/signin" role="button" className={classes.link}>
              <Button variant="text" color="inherit">
                Sign In
              </Button>
            </Link>
          ) : (
            <IconButton>
              <AccountCircle
                color="secondary"
                fontSize="large"
                className={classes.avatar}
              />
            </IconButton>
          )
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

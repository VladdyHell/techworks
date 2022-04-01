import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  makeStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { totalHeroShrink } from "../App";

export const navHeight = 8; // 4 // 12

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: `calc(100vh - ${theme.spacing(totalHeroShrink)}px)`,
  },
  contentContainer: {
    textAlign: "center",
  },
  ctaBtnContainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: `${theme.spacing(32)}px`,
    justifyContent: "space-evenly",
    margin: `${theme.spacing(4)}px auto 0`,
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className={classes.contentContainer}>
        <Typography variant="h3" component="h2">
          Welcome to TechWorks
        </Typography>
        <Typography variant="h6">A Social Networking for Developers</Typography>
        <ButtonGroup className={classes.ctaBtnContainer}>
          <Link to="auth/signup">
            <Button color="primary" variant="contained">
              Sign Up
            </Button>
          </Link>
          <Link to="auth/signin">
            <Button variant="outlined">Sign In</Button>
          </Link>
        </ButtonGroup>
      </div>
    </Container>
  );
}

export default LandingPage;

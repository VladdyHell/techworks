import React from "react";
import {
	makeStyles,
	Grid,
	Container,
	TextField,
	Paper,
	Typography,
} from "@material-ui/core";
import Tagline from "../components/auth/Tagline";
import AuthForm from "../components/auth/AuthForm";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../reducers/auth";

import { totalHeroShrink } from "../App";

const useStyles = makeStyles((theme) => ({
	container: {
		minHeight: `calc(100vh - ${theme.spacing(totalHeroShrink)}px)`,
		marginTop: "8vw" /*theme.spacing(16)*/,
	},
	gridContainer: {
		width: "100%",
		height: "100%",
	},
	formCard: {
		width: theme.spacing(112 /*104*/),
		maxWidth: "100%",
		height: theme.spacing(72 /*64*/),
		margin: "0 auto",
		[theme.breakpoints.down("sm")]: {
			height: "100%",
		},
	},
	taglineGridItem: {
		// width: "50%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: (isDarkMode) =>
			!isDarkMode ? theme.palette.primary.main : theme.palette.grey["A400"],
		backgroundImage:
			"url(https://www.transparenttextures.com/patterns/batthern.png)",
	},
	formGridItem: {
		// width: "50%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative;",
		zIndex: 0,
	},
}));

const AuthPage = ({ isAuthenticated }) => {
	const isDarkMode = eval(localStorage.isDarkMode);
	const classes = useStyles(isDarkMode);

	if (isAuthenticated) {
		return <Navigate to="/home" />;
	}

	return (
		<Container className={classes.container}>
			<Paper elevation={3} className={classes.formCard}>
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="center"
					className={classes.gridContainer}
				>
					<Grid item md={6} sm={12} xs={12} className={classes.taglineGridItem}>
						<Tagline />
					</Grid>
					<Grid item md={6} sm={12} xs={12} className={classes.formGridItem}>
						<AuthForm />
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

AuthPage.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AuthPage);

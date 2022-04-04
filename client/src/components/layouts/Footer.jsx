import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

export const footerPadding = 2; // 4
export const footerFontSize = 3;

const useStyles = makeStyles((theme) => ({
	footer: {
		fontSize: `${theme.spacing(footerFontSize)}px`,
		// paddingTop: "12.8rem",
		paddingBottom: theme.spacing(footerPadding),
		color: "#828282",
		textAlign: "center",
	},
}));

const Footer = () => {
	const classes = useStyles();
	return (
		<footer className={classes.footer}>
			<Typography variant="body2">
				Copyright &copy; Vladd Cantor {new Date().getFullYear()}
			</Typography>
		</footer>
	);
};

export default Footer;

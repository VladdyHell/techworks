import React from "react";
import { makeStyles, Container, Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	taglineContainer: {
		// width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const Tagline = () => {
	const classes = useStyles();

	return (
		<Container classes={classes.taglineContainer}>
			<Box textAlign="center">
				<Typography color="textPrimary" variant="h4">Welcome to TechWorks</Typography>
			</Box>
			<Typography color="textSecondary" variant="body1">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
				congue, mi ac hendrerit mollis, dui orci ornare mi, ac congue
				lorem neque et lectus. Cras ac ornare augue. Lorem ipsum dolor
				sit amet, consectetur adipiscing elit.
			</Typography>
		</Container>
	);
};

export default Tagline;

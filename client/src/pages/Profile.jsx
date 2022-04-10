import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getAuthProfile } from "../thunks/profile";

// MUI
import {
	makeStyles,
	Container,
	Grid,
	useMediaQuery,
} from "@material-ui/core";

// Components
// import ProfileLayout from "../components/layouts/ProfileLayout";
// import ProfileCreateCTA from "../components/profile/ProfileCreateCTA";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileMain from '../components/profile/ProfileMain';

const useStyles = (profileColor, matchesSM) =>
	makeStyles((theme) => ({
		container: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			overflow: "hidden",
			// width: theme.spacing(123), // Increase by padding
		},
		profileGrid: {
			// marginTop: theme.spacing(2.5),
		},
	}));

function Profile({
	profile,
	profile: { userProfile, loading },
	user,
	getAuthProfile,
}) {
	const matchesSM = useMediaQuery("(min-width: 600px)");
	const classes = useStyles(matchesSM)();

	useEffect(() => {
		getAuthProfile();
		// console.log("PROFILE: ", profile);
	}, []);

	return loading && !userProfile ? (
		<h1>Loading Profile...</h1>
	) : (
		<Container
			className={classes.container}
			maxWidth="md"
			fixed
			disableGutters={matchesSM}
		>
			<ProfileMain />
			<Grid container className={classes.profileGrid}>
				{/*Left Column*/}
				<Grid item xs={12} md={4}>
					{/*<ProfileStatus userProfile={userProfile} />*/}
					<ProfileInfo profile={profile} />
					{/*<Outlet />*/}
				</Grid>
			</Grid>
		</Container>
	);
}

Profile.propTypes = {
	getAuthProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
	getAuthProfile: () => dispatch(getAuthProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

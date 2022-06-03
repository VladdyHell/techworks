import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
	useLocation,
	useParams,
	Outlet,
	useOutletContext,
} from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getAuthProfile, getProfessionsTitle } from "../thunks/profile";

// MUI
import { makeStyles, Container, useMediaQuery } from "@material-ui/core";

// Components
// import ProfileLayout from "../components/layouts/ProfileLayout";
// import ProfileCreateCTA from "../components/profile/ProfileCreateCTA";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileMain from "../components/profile/ProfileMain";

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
	professions,
}) {
	const matchesSM = useMediaQuery("(min-width: 600px)");
	const classes = useStyles(matchesSM)();

	const { page } = useParams;
	const { pathname } = useLocation();
	const editProfilePath = pathname.split("/")[3];

	useEffect(() => {
		getAuthProfile();
		// console.log("PROFILE: ", profile);
	}, []);

	/*return loading && !userProfile ? (
		<h1>Loading Profile...</h1>
	) :*/ return (
		<Container
			className={classes.container}
			maxWidth="md"
			fixed
			disableGutters={matchesSM}
			style={{ paddingTop: matchesSM ? 16 : null }}
		>
			<ProfileMain />
			{/*<ProfileStatus userProfile={userProfile} />*/}
			{/*{!editProfilePath && <ProfileInfo profile={profile} />}*/}
			<Outlet context={{ profile }} />
		</Container>
	);
}

Profile.propTypes = {
	getAuthProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	professions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	professions: state.profile.professions,
});

const mapDispatchToProps = (dispatch) => ({
	getAuthProfile: () => dispatch(getAuthProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

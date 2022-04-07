import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { getAuthProfile } from "../thunks/profile";

// MUI
import {
	makeStyles,
	Avatar,
	Typography,
	Container,
	Paper,
	Box,
	Grid,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { yellow, green, pink, blue, white } from "@material-ui/core/colors";

// Components
import ProfileLayout from "../components/layouts/ProfileLayout";
import ProfileStatus from "../components/profile/ProfileStatus";
import ProfileInfo from "../components/profile/ProfileInfo";

const useStyles = (profileColor) =>
	makeStyles((theme) => ({
		container: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			// width: theme.spacing(123), // Increase by padding
		},
		profileMain: {
			width: "100%",
			height: theme.spacing(50),
			position: "relative",
			// background:
			// 	'url("https://picsum.photos/960/336/?grayscale&blur") no-repeat top right',
			// backgroundSize: `${theme.spacing(120)}px ${theme.spacing(42)}px`,
			[theme.breakpoints.down("sm")]: {
				height: "720px",
			},
		},
		profileCover: {
			width: "100%",
			height: 336,
			// background:
			// 	'url("https://picsum.photos/960/336/?grayscale&blur") no-repeat top right',
			backgroundSize: `${theme.spacing(120)}px ${theme.spacing(42)}px`,
			position: "absolute",
			zIndex: 0,
		},
		coverSkeleton: {
			position: "absolute",
			zIndex: 1,
			// backgroundColor: "rgba(0, 0, 0, 0.33)",
		},
		coverSkeletonBG: {
			position: "absolute",
			zIndex: 1,
			backgroundColor: "#FFF",
			opacity: 1,
			width: "100%",
			height: 336,
		},
		profileInfo: {
			display: "flex",
			position: "absolute",
			left: "88px",
			bottom: /*"64px"*/ "80px",
			alignItems: "end",
			zIndex: 2,
			[theme.breakpoints.down("sm")]: {
				top: "348px",
				flexDirection: "column",
				alignItems: "center",
				left: 0,
				right: 0,
				height: "120px",
				justifyContent: "space-between",
			},
		},
		profileGrid: {
			marginTop: theme.spacing(2.5),
		},
		avatar: {
			// marginLeft: theme.spacing(3),
			backgroundColor: (profileColor) => {
				const profileColors = [yellow[700], green[500], pink[500], blue[500]];
				return (
					// Math.floor(Math.random() * profileColors.length)
					profileColors[localStorage.profileBG]
				);
			},
			// width: "180px",
			// height: "180px",
			position: "relative",
			bottom: "32px",
			transform: "scale(4.5)",
			[theme.breakpoints.down("sm")]: {
				transform: "scale(3.5)",
			},
		},
		profileName: {
			fontSize: "32px",
			position: "relative",
			left: "96px",
			color: "#ffebee",
			[theme.breakpoints.down("sm")]: {
				left: "unset",
			},
		},
	}));

function Profile({
	profile: { userProfile, loading, profileColor },
	user,
	getAuthProfile,
}) {
	const classes = useStyles(profileColor)();

	const { pathname } = useLocation();
	const editProfilePath = pathname.split("/")[3];

	const [coverLoaded, setCoverLoaded] = useState(false);

	// setInterval(()=>{console.log(coverLoaded);}, 5000)

	useEffect(() => {
		getAuthProfile();
		// console.log("PROFILE: ", profile);
	}, []);

	return loading && !userProfile ? (
		<h1>Loading Profile...</h1>
	) : (
		<Container className={classes.container} maxWidth="md" fixed disableGutters>
			<Paper elevation={3} className={classes.profileMain}>
				{!coverLoaded && (
					<>
						<div className={classes.coverSkeletonBG}></div>
						<Skeleton
							className={classes.coverSkeleton}
							variant="rect"
							width="100%"
							height={336}
						/>
					</>
				)}
				<img
					src="https://picsum.photos/912/336/?grayscale&blur"
					className={classes.profileCover}
					onLoad={() => setCoverLoaded(true)}
				/>
				<Container>
					<Box component="span" className={classes.profileInfo}>
						<Avatar className={classes.avatar}>
							{user.firstName[0].toUpperCase()}
						</Avatar>
						<Typography variant="h6" className={classes.profileName}>
							{user.firstName} {user.lastName}
						</Typography>
					</Box>
				</Container>
			</Paper>
			<Grid container className={classes.profileGrid}>
				{/*Left Column*/}
				<Grid item xs={12} md={4}>
					{/*<ProfileStatus userProfile={userProfile} />*/}
					<ProfileInfo />
					<Outlet />
				</Grid>
			</Grid>
		</Container>
	);
}

Profile.propTypes = {
	getAuthProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
	getAuthProfile: () => dispatch(getAuthProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

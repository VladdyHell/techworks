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
	useMediaQuery,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { yellow, green, pink, orange, white } from "@material-ui/core/colors";

// Components
import ProfileLayout from "../components/layouts/ProfileLayout";
// import ProfileCreateCTA from "../components/profile/ProfileCreateCTA";
import ProfileInfo from "../components/profile/ProfileInfo";

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
		profileMain: {
			width: "100%",
			height: theme.spacing(50),
			position: "relative",
			overflow: "hidden",
			// background:
			// 	'url("https://picsum.photos/960/336/?grayscale&blur") no-repeat top right',
			// backgroundSize: `${theme.spacing(120)}px ${theme.spacing(42)}px`,
			[theme.breakpoints.down("xs")]: {
				height: 480 /*360*/ /*"720px"*/,
			},
		},
		profileCoverWrapper: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			/*[theme.breakpoints.down('xs')]: {
				display: "unset",
			}*/
		},
		profileCover: {
			width: 960,
			height: 336,
			// background: `url("${profileCoverURL}") no-repeat top right`,
			// backgroundSize: `${theme.spacing(120)}px ${theme.spacing(42)}px`,
			// backgroundPosition: "center",
			position: "absolute",
			zIndex: 0,
			[theme.breakpoints.down("xs")]: {
				width: 600 /*365.7142857*/,
				height: 228.5714286 /*128*/,
			},
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
			[theme.breakpoints.down("xs")]: {
				height: 228.5714286 /*128*/,
			},
		},
		profileInfo: {
			display: "flex",
			position: "absolute",
			alignItems: "end",
			zIndex: 2,
			width: "100%",
			height: "100%",
			[theme.breakpoints.down("xs")]: {
				top: 240 /*136*/,
				flexDirection: "column",
				alignItems: "center",
				left: 0,
				right: 0,
				height: "120px",
				justifyContent: "space-between",
			},
		},
		profileGrid: {
			// marginTop: theme.spacing(2.5),
		},
		avatar: {
			// marginLeft: theme.spacing(3),
			backgroundColor: (profileColor) => {
				const profileColors = [yellow[700], green[500], pink[500], orange[500]];
				return (
					// Math.floor(Math.random() * profileColors.length)
					profileColors[localStorage.profileBG]
				);
			},
			// width: "180px",
			// height: "180px",
			position: "relative",
			bottom: "36px",

			// Invert
			left: "88px",
			transform: "scale(4.5)",
			[theme.breakpoints.down("xs")]: {
				transform: "scale(3.5)",
				left: 0,
			},
			zIndex: 1,
		},
		nameWrapper: {
			width: 226,
			height: 42,
			background: "rgba(0,0,0, 0.5)",
			position: "absolute",
			left: 212,
			bottom: 6,
			borderRadius: 4,

			// Invert
			[theme.breakpoints.down("xs")]: {
				display: "none",
			},
		},
		profileName: {
			fontSize: "32px",
			position: "absolute",
			top: 0,
			color: /*"transparent"*/ matchesSM && "#ffebee",
			[theme.breakpoints.down("xs")]: {
				left: "unset",
				height: "unset",
				// color: "#000",
				top: "unset",
				bottom: "-2px",
				paddingLeft: "unset",
				position: "relative",
				width: "unset;",
			},
			width: "100%",
			height: "336px",
			// backgroundImage: `url("${profileCoverURL}")`,
			top: 0,
			// backgroundClip: "text",
			// filter: "invert(100%) contrast(4)",
			display: "flex",
			alignItems: "end",
			paddingLeft: "224px",
		},
	}));

function Profile({
	profile,
	profile: { userProfile, loading, profileColor },
	user,
	getAuthProfile,
}) {
	const profileCoverURL = "https://picsum.photos/960/336/";

	const matchesSM = useMediaQuery("(min-width: 600px)");
	const classes = useStyles(profileColor, matchesSM)();

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
		<Container
			className={classes.container}
			maxWidth="md"
			fixed
			disableGutters={matchesSM}
		>
			<Paper elevation={3} className={classes.profileMain}>
				{!coverLoaded && (
					<>
						<div className={classes.coverSkeletonBG}></div>
						<Skeleton
							className={classes.coverSkeleton}
							variant="rect"
							width="100%"
							height={!matchesSM ? 228.5714286 : 336}
						/>
					</>
				)}
				<Box className={classes.profileCoverWrapper}>
					<img
						src={profileCoverURL}
						className={classes.profileCover}
						onLoad={() => setCoverLoaded(true)}
					/>
				</Box>
				<Container
					disableGutters
					className={classes.profileCover}
					// For img element BG and to override width
					style={{ zIndex: 2, width: !matchesSM && "100%" }}
					// onLoad={() => setCoverLoaded(true)}
				>
					<Box component="span" className={classes.profileInfo}>
						<Avatar className={classes.avatar}>
							{user.firstName[0].toUpperCase()}
						</Avatar>
						<span className={classes.nameWrapper}></span>
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

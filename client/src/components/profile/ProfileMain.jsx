import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// MUI
import {
	makeStyles,
	Avatar,
	Typography,
	Container,
	Paper,
	Box,
	useMediaQuery,
	AppBar,
	Tabs,
	Tab,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { yellow, green, pink, orange, white } from "@material-ui/core/colors";
import ProfileMainInfo from "./ProfileMain.Info";

// Router
import {
	useNavigate,
	useParams,
	useLocation /*Outlet*/,
} from "react-router-dom";

const useStyles = (profileColor, matchesSM) =>
	makeStyles((theme) => ({
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

		// Appbar
		appbarRoot: {
			width: "unset",
			bottom: 0,
			top: "unset",
			height: 64,
			justifyContent: "center",
			background: "unset",
			color: "#000",
			boxShadow: "unset",
			zIndex: 0,
			[theme.breakpoints.down("xs")]: {
				width: "100%",
				alignItems: "center",
			},
		},
		tabs: {
			width: "100%",
		},
		tabsFlex: {
			justifyContent: "space-around",
		},
		tabItem: {
			minHeight: 64,
			paddingTop: 0,
			paddingBottom: 0,
		},
	}));

function ProfileMain({ user, profileColor }) {
	const profileCoverURL = "https://picsum.photos/960/336/";

	const matchesSM = useMediaQuery("(min-width: 600px)");
	const classes = useStyles(profileColor, matchesSM)();

	const [coverLoaded, setCoverLoaded] = useState(false);

	// setInterval(()=>{console.log(coverLoaded);}, 5000)

	const navigate = useNavigate();
	// const { page } = useParams();
	const { pathname } = useLocation();

	const editProfilePath = pathname.split("/")[3];

	const tabNameToIndex = {
		0: "",
		1: "about",
		2: "photos",
	};

	const indexToTabName = {
		main: 0,
		about: 1,
		photos: 2,
	};

	const [selectedTab, setSelectedTab] = useState(() =>
		editProfilePath ? indexToTabName[editProfilePath] : indexToTabName["main"]
	);

	const handleChange = (e, newVal) => {
		console.log(indexToTabName[""]);
		if (tabNameToIndex[newVal] != "")
			navigate(`/profile/me/${tabNameToIndex[newVal]}`);
		else navigate(`/profile/me`);
		setSelectedTab(newVal);
	};

	useEffect(() => {
		setSelectedTab(() =>
			editProfilePath ? indexToTabName[editProfilePath] : indexToTabName["main"]
		);
	}, [pathname]);

	return (
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
				<ProfileMainInfo user={user} />
			</Container>
			<AppBar position="absolute" classes={{ root: classes.appbarRoot }}>
				<Tabs
					value={selectedTab}
					onChange={handleChange}
					classes={{ flexContainer: classes.tabsFlex }}
					className={classes.tabs}
				>
					<Tab label="Main" classes={{ root: classes.tabItem }} />
					<Tab label="About" classes={{ root: classes.tabItem }} />
					<Tab label="Photos" classes={{ root: classes.tabItem }} />
				</Tabs>
			</AppBar>
		</Paper>
	);
}

ProfileMain.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	profileColor: state.profile.profileColor,
});

export default connect(mapStateToProps)(ProfileMain);

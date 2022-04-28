import React from "react";
import { useLocation } from "react-router-dom";

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
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { yellow, green, pink, orange, white } from "@material-ui/core/colors";

const useStyles = (matchesSM) =>
	makeStyles((theme) => ({
		profileMainInfo: {
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
		avatar: {
			// marginLeft: theme.spacing(3),
			color: theme.palette.grey[50],
			backgroundColor: () => {
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

function ProfileMainInfo({ user }) {
	const matchesSM = useMediaQuery("(min-width: 600px)");
	const classes = useStyles(matchesSM)();

	return (
		<Box component="span" className={classes.profileMainInfo}>
			<Avatar className={classes.avatar}>
				{user.firstName[0].toUpperCase()}
			</Avatar>
			<span className={classes.nameWrapper}></span>
			<Typography
				variant="h6"
				color="textPrimary"
				className={classes.profileName}
			>
				{user.firstName} {user.lastName}
			</Typography>
		</Box>
	);
}

export default ProfileMainInfo;

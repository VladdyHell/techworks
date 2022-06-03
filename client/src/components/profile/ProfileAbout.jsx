import React from "react";
import PropTypes from 'prop-types'
import { useOutletContext } from "react-router-dom";

// Material UI
import {
	LocationOn,
	Description,
	Work,
	Business,
	Language,
	GitHub,
	CastForEducation,
} from "@material-ui/icons";
import { blue, green, pink, orange, yellow } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";

// Components
import ProfileCard from "./ProfileCard";

// External Components
import Masonry from "react-masonry-css";

// redux
import { connect } from "react-redux";
import { getProfessionsTitle } from "../../thunks/profile";
import { getProfessionsSuccess } from "../../actions/profile";

const useStyles = makeStyles((theme) => ({
	myMasonryGrid: {
		display: "-webkit-box",
		display: "-ms-flexbox",
		display: "flex",
		marginLeft: "-16px",
		width: "100%",
		[theme.breakpoints.down("xs")]: {
			marginLeft: "unset",
		},
	},

	myMasonryGridColumn: {
		paddingLeft: "16px",
		backgroundClip: "padding-box",
		[theme.breakpoints.down("xs")]: {
			paddingLeft: "unset",
		},
	},
	myMasonryGridColumnGTDiv: {
		"& > div": {
			marginBottom: "16px",
		},
	},
}));

function ProfileAbout({
	professions,
	getProfessionsTitle,
	getProfessionsSuccess,
}) {
	const classes = useStyles();
	const { profile } = useOutletContext();

	const fields = [
		{
			title: "location",
			icon: <LocationOn />,
			backgroundColor: green[500],
		},
		{
			title: "website",
			icon: <Language />,
			backgroundColor: yellow[700],
		},
		{
			title: "githubusername",
			icon: <GitHub />,
			backgroundColor: green[500],
		},
	];

	const breakpoints = {
		default: 3,
		960: 2,
		600: 1,
	};

	return (
		<Masonry
			breakpointCols={breakpoints}
			className={classes.myMasonryGrid}
			columnClassName={classes.myMasonryGridColumn}
		>
			{fields.map((field, i) => (
				<ProfileCard
					key={i}
					field={field}
					topic={profile.professions}
					getXThunk={getProfessionsTitle}
					getXSuccessAction={getProfessionsSuccess}
				/>
			))}
		</Masonry>
	);
}

ProfileAbout.propTypes = {
	professions: PropTypes.object.isRequired,
	getProfessionsTitle: PropTypes.func.isRequired,
	getProfessionsSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	professions: state.profile.professions,
});

export default connect(mapStateToProps, {
	getProfessionsTitle,
	getProfessionsSuccess,
})(ProfileAbout);

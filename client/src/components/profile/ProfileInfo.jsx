import React from "react";
import PropTypes from 'prop-types'

// Components
import ProfileCard from "./ProfileCard";

// MUI
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
import { Grid, makeStyles } from "@material-ui/core";

// router
import { useOutletContext } from "react-router-dom";

// redux
import { connect } from "react-redux";
import { getProfessionsTitle } from "../../thunks/profile";
import { getProfessionsSuccess } from "../../actions/profile";

const useStyles = makeStyles((theme) => ({
	profileGrid: {
		// marginTop: theme.spacing(2.5),
	},
}));

function ProfileInfo({
	professions,
	getProfessionsTitle,
	getProfessionsSuccess,
}) {
	const { profile } = useOutletContext();

	const classes = useStyles();

	const fields = [
		{
			title: "bio",
			icon: <Description />,
			backgroundColor: blue[500],
		},
		{
			title: "status",
			icon: <Work />,
			backgroundColor: pink[500],
			isTags: true,
		},
		{
			title: "company",
			icon: <Business />,
			backgroundColor: orange[500],
		},
	];

	return (
		<Grid container className={classes.profileGrid}>
			{/*Left Column*/}
			<Grid item xs={12} md={4}>
				{fields.map((field, i) => (
					<ProfileCard
						key={i}
						field={field}
						topic={profile.professions}
						getXThunk={getProfessionsTitle}
						getXSuccessAction={getProfessionsSuccess}
					/>
				))}
			</Grid>
		</Grid>
	);
}

ProfileInfo.propTypes = {
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
})(ProfileInfo);

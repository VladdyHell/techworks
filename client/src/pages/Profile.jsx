import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAuthProfile } from "../thunks/profile";

function Profile({ profile, user, getAuthProfile }) {
	useEffect(() => {
		getAuthProfile();
	}, []);
	return (
		<div>
			<h1>
				Welcome {user.firstName} {user.lastName}
			</h1>
		</div>
	);
}

Profile.propTypes = {
	profile: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	user: state.auth.user,
});

export default connect(mapStateToProps, { getAuthProfile })(Profile);

import React from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";

function ProfileAbout() {
	const { profile } = useOutletContext();
	return (
		<div>
			<h1>About</h1>
		</div>
	);
}

ProfileAbout.propTypes = {};

export default ProfileAbout;

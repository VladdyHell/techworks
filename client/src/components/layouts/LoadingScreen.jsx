import React from "react";
import PropTypes from "prop-types";

function LoadingScreen(props) {
	return (
		<div>
			<h1 style={{ fontSize: "64px", textAlign: "center" }}>Authorizing...</h1>
		</div>
	);
}

LoadingScreen.propTypes = {};

export default LoadingScreen;

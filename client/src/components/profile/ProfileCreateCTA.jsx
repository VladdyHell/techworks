import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import {
	makeStyles,
	Typography,
	Button,
	Container,
	Card,
	CardHeader,
	CardActions,
	CardContent,
} from "@material-ui/core";

import { useLocation } from "react-router-dom";

function ProfileStatus({ userProfile }) {
	const { pathname } = useLocation();
	const editProfilePath = pathname.split("/")[3];

	return (
		<>
			{userProfile ? (
				<>
					<Typography variant="body1">BIO: {userProfile.bio}</Typography>
					<Link to="update">
						<Button color="primary" variant="contained">
							Edit Profile
						</Button>
					</Link>
				</>
			) : (
				<>
					{!editProfilePath && (
						<>
							<Card>
								<CardHeader title="Profile" />
								<CardContent>
									<Typography>Your Profile isn't Setup Yet</Typography>
								</CardContent>
								<CardActions>
									<Link to="create">
										<Button color="primary" variant="contained">
											Set It Up
										</Button>
									</Link>
								</CardActions>
							</Card>
						</>
					)}
				</>
			)}
		</>
	);
}

ProfileStatus.propTypes = {};

export default ProfileStatus;

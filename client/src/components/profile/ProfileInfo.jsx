import React from "react";
import ProfileCard from "./ProfileCard";

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

function ProfileInfo({ profile }) {
	const fields = [
		{
			title: "bio",
			icon: <Description />,
			backgroundColor: blue[500],
		},
		{
			title: "location",
			icon: <LocationOn />,
			backgroundColor: green[500],
		},
		{
			title: "status",
			icon: <Work />,
			backgroundColor: pink[500],
		},
		{
			title: "company",
			icon: <Business />,
			backgroundColor: orange[500],
		},
		{
			title: "website",
			icon: <Language />,
			backgroundColor: yellow[700],
		},
		{
			title: "skills",
			icon: <CastForEducation />,
			backgroundColor: blue[500],
		},
		{
			title: "githubusername",
			icon: <GitHub />,
			backgroundColor: green[500],
		},
	];

	return (
		<>
			{fields.map((field, i) => (
				<ProfileCard key={i} field={field} />
			))}
		</>
	);
}

export default ProfileInfo;

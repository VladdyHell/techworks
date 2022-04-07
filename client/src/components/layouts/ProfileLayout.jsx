import React from "react";
import { Grid } from "@material-ui/core";

function ProfileLayout({ children, items }) {
	return (
		<>
			// Top
			{children}
			// Left
			<Grid container>
				{items.map((item) => (
					<Grid item xs={12}>
						{children}
					</Grid>
				))}
			</Grid>
			// Right
		</>
	);
}

export default ProfileLayout;

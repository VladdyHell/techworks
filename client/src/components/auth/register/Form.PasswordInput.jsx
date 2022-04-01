import React from "react";
import {
	makeStyles,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Box,
	FormControl,
} from "@material-ui/core";
import { Visibility, VisibilityOff /*Lock;*/ } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	field: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2),
		// display: "block",
		width: "100%",
	},
	/*passwordFields: {
		"& div": {
			width: "50%",
		},
	},*/
}));

const PasswordInput = ({
	label,
	handleClickShowPassword,
	handleMouseDownPassword,
	showPassword,
	...attr
}) => {
	const classes = useStyles();
	return (
		<FormControl
			className={classes.field}
			variant="outlined"
		>
			<InputLabel htmlFor="outlined-adornment-password">
				{label}
			</InputLabel>
			<OutlinedInput
				{...attr}
				color="secondary"
				required
				id="outlined-adornment-password"
				type={showPassword ? "text" : "password"}
				// startAdornment={
				// 	<InputAdornment position="start">
				// 		<Lock />
				// 	</InputAdornment>
				// }
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
				labelWidth={70}
			/>
		</FormControl>
	);
};

export default PasswordInput;

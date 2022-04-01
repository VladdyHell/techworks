import React, { useState } from "react";
import {
	makeStyles,
	TextField,
	Button,
	InputAdornment,
	FormHelperText,
	InputLabel,
	OutlinedInput,
	IconButton,
	FormControl,
} from "@material-ui/core";
import {
	AccountBox,
	Email,
	Lock,
	Visibility,
	VisibilityOff,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	form: {
		display: "flex",
		justifyContent: "center",
		// alignItems: "center",
		flexDirection: "column",
		margin: `0 ${theme.spacing(4)}px` /*`${theme.spacing(8)}px auto 0`*/,
		width: /*"100%"*/ theme.spacing(44 /*38*/ /*56*/),
	},
	field: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		// display: "block",
		width: "100%",

		"&:nth-of-type(2)": {
			marginBottom: theme.spacing(2),
		},
	},
	formHelperText: {
		position: "relative",
		top: theme.spacing(-2),
		// marginBottom: theme.spacing()
	},
}));

const Form = () => {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		showPassword: false,
	});
	const [formError, setFormError] = useState({
		email: false,
		password: false,
	});

	const { email, password, showPassword } = formData;

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleClickShowPassword = () => {
		setFormData({ ...formData, showPassword1: !formData.showPassword1 });
	};

	const handleMouseDownPassword = (e) => {
		e.preventDefault();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormError({
			email: false,
			password: false,
		});
		if (email == "")
			setFormError((prevVal) => ({ ...prevVal, email: true }));
		if (password == "")
			setFormError((prevVal) => ({ ...prevVal, password: true }));
		console.log(formData);
	};

	const textFieldDefautls = {
		className: classes.field,
		variant: "outlined",
		color: "secondary",
		type: "text",
		required: true,
		InputProps: {
			startAdornment: (
				<InputAdornment position="start">
					<AccountBox />
				</InputAdornment>
			),
		},
	};

	return (
		<form
			noValidate
			autoComplete="off"
			className={classes.form}
			onSubmit={handleSubmit}
		>
			<TextField
				{...textFieldDefautls}
				label="Email"
				type="email"
				name="email"
				value={email}
				onChange={handleChange}
				error={formError.email}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Email />
						</InputAdornment>
					),
				}}
			/>

			{/*<PasswordInput
				label="Password"
				name="password"
				value={password}
				onChange={handleChange}
				handleClickShowPassword={handleClickShowPassword}
				handleMouseDownPassword={handleMouseDownPassword}
				showPassword={showPassword}
				error={formError.password}
			/>*/}

			<FormControl className={classes.field} variant="outlined">
				<InputLabel htmlFor="outlined-adornment-password">
					Password
				</InputLabel>
				<OutlinedInput
					label="Password"
					name="password"
					color="secondary"
					value={password}
					onChange={handleChange}
					error={formError.password}
					required
					id="outlined-adornment-password"
					type={formData.showPassword ? "text" : "password"}
					startAdornment={
						<InputAdornment position="start">
							<Lock />
						</InputAdornment>
					}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
						</InputAdornment>
					}
					labelWidth={70}
				/>
			</FormControl>

			{formError.password.err && (
				<FormHelperText error className={classes.formHelperText}>
					{formError.password.msg}
				</FormHelperText>
			)}
			<Button
				type="submit"
				variant="contained"
				color="secondary"
				fullWidth
			>
				Login
			</Button>
		</form>
	);
};

export default Form;

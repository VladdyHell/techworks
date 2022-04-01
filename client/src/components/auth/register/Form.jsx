import React, { useState } from "react";
import {
	makeStyles,
	TextField,
	Grid,
	Button,
	InputAdornment,
	FormHelperText,
} from "@material-ui/core";
import { AccountBox, Email } from "@material-ui/icons";
import PasswordInput from "./Form.PasswordInput";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSignupError } from "../../../actions/signupError";
import { initialState as signupErrorInitial } from "../../../reducers/signupError";

const useStyles = makeStyles((theme) => ({
	form: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		margin: `0 ${theme.spacing(4)}px` /*`${theme.spacing(8)}px auto 0`*/,
		width: /*"100%"*/ theme.spacing(44 /*38*/ /*56*/),
	},
	field: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		// display: "block",
		width: "100%",
	},
	formHelperText: {
		position: "relative",
		top: theme.spacing(-2),
		// marginBottom: theme.spacing()
	},
}));

function Form({ signupError, setSignupError }) {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPass: "",
		showPassword1: false,
		showPassword2: false,
	});

	const {
		firstName,
		lastName,
		email,
		password,
		confirmPass,
		showPassword1,
		showPassword2,
	} = formData;

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleClickShowPassword1 = () => {
		setFormData({ ...formData, showPassword1: !formData.showPassword1 });
	};
	const handleClickShowPassword2 = () => {
		setFormData({ ...formData, showPassword2: !formData.showPassword2 });
	};

	const handleMouseDownPassword = (e) => {
		e.preventDefault();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSignupError({
			...signupErrorInitial,
		});
		if (firstName == "") {
			setSignupError({
				firstName: { err: true, msg: "First Name is required" },
			});
		}
		if (lastName == "")
			setSignupError({
				lastName: { err: true, msg: "Last Name is required" },
			});
		if (email == "")
			setSignupError({
				email: { err: true, msg: "Email is required", type: "empty" },
			});
		if (password == "")
			setSignupError({
				password: { err: true, msg: "Password is required", type: "empty" },
			});
		if (confirmPass == "")
			setSignupError({
				confirmPass: {
					err: true,
					msg: "Password Confirmation is required",
					type: "empty",
				},
			});
		if (password !== confirmPass) {
			if (
				signupError.password.type == "empty" ||
				signupError.confirmPass.type == "empty"
			) {
				return;
			}
			setSignupError({
				password: { err: true, msg: null },
				confirmPass: {
					err: true,
					msg: "Password doesn't match",
					type: "matching",
				},
			});
		}
		/*if (
	signupError.password.type != "empty" ||
	signupError.confirmPass.type != "empty"
) {
	if (password === confirmPass) {
		return;
	}
	setSignupError({
		password: { err: true, msg: null },
		confirmPass: {
			err: true,
			msg: "Password doesn't match",
			type: "matching",
		},
	});
}*/
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
				label="First Name"
				name="firstName"
				value={firstName}
				onChange={handleChange}
				error={signupError.firstName.err}
				helperText={signupError.firstName.msg}
			/>
			<TextField
				{...textFieldDefautls}
				label="Last Name"
				name="lastName"
				value={lastName}
				onChange={handleChange}
				error={signupError.lastName.err}
				helperText={signupError.lastName.msg}
			/>
			<TextField
				{...textFieldDefautls}
				label="Email"
				type="email"
				name="email"
				value={email}
				onChange={handleChange}
				error={signupError.email.err}
				helperText={signupError.email.msg}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Email />
						</InputAdornment>
					),
				}}
			/>
			<Grid container spacing={2}>
				<Grid item md={6} sm={12} xs={12}>
					{/*<TextField
							className={classes.field}
							variant="outlined"
							color="secondary"
							label="Password"
							type="password"
							required
						/>*/}
					<PasswordInput
						label="Password"
						name="password"
						value={password}
						onChange={handleChange}
						handleClickShowPassword={handleClickShowPassword1}
						handleMouseDownPassword={handleMouseDownPassword}
						showPassword={showPassword1}
						error={signupError.password.err}
						helperText={signupError.password.msg}
					/>
				</Grid>
				<Grid item md={6} sm={12} xs={12}>
					<PasswordInput
						label="Confirm Pass"
						name="confirmPass"
						value={confirmPass}
						onChange={handleChange}
						handleClickShowPassword={handleClickShowPassword2}
						handleMouseDownPassword={handleMouseDownPassword}
						showPassword={showPassword2}
						error={signupError.confirmPass.err}
						helperText={signupError.confirmPass.msg}
					/>
				</Grid>
			</Grid>
			{signupError.confirmPass.type == "matching" && (
				/*&& (!signupError.password.type == "empty" ||
				!signupError.confirmPass.type) == "empty"*/ <FormHelperText
					error
					className={classes.formHelperText}
				>
					{signupError.confirmPass.msg}
				</FormHelperText>
			)}
			<Button type="submit" variant="contained" color="secondary" fullWidth>
				Sign Up
			</Button>
		</form>
	);
}

Form.propTypes = {
	signupError: PropTypes.object.isRequired,
	setSignupError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	signupError: state.signupError,
});

export default connect(mapStateToProps, { setSignupError })(Form);

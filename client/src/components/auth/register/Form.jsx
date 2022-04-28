import React, { useState, useEffect } from "react";
import {
	makeStyles,
	useMediaQuery,
	TextField,
	Grid,
	Button,
	InputAdornment,
	FormHelperText,
	CircularProgress,
} from "@material-ui/core";
import { AccountBox, Email } from "@material-ui/icons";
import PasswordInput from "../Form.PasswordInput";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFormError } from "../../../actions/auth";
import { initialFormState } from "../../../reducers/auth";
import { signup } from "../../../thunks/auth";

const useStyles = (loading) =>
	makeStyles((theme) => ({
		form: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
			margin: `0 ${theme.spacing(4)}px` /*`${theme.spacing(8)}px auto 0`*/,
			width: /*"100%"*/ theme.spacing(44 /*38*/ /*56*/),
			// filter: (loading) => (loading ? "blur(2px)" : null),
			maxWidth: "100%",
			[theme.breakpoints.down("sm")]: {
				width: "100%",
				padding: 0,
				margin: 0,
			},
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
		signupProgress: {
			position: "absolute",
			zIndex: 99,
		},
		circle: {
			strokeLinecap: "round",
		},
		submitButton: {
			marginTop: theme.spacing(1)
		},
	}));

function Form({ formError, setFormError, authLoading, signup }) {
	const classes = useStyles(authLoading)();
	const matchesSM = useMediaQuery("(min-width: 600px)");

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError({
			...initialFormState,
		});
		// if (firstName == "") {
		// 	setFormError({
		// 		firstName: { err: true, msg: "First Name is required" },
		// 	});
		// }
		// if (lastName == "")
		// 	setFormError({
		// 		lastName: { err: true, msg: "Last Name is required" },
		// 	});
		// if (email == "")
		// 	setFormError({
		// 		email: { err: true, msg: "Email is required", type: "empty" },
		// 	});
		// if (password == "")
		// 	setFormError({
		// 		password: { err: true, msg: "Password is required", type: "empty" },
		// 	});
		if (confirmPass == "")
			setFormError({
				confirmPass: {
					err: true,
					// msg: "Password Confirmation is required",
					// type: "empty",
				},
			});
		if (password !== confirmPass) {
			if (
				formError.password.type == "empty" ||
				formError.confirmPass.type == "empty"
			) {
				return;
			}
			setFormError({
				password: { err: true, msg: null },
				confirmPass: {
					err: true,
					msg: "Password doesn't match",
					// type: "matching",
				},
			});
			return;
		}
		/*if (
	formError.password.type != "empty" ||
	formError.confirmPass.type != "empty"
) {
	if (password === confirmPass) {
		return;
	}
	setFormError({
		password: { err: true, msg: null },
		confirmPass: {
			err: true,
			msg: "Password doesn't match",
			type: "matching",
		},
	});
}*/
		// console.log(formData);
		// console.log("Before", auth);
		await signup({ firstName, lastName, email, password });
		// console.log("After", auth);
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

	useEffect(() => {
		setFormError({
			...initialFormState,
		});
	}, []);

	return (
		<>
			{authLoading && (
				<>
					<CircularProgress
						variant="determinate"
						size={32}
						className={classes.signupProgress}
						value={100}
					/>
					<CircularProgress
						variant="indeterminate"
						disableShrink
						color="secondary"
						size={32}
						className={classes.signupProgress}
						classes={{
							circle: classes.circle,
						}}
					/>
				</>
			)}
			<form
				noValidate
				autoComplete="off"
				className={classes.form}
				// style={{ filter: authLoading && "blur(1px)" }}
				onSubmit={handleSubmit}
			>
				<TextField
					{...textFieldDefautls}
					label="First Name"
					name="firstName"
					value={firstName}
					onChange={handleChange}
					error={formError.firstName.err}
					helperText={formError.firstName.msg}
					disabled={authLoading}
				/>
				<TextField
					{...textFieldDefautls}
					label="Last Name"
					name="lastName"
					value={lastName}
					onChange={handleChange}
					error={formError.lastName.err}
					helperText={formError.lastName.msg}
					disabled={authLoading}
				/>
				<TextField
					{...textFieldDefautls}
					label="Email"
					type="email"
					name="email"
					value={email}
					onChange={handleChange}
					error={formError.email.err}
					helperText={formError.email.msg}
					disabled={authLoading}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Email />
							</InputAdornment>
						),
					}}
				/>
				<Grid container spacing={matchesSM ? 2 : null}>
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
							error={formError.password.err}
							// helperText={formError.password.msg}
							disabled={authLoading}
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
							error={formError.confirmPass.err}
							// helperText={formError.confirmPass.msg}
							disabled={authLoading}
						/>
					</Grid>
				</Grid>
				{formError.confirmPass /*.type == "matching"*/ && (
					/*&& (!formError.password.type == "empty" ||
				!formError.confirmPass.type) == "empty"*/ <FormHelperText
						error
						className={classes.formHelperText}
					>
						{formError.confirmPass.msg}
					</FormHelperText>
				)}
				<Button
					type="submit"
					variant="contained"
					color="secondary"
					disabled={authLoading}
					fullWidth
					className={classes.submitButton}
				>
					Sign Up
				</Button>
			</form>
		</>
	);
}

Form.propTypes = {
	formError: PropTypes.object.isRequired,
	setFormError: PropTypes.func.isRequired,
	signup: PropTypes.func.isRequired,
	authLoading: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	formError: state.formError,
	authLoading: state.formError.loading,
});

const mapDispatchToProps = (dispatch) => ({
	setFormError: (errObj) => dispatch(setFormError(errObj)),
	signup: (infos) => dispatch(signup(infos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

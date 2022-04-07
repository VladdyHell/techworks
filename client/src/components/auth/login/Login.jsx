import React, { useState, useEffect } from "react";
import {
	makeStyles,
	TextField,
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
import { login } from "../../../thunks/auth";

const useStyles = (loading) =>
	makeStyles((theme) => ({
		form: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
			margin: `0 ${theme.spacing(4)}px`,
			width: theme.spacing(44),
		},
		field: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
			width: "100%",
		},
		formHelperText: {
			position: "relative",
			top: theme.spacing(-2),
		},
		loginProgress: {
			position: "absolute",
			zIndex: 99,
		},
		circle: {
			strokeLinecap: "round",
		},
	}));

function Login({ formError, setFormError, authLoading, login }) {
	const classes = useStyles(authLoading)();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		showPassword: false,
	});

	const { email, password, showPassword } = formData;

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleClickShowPassword= () => {
		setFormData({ ...formData, showPassword: !formData.showPassword });
	};

	const handleMouseDownPassword = (e) => {
		e.preventDefault();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError({
			...initialFormState,
		});

		await login({ email, password });
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
						className={classes.loginProgress}
						value={100}
					/>
					<CircularProgress
						variant="indeterminate"
						disableShrink
						color="secondary"
						size={32}
						className={classes.loginProgress}
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
				<PasswordInput
					label="Password"
					name="password"
					value={password}
					onChange={handleChange}
					handleClickShowPassword={handleClickShowPassword}
					handleMouseDownPassword={handleMouseDownPassword}
					showPassword={showPassword}
					error={formError.password.err}
					disabled={authLoading}
				/>
				{formError.confirmPass && (
					<FormHelperText error className={classes.formHelperText}>
						{formError.confirmPass.msg}
					</FormHelperText>
				)}
				<Button
					type="submit"
					variant="contained"
					color="secondary"
					disabled={authLoading}
					fullWidth
				>
					Sign In
				</Button>
			</form>
		</>
	);
}

Login.propTypes = {
	formError: PropTypes.object.isRequired,
	setFormError: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	authLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	formError: state.formError,
	authLoading: state.formError.loading,
});

const mapDispatchToProps = (dispatch) => ({
	setFormError: (errObj) => dispatch(setFormError(errObj)),
	login: (infos) => dispatch(login(infos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

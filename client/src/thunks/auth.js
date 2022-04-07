import http, { authHttp } from "../utils/http-common";
import setAuthToken from "../utils/setAuthToken";

const DEBUG = false;

import {
	setFormError,
	signupSuccess,
	signupInProgress,
	signupError,
	loginSuccess,
	loginInProgress,
	loginError,
	authSuccess,
	authInProgress,
	authError,
} from "../actions/auth";

export const authorize = () => async (dispatch) => {
	try {
		dispatch(authInProgress());

		if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

		const res = await http.get("/auth");

		dispatch(authSuccess(res.data));
	} catch (e) {
		dispatch(authError(e.response.data));
	}
};

export const signup = (infos) => async (dispatch) => {
	try {
		dispatch(signupInProgress());
		const body = JSON.stringify(infos);

		const res = await http.post("/users", body);

		DEBUG && console.log(res.data);

		dispatch(signupSuccess(res.data));
		dispatch(authorize());
	} catch (e) {
		const err = e.response.data;
		DEBUG && console.error(err.errors);
		dispatch(signupError(err.errors));

		const errFields = err.errors.map(({ param }) => param);

		errFields.forEach((field) => {
			const errMsg = err.errors[errFields.indexOf(field)].msg;
			if (field != "password") {
				return dispatch(
					setFormError({
						[field]: {
							err: true,
							msg: errMsg,
						},
					})
				);
			}
			dispatch(
				setFormError({
					password: {
						err: true,
						msg: errMsg,
						// type: "empty",
					},
					confirmPass: {
						err: true,
						msg: errMsg,
						// type: "empty",
					},
				})
			);
		});
	}
};

export const login = (infos) => async (dispatch) => {
	try {
		dispatch(loginInProgress());

		const res = await http.post("/auth", infos);

		dispatch(loginSuccess(res.data));
		dispatch(authorize());
	} catch (e) {
		const err = e.response.data;
		dispatch(loginError(err));

		const errFields = err.errors.map(({ param }) => param);

		errFields.forEach((field) => {
			const errMsg = err.errors[errFields.indexOf(field)].msg;
			dispatch(
				setFormError({
					[field]: {
						err: true,
						msg: errMsg,
					},
				})
			);
		});
	}
};

import {
	SET_FORM_ERROR,
	AUTH_SUCCESS,
	AUTH_IN_PROGRESS,
	AUTH_ERROR,
	SIGNUP_SUCCESS,
	SIGNUP_IN_PROGRESS,
	SIGNUP_ERROR,
	LOGIN_SUCCESS,
	LOGIN_IN_PROGRESS,
	LOGIN_ERROR,
	LOGOUT,
} from "./types";

export const setFormError = (errorObj) => (dispatch) => {
	dispatch({
		type: SET_FORM_ERROR,
		payload: { errorObj },
	});
};

export const authSuccess = (user) => (dispatch) => {
	dispatch({
		type: AUTH_SUCCESS,
		payload: { user },
	});
};

export const authInProgress = () => (dispatch) => {
	dispatch({
		type: AUTH_IN_PROGRESS,
	});
};

export const authError = (err) => (dispatch) => {
	dispatch({
		type: AUTH_ERROR,
		payload: { err },
	});
};

export const signupSuccess = (token) => (dispatch) => {
	dispatch({
		type: SIGNUP_SUCCESS,
		payload: token,
	});
};

export const signupInProgress = () => (dispatch) => {
	dispatch({
		type: SIGNUP_IN_PROGRESS,
	});
};

export const signupError = (err) => (dispatch) => {
	dispatch({
		type: SIGNUP_ERROR,
		payload: { err },
	});
};

export const loginSuccess = (token) => (dispatch) => {
	dispatch({
		type: LOGIN_SUCCESS,
		payload: token,
	});
};

export const loginInProgress = () => (dispatch) => {
	dispatch({
		type: LOGIN_IN_PROGRESS,
	});
};

export const loginError = (err) => (dispatch) => {
	dispatch({
		type: LOGIN_ERROR,
		payload: { err },
	});
};

export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};

import { SET_SIGNUP_ERROR } from "./types";

export const setSignupError = (errorObj) => (dispatch) => {

	dispatch({
		type: SET_SIGNUP_ERROR,
		payload: { errorObj },
	});
};

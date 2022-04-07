import {
	GET_PROFILE_SUCCESS,
	GET_PROFILE_IN_PROGRESS,
	GET_PROFILE_FAILURE,
} from "./types";

export const getProfileSuccess = (profile) => (dispatch) => {
	dispatch({
		type: GET_PROFILE_SUCCESS,
		payload: { profile },
	});
};

export const getProfileInProgress = () => (dispatch) => {
	dispatch({
		type: GET_PROFILE_IN_PROGRESS,
	});
};

export const getProfileFailure = (err) => (dispatch) => {
	dispatch({
		type: GET_PROFILE_FAILURE,
		payload: { err },
	});
};

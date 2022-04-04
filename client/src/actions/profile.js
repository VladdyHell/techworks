import {
	GET_PROFILE_SUCCESS,
	GET_PROFILE_IN_PROGRESS,
	GET_PROFILE_FAILURE,
} from "./types";

export const getProfileSuccess = () => (dispatch) => {
	dispatch({
		type: GET_PROFILE_SUCCESS,
	});
};

export const getProfileInProgress = () => (dispatch) => {
	dispatch({
		type: GET_PROFILE_IN_PROGRESS,
	});
};

export const getProfileFailure = () => (dispatch) => {
	dispatch({
		type: GET_PROFILE_FAILURE,
	});
};

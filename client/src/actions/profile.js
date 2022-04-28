import {
	GET_PROFILE_SUCCESS,
	GET_PROFILE_IN_PROGRESS,
	GET_PROFILE_FAILURE,
	GET_PROFESSIONS_SUCCESS,
	GET_PROFESSIONS_IN_PROGRESS,
	GET_PROFESSIONS_FAILURE,
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

export const getProfessionsSuccess = (professions) => (dispatch) => {
	dispatch({
		type: GET_PROFESSIONS_SUCCESS,
		payload: { professions },
	});
};

export const getProfessionsInProgress = () => (dispatch) => {
	dispatch({
		type: GET_PROFESSIONS_IN_PROGRESS,
	});
};

export const getProfessionsFailure = (err) => (dispatch) => {
	dispatch({
		type: GET_PROFESSIONS_FAILURE,
		payload: { err },
	});
};

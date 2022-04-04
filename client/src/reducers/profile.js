import {
	GET_PROFILE_SUCCESS,
	GET_PROFILE_IN_PROGRESS,
	GET_PROFILE_FAILURE,
} from "../actions/types";

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

export const profile = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE_SUCCESS: {
			return {
				...state,
				profile: payload.profile,
				loading: false,
			};
		}
		case GET_PROFILE_FAILURE: {
			return {
				...state,
				error: payload.err,
				loading: false,
				profile: null,
			};
		}
		default:
			return state;
	}
};

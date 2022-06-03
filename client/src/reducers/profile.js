import {
	GET_PROFILE_SUCCESS,
	GET_PROFILE_IN_PROGRESS,
	GET_PROFILE_FAILURE,
	CLEAR_PROFILE,
	GET_PROFESSIONS_SUCCESS,
	GET_PROFESSIONS_IN_PROGRESS,
	GET_PROFESSIONS_FAILURE,
} from "../actions/types";

const initialState = {
	userProfile: null,
	profiles: [],
	repos: [],
	loading: false,
	error: {},
	profileColor: Math.floor(Math.random() * 4),
	professions: {
		lists: [],
		loading: false,
		error: {},
	},
};

const DEBUG = false;

export const profile = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE_SUCCESS: {
			DEBUG && console.log("Success", payload.profile);
			return {
				...state,
				userProfile: payload.profile,
				loading: false,

				error: {},
			};
		}
		case GET_PROFILE_IN_PROGRESS: {
			return {
				...state,
				loading: true,

				error: {},
				userProfile: null,
			};
		}
		case GET_PROFILE_FAILURE: {
			DEBUG && console.error("Error", payload.err);
			return {
				...state,
				error: payload.err,
				loading: false,
				userProfile: null,
			};
		}
		case CLEAR_PROFILE: {
			return {
				...state,
				userProfile: null,
				repos: [],
			};
		}
		case GET_PROFESSIONS_SUCCESS: {
			DEBUG && console.log("Professions Success!");
			DEBUG && console.log(payload.professions);
			return {
				...state,
				professions: {
					...state.professions,
					lists: payload.professions,
				},
			};
		}
		case GET_PROFESSIONS_IN_PROGRESS: {
			DEBUG && console.log("Professions in Progress...");
			return {
				...state,
				professions: {
					...state.professions,
					loading: true,
				},
			};
		}
		case GET_PROFESSIONS_FAILURE: {
			DEBUG && console.error("Professions Error!:");
			DEBUG && console.error(payload.err);
			return {
				...state,
				professions: {
					lists: [],
					loading: false,
					error: payload.err,
				},
			};
		}
		default:
			return state;
	}
};

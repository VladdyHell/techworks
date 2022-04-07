import {
	GET_PROFILE_SUCCESS,
	GET_PROFILE_IN_PROGRESS,
	GET_PROFILE_FAILURE,
	CLEAR_PROFILE,
} from "../actions/types";

const initialState = {
	userProfile: null,
	profiles: [],
	repos: [],
	loading: false,
	error: {},
	profileColor: Math.floor(Math.random() * 4)
};

export const profile = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE_SUCCESS: {
			console.log('Success', payload.profile);
			return {
				...state,
				userProfile: payload.profile,
				loading: false,
			};
		}
		case GET_PROFILE_IN_PROGRESS: {
			return {
				...state,
				loading: true,
			}
		}
		case GET_PROFILE_FAILURE: {
			console.error('Error', payload.err)
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
		default:
			return state;
	}
};

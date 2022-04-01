import { SET_SIGNUP_ERROR } from "../actions/types";

export const initialState = {
	firstName: {
		err: false,
		msg: null,
	},
	lastName: {
		err: false,
		msg: null,
	},
	email: {
		err: false,
		msg: null,
	},
	password: {
		err: false,
		msg: null,
		type: null,
	},
	confirmPass: {
		err: false,
		msg: null,
		type: null,
	},
};

export const signupError = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_SIGNUP_ERROR: {
			const { errorObj } = payload;
			console.log({ ...state, ...errorObj });
			return { ...state, ...errorObj };
		}
		default:
			return state;
	}
};

import {
	SET_FORM_ERROR,
	SIGNUP_SUCCESS,
	SIGNUP_IN_PROGRESS,
	SIGNUP_ERROR,
	LOGIN_SUCCESS,
	LOGIN_IN_PROGRESS,
	LOGIN_ERROR,
	AUTH_SUCCESS,
	AUTH_IN_PROGRESS,
	AUTH_ERROR,
	LOGOUT,
} from "../actions/types";

// Signup Client-Side Validation

export const initialFormState = {
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

export const formError = (state = initialFormState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_FORM_ERROR: {
			const { errorObj } = payload;
			console.log({ ...state, ...errorObj });
			return { ...state, ...errorObj };
		}
		default:
			return state;
	}
};

// Auth Server-Side Validation and State Handler

const initialAuthState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	user: null,
	loading: false,
};

export const auth = (state = initialAuthState, action) => {
	const { type, payload } = action;

	switch (type) {
		case AUTH_SUCCESS: {
			console.log(payload.user);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload.user,
			};
		}
		case AUTH_IN_PROGRESS: {
			return {
				...state,
				loading: true,
			};
		}
		case SIGNUP_SUCCESS:
		case LOGIN_SUCCESS: {
			console.log("Token", payload.token);
			localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		}
		case SIGNUP_IN_PROGRESS:
		case LOGIN_IN_PROGRESS: {
			return {
				...state,
				isAuthenticated: false,
				loading: true,
			};
		}
		case AUTH_ERROR:
		case SIGNUP_ERROR:
		case LOGIN_ERROR:
		case LOGOUT: {
			payload && console.error("Err:", payload.err);
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			};
		}
		default:
			return state;
	}
};

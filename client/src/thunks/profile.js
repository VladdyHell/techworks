import http, { authHttp } from "../utils/http-common";
import setAuthToken from "../utils/setAuthToken";
import {
	getProfileSuccess,
	getProfileInProgress,
	getProfileFailure,
	getProfessionsSuccess,
	getProfessionsInProgress,
	getProfessionsFailure,
} from "../actions/profile";

export const getAuthProfile = () => async (dispatch) => {
	try {
		dispatch(getProfileInProgress());

		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		const res = await http.get("/profile/me");

		dispatch(getProfileSuccess(res.data));
	} catch (e) {
		dispatch(
			getProfileFailure({
				msg: e.response.statusText,
				status: e.response.status,
			})
		);
	}
};

export const getProfessionsTitle = (query) => async (dispatch) => {
	try {
		dispatch(getProfessionsInProgress());

		const res = await http.get("/profile/professions", { params: { query } });

		dispatch(getProfessionsSuccess(res.data));
	} catch (e) {
		dispatch(getProfessionsFailure(e.response.data));
	}
};

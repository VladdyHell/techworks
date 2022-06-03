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

export const createUpdateUserProfile =
	(formData, /*navigate,*/ edit = false) => (dispatch) => {
		return new Promise(async (resolve, reject) => {
			try {
				dispatch(getProfileInProgress());
				const res = await http.put("/profile", formData);
				alert(edit ? "Profile Updated" : "Profile Created");

				dispatch(getProfileSuccess(res.data));
				resolve(res);
			} catch (e) {
				console.log("err: ", e);
				dispatch(getProfileFailure(e.response.data));
				reject(e.response.data);
			}
		});
	};

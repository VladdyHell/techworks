import http, { authHttp } from "../utils/http-common";
import setAuthToken from "../utils/setAuthToken";
import { getProfileSuccess, getProfileInProgress, getProfileFailure } from "../actions/profile";

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

import http, { authHttp } from "../utils/http-common";
import setAuthToken from "../utils/setAuthToken";
import { getProfileSuccess, getProfileFailure } from "../actions/profile";

export const getAuthProfile = () => async (dispatch) => {
	try {
		const res = await http.get("/profile/me");

		dispatch(getProfileSuccess(res.data));
	} catch (e) {
		dispatch(getProfileFailure(e.response.data));
	}
};

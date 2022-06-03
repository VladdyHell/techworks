import { combineReducers } from "redux";
import alert from "./alert";
import { auth, formError } from "./auth";
import { profile } from "./profile";

export default combineReducers({
	alert,
	auth,
	formError,
	profile,
});

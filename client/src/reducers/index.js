import { combineReducers } from "redux";
import { auth, formError } from "./auth";
import { profile } from "./profile";

export default combineReducers({
	auth,
	formError,
	profile,
});

import http from "./http-common";

const setAuthToken = (token) => {
	if (token) {
		http.defaults.headers.common["x-auth-token"] = token;
		localStorage.setItem('token', token);
	} else {
		delete http.defaults.headers.common["x-auth-token"];
		localStorage.removeItem('token');
	}
};

export default setAuthToken;

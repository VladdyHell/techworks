import axios from "axios";

export default axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	// baseURL: "http://192.168.42.71:8000/api/v1/",
	headers: {
		"Content-Type": "application/json",
	},
});

export const authHttp = (token) =>
	axios.create({
		baseURL: process.env.REACT_APP_API_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": token,
		},
	});

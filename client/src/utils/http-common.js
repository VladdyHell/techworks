import axios from "axios";

export default axios.create({
	baseURL: process.env.REACT_APP_API_URL,
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

import axios from "axios";
import * as types from "./actionTypes";

const register = (payload) => (dispatch) => {
	console.log("payload: ", payload);
	dispatch({ type: types.REGISTER_REQUEST });
	return axios
		.post("http://localhost:8080/auth/register", payload)
		.then((r) => {
			dispatch({ type: types.REGISTER_SUCCESS, payload: r.data });
		})
		.catch((e) => dispatch({ type: types.REGISTER_FAILURE, payload: e }));
};

const login = (params) => (dispatch) => {
	dispatch({ type: types.LOGIN_REQUEST });
	return axios
		.post("http://localhost:8080/auth/login", params)
		.then((r) => {
			dispatch({ type: types.LOGIN_SUCCESS, payload: r.data.token });
		})
		.catch((e) => {
			dispatch({ type: types.LOGIN_FAILURE, payload: e });
		});
};

const profile = (payload) => (dispatch) => {
	dispatch({ type: types.PROFILE_REQUEST });
	const options = {
		method: "GET",
		url: `http://localhost:8080/user/${payload.username}`,
		headers: { Authorization: `Bearer ${payload.token}` }
	};

	return axios(options)
		.then((r) => dispatch({ type: types.PROFILE_SUCCESS, payload: r.data }))
		.catch((e) => dispatch({ type: types.PROFILE_FAILURE, payload: e }));
};

export { login, register, profile };

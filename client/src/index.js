import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./store";
// import { CssBaseline } from "@material-ui/core";
import "./index.css";
// import App from './Particles';
import App from "./App";

ReactDOM.render(
	<Provider store={configureStore()}>
		<Router>
			{/*<CssBaseline />*/}
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
);

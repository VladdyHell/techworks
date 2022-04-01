import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import RegisterForm from "./register/Form";
import LoginForm from "./Login";
import { makeStyles, Container, Tabs, Tab, AppBar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	formContainer: {
		// width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	appbarRoot: {
		width: "100%",
	},
	tabs: {
		// width: "auto",
	},
	tabItem: {
		// width: `${theme.spacing(4)}px`
	},
	tabRoot: {
		minWidth: "unset",
	},
}));

const AuthForm = () => {
	const classes = useStyles();

	const navigate = useNavigate();
	const { page } = useParams();
	const location = useLocation();
	const { pathname } = location;

	const tabNameToIndex = {
		0: "signup",
		// 1: "oauth",
		1: "signin",
	};

	const indexToTabName = {
		signup: 0,
		// oauth: 1,
		signin: 1,
	};

	const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);

	const handleChange = (e, newVal) => {
		navigate(`/auth/${tabNameToIndex[newVal]}`);
		setSelectedTab(newVal);
	};

	useEffect(() => {
		const path = pathname.split("/")[2];
		setSelectedTab(indexToTabName[path]);
	}, [pathname]);

	return (
		<Container className={classes.formContainer} position="relative">
			<AppBar
				position="absolute"
				// color="secondary"
				classes={{ root: classes.appbarRoot }}
			>
				<Tabs
					value={selectedTab}
					onChange={handleChange}
					className={classes.tabs}
				>
					<Tab
						className={classes.tabItem}
						classes={{ root: classes.tabRoot }}
						label="SignUp"
					/>
					{/*<Tab
						className={classes.tabItem}
						classes={{ root: classes.tabRoot }}
						label="OAuth"
					/>*/}
					<Tab
						className={classes.tabItem}
						classes={{ root: classes.tabRoot }}
						label="LogIn"
					/>
				</Tabs>
			</AppBar>
			{
				selectedTab === 0 ||  pathname == "/auth/signup" ? (
					<RegisterForm />
				) : null
			}
			{
				selectedTab === 1 ||  pathname == "/auth/signin" ? (
					<LoginForm />
				) : null
			}
		</Container>
	);
};

export default AuthForm;

import React, { useState, useEffect } from "react";
import {
	useParams,
	useNavigate,
	useLocation,
	Navigate,
} from "react-router-dom";
import RegisterForm from "./register/Form";
import LoginForm from "./login/Login";
import {
	useTheme,
	makeStyles,
	Container,
	Tabs,
	Tab,
	AppBar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	formContainer: {
		// width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			paddingTop: theme.spacing(12/*9*/),
			paddingBottom: theme.spacing(7/*4*/),
		},
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

function AuthForm() {
	const theme = useTheme();
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

	const authPath = pathname.split("/")[2];

	useEffect(() => {
		setSelectedTab(indexToTabName[authPath]);
	}, [pathname]);

	return (
		<Container className={classes.formContainer} position="relative">
			<AppBar
				position="absolute"
				// color="secondary"
				color="primary"
				style={{
					background:
						eval(localStorage.isDarkMode) && theme.palette.grey["A400"],
				}}
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
			{selectedTab === 0 || authPath == "signup" ? <RegisterForm /> : null}
			{selectedTab === 1 || authPath == "signin" ? <LoginForm /> : null}
		</Container>
	);
}

export default AuthForm;

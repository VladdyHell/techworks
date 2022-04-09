import React, { useRef, useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
	TextField,
	Typography,
	Button,
	IconButton,
	Container,
	Card,
	CardContent,
	CardHeader,
	CardActions,
	makeStyles,
} from "@material-ui/core";
import { Edit, Close, Check } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

import ContentEditable from "react-contenteditable";

const DEBUG = true;

const useStyles = makeStyles((theme) => ({
	contenteditable: {
		// minHeight: !disabledEditable && formData == "" && "20px",
		// "&:focus": { border: "4px solid black" },
	},
}));

function ProfileInfo({ profile }) {
	const classes = useStyles();

	const fields = [
		{
			title: "company",
			icon: null,
		},
		{
			title: "website",
			icon: null,
		},
		{
			title: "location",
			icon: null,
		},
		{
			title: "status",
			icon: null,
		},
		{
			title: "skills",
			icon: null,
		},
		{
			title: "bio",
			icon: null,
		},
		{
			title: "githubusername",
			icon: null,
		},
	];

	const initialState = {
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		bio: "Insert your bio here",
		githubusername: "",
	};

	const [disabledEditable, toggleEditable] = useReducer(
		(disabledEditable, action) => {
			const { type, payload } = action;
			return { ...disabledEditable, [type]: !disabledEditable };
		},
		{
			company: false,
			website: false,
			location: false,
			status: false,
			skills: false,
			bio: false,
			githubusername: false,
		}
	);

	const companyRef = useRef();
	const websiteRef = useRef();
	const locationRef = useRef();
	const statusRef = useRef();
	const skillsRef = useRef();
	const bioRef = useRef();
	const githubusernameRef = useRef();

	const [formData, setBio] = useState(initialState);
	const [prevVal, setPrevVal] = useState({
		company: null,
		website: null,
		location: null,
		status: null,
		skills: null,
		bio: null,
		githubusername: null,
	});
	const [handleClickName, setHandleClickName] = useState("");

	const { company, website, location, status, skills, bio, githubusername } =
		formData;

	const handleChange = (e) => {
		// bioRef.current = e.target.value
		setFormData({ ...formData, [e.target.name]: e.target.value });
		DEBUG && console.log(formData);
	};

	const handleClick = (e) => {
		setHandleClickName(e.target.name);
		if (e.target.name.split("-")[0] == "edit") {
			setPrevVal({ ...prevVal, [e.target.name]: e.target.value });
		}
	};

	useEffect(() => {
		DEBUG &&
			console.log(
				"disabledEditable:",
				disabledEditable,
				"handleClickName:",
				handleClickName,
				"prevVal:",
				prevVal
			);
		const operationName = handleClickName.split("-")[0];
		const fieldName = handleClickName.split("-")[1];
		const refName = fieldName ? eval(`${fieldName}Ref`) : null;

		if (!disabledEditable) {
			if (formData[fieldName] == initialState[fieldName]) {
				setFormData({ ...formData, [fieldName]: "" });
			}
			refName.current.focus();
		} else if (disabledEditable[fieldName] && operationName == "close") {
			if (refName.current.textContent.trim() == "" && !prevVal[fieldName]) {
				setFormData({ ...formData, [fieldName]: initialState[fieldName] });
			} else {
				setFormData({ ...prevVal, [fieldName]: prevVal[fieldName] });
			}
		} else if (
			disabledEditable[fieldName] &&
			handleClickName[operationName] == "submit"
		) {
			if (refName.current.textContent.trim() == "") {
				setFormData({ ...formData, [fieldName]: initialState[fieldName] });
			} else {
				setFormData(formData);
			}
		}
	}, [disabledEditable]);

	// setInterval(()=>{console.log(formData);}, 10000)

	return (
		<>
			{fields.map((field) => (
				<Card>
					<CardHeader title={field.title} />
					<CardContent>
						<Typography
							variant="body2"
							// ref={bioRef}
							// contentEditable={editableField}
							// suppressContentEditableWarning={true}
							// onInput={handleChange}
						>
							<ContentEditable
								html={formData[field.title]}
								innerRef={eval(`${field.title}Ref`)}
								onChange={handleChange}
								disabled={disabledEditable[field.title]}
								style={{
									minHeight:
										!disabledEditable[field.title] &&
										formData[field.title] == "" &&
										"20px",
									border:
										!disabledEditable[field.title] && `1px solid ${grey[500]}`,
									wordWrap: "break-word",
								}}
							/>
						</Typography>
						{/*{bioRef.current.textContent}</Typography>*/}
					</CardContent>
					<CardActions>
						{disabledEditable[field.title] ? (
							<IconButton
								name={`edit-${field.title}`}
								onClick={(e) => {
									toggleEditable({ type: field.title });
									handleClick(e);
								}}
								color="secondary"
							>
								<Edit />
							</IconButton>
						) : (
							<>
								<IconButton
									name={`close-${field.title}`}
									onClick={(e) => {
										toggleEditable({
											type: field.title,
										});
										handleClick(e);
									}}
									color="secondary"
								>
									<Close />
								</IconButton>
								<IconButton
									name={`submit-${field.title}`}
									onClick={(e) => {
										toggleEditable({
											type: field.title,
										});
										handleClick(e);
									}}
									color="secondary"
								>
									<Check />
								</IconButton>
							</>
						)}
					</CardActions>
				</Card>
			))}
		</>
	);
}

export default ProfileInfo;

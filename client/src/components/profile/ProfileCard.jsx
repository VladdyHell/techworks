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
	Avatar,
	makeStyles,
} from "@material-ui/core";
import { Edit, Close, Check } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

import ContentEditable from "react-contenteditable";
import capitalize from "capitalize";

const DEBUG = true;

const useStyles = makeStyles((theme) => ({
	contenteditable: {
		// minHeight: !disabledEditable && formData == "" && "20px",
		// "&:focus": { border: "4px solid black" },
	},
	cardRoot: {
		marginTop: theme.spacing(2.5),
	},
}));

function ProfileCard({ field }) {
	const classes = useStyles();

	const initialState = {
		company: "Insert your company name here",
		website: "Insert your website link here",
		location: "Insert your location here",
		status: "Insert your status here",
		skills: "Insert your skills here",
		bio: "Insert your bio here",
		githubusername: "Insert your GitHub username here",
	};

	const [disabledEditable, toggleEditable] = useReducer(
		(disabledEditable, action) => {
			const { type, payload } = action;
			return { ...disabledEditable, [type]: !disabledEditable[type] };
		},
		{
			company: true,
			website: true,
			location: true,
			status: true,
			skills: true,
			bio: true,
			githubusername: true,
		}
	);

	const companyRef = useRef();
	const websiteRef = useRef();
	const locationRef = useRef();
	const statusRef = useRef();
	const skillsRef = useRef();
	const bioRef = useRef();
	const githubusernameRef = useRef();

	const [formData, setFormData] = useState(initialState);
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
		const currentTargetName = e.currentTarget.attributes[0].value;
		// bioRef.current = e.target.value
		setFormData({ ...formData, [currentTargetName]: e.target.value });
		DEBUG && console.log(e.currentTarget.attributes[0].value);
	};

	const handleClick = (e) => {
		const operationName = new FormData(e.target).get("operation");
		DEBUG && console.log(operationName);
		setHandleClickName(operationName);
		if (operationName.split("-")[0] == "edit") {
			setPrevVal({ ...prevVal, [e.target.name]: formData[e.target.name] });
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
		const operationName = handleClickName ? handleClickName.split("-")[0] : "";
		const fieldName = handleClickName ? handleClickName.split("-")[1] : "";
		const refName = fieldName ? eval(`${fieldName}Ref`) : null;

		if (!disabledEditable[fieldName]) {
			if (formData[fieldName] == initialState[fieldName]) {
				setFormData({ ...formData, [fieldName]: "" });
			}
			refName && refName.current.focus();
		} else if (disabledEditable[fieldName] && operationName == "close") {
			if (refName.current.textContent.trim() == "" && !prevVal[fieldName]) {
				setFormData({ ...formData, [fieldName]: initialState[fieldName] });
			} else {
				setFormData({ ...formData, [fieldName]: prevVal[fieldName] });
			}
		} else if (
			disabledEditable[fieldName] &&
			/*handleClickName[operationName]*/ operationName == "submit"
		) {
			if (refName.current.textContent.trim() == "") {
				setFormData({ ...formData, [fieldName]: initialState[fieldName] });
			} else {
				setFormData(formData);
			}
		}
	}, [disabledEditable]);

	// setInterval(()=>{console.log(formData);}, 10000)

	const CRUInputConfig = {
		type: "hidden",
		name: "operation",
	};

	return (
		<Card className={classes.cardRoot}>
			<CardHeader
				title={capitalize(field.title)}
				avatar={
					field.icon && (
						<Avatar style={{ backgroundColor: field.backgroundColor }}>
							{field.icon}
						</Avatar>
					)
				}
			/>
			<CardContent>
				<Typography
					variant="body2"
					// ref={bioRef}
					// contentEditable={editableField}
					// suppressContentEditableWarning={true}
					// onInput={handleChange}
				>
					<ContentEditable
						name={field.title}
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
					<form
						name={field.title}
						onSubmit={(e) => {
							toggleEditable({ type: field.title });
							e.preventDefault();
							handleClick(e);
						}}
					>
						<input {...CRUInputConfig} value={`edit-${field.title}`} />
						<IconButton type="submit" color="secondary">
							<Edit />
						</IconButton>
					</form>
				) : (
					<>
						<form
							name={field.title}
							onSubmit={(e) => {
								toggleEditable({ type: field.title });
								e.preventDefault();
								handleClick(e);
							}}
						>
							<input {...CRUInputConfig} value={`close-${field.title}`} />
							<IconButton type="submit" color="secondary">
								<Close />
							</IconButton>
						</form>
						<form
							name={field.title}
							onSubmit={(e) => {
								toggleEditable({ type: field.title });
								e.preventDefault();
								handleClick(e);
							}}
						>
							<input {...CRUInputConfig} value={`submit-${field.title}`} />
							<IconButton type="submit" color="secondary">
								<Check />
							</IconButton>
						</form>
					</>
				)}
			</CardActions>
		</Card>
	);
}

ProfileCard.propTypes = {};

export default ProfileCard;

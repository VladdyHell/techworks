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
	useTheme,
} from "@material-ui/core";
import { Edit, Close, Check } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

import ContentEditable from "react-contenteditable";
import capitalize from "capitalize";

import ProfileCardTags, { tagsPopupTimeout } from "./ProfileCard.Tags";

const DEBUG = false;

const useStyles = makeStyles((theme) => ({
	contenteditable: {
		// minHeight: !disabledEditable && formData == "" && "20px",
		// "&:focus": { border: "4px solid black" },
	},
	cardRoot: {
		marginTop: theme.spacing(2.5),
	},
	cardContent: {
		minHeight: 136,
	},
}));

function ProfileCard({
	fields,
	profile,
	topic,
	getXThunk,
	getXSuccessAction,
	initialDefaults,
	initialState,
	formData,
	setFormData,
	handleSubmit,
}) {
	const theme = useTheme();
	const classes = useStyles();

	const [disabledEditable, toggleEditable] = useReducer(
		(disabledEditable, action) => {
			const { type } = action;
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

	const [prevVal, setPrevVal] = useState({
		company: null,
		website: null,
		location: null,
		status: { ...formData["status"], textField: null },
		skills: { ...formData["skills"], textField: null },
		bio: null,
		githubusername: null,
	});
	const [handleClickName, setHandleClickName] = useState("");

	const [prevChar, setPrevChar] = useState("");

	const { company, website, location, status, skills, bio, githubusername } =
		formData;

	const handleChange = (e) => {
		DEBUG && console.log(e.target.name, e.target.value);
		const currentTargetName = e.currentTarget.attributes[0].value;
		// bioRef.current = e.target.value
		if (currentTargetName != "false")
			setFormData({ ...formData, [currentTargetName]: e.target.value });
		else {
			setFormData((prevVal) => {
				setPrevChar(formData[e.target.name].textField);

				setTimeout(() => {
					setPrevChar(e.target.value);
				}, tagsPopupTimeout - 1);

				return {
					...formData,
					[e.target.name]: {
						...formData[e.target.name],
						textField: e.target.value,
					},
				};
			});
		}
		DEBUG && console.log(e.currentTarget.attributes[0].value);
		DEBUG && console.log(formData);
	};

	useEffect(() => {
		DEBUG && console.log(`PrevChar: ${prevChar}`);
	}, [prevChar]);

	const handleClick = (name, value) => {
		// const operationName = new FormData(e.target).get("operation");
		const operationName = value;
		DEBUG && console.log(operationName);
		setHandleClickName(operationName);
		if (operationName.split("-")[0] == "edit") {
			setPrevVal({ ...prevVal, [name]: formData[name] });
		}
	};

	const trimmedFormData = Object.fromEntries(Object.entries(formData)
			/*.filter(
				([key, value]) =>
					(typeof value == "string" &&
						// value != initialDefaults[key] &&
						value != "" &&
						value != "<br>") ||
					// value?.textField != initialState[key]?.textField
					(typeof value == "object" &&
						// value?.set &&
						value?.set?.length != 0)
			)*/
			.map(([key, value]) => {
				const isStr = typeof value == "string";
				const trimmedStr = isStr && value?.replace(/&nbsp;|<br>/gi, " ").trim();
	
				false &&
					console.log(
						`${key}: `,
						"value - ",
						isStr ? trimmedStr : "Obj",
						"- empty - ",
						isStr ? /^$/.test(trimmedStr) : "Obj."
					);
	
				return isStr
					? value.trim() == initialDefaults[key] ||
					  // /^$|<br>|&nbsp/.test(value?.trim())
					  /^$/.test(trimmedStr)
						? [key, null]
						: [key, trimmedStr]
					: typeof value == "object" && value?.set?.length == 0
					? [key, []]
					: [key, value];
			}));
	false && console.log("Trimmed formData: ", trimmedFormData);
	// handleSubmit(trimmedFormData);

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

		DEBUG && console.log(operationName, fieldName, refName);

		DEBUG && console.log(!disabledEditable[fieldName]);
		if (!disabledEditable[fieldName] && operationName == "edit") {
			DEBUG &&
				console.log(
					formData[fieldName] == initialDefaults[fieldName],
					typeof formData[fieldName] == "object",
					formData[fieldName]?.textField == initialState[fieldName]?.textField
				);
			if (formData[fieldName] == initialDefaults[fieldName]) {
				setFormData({ ...formData, [fieldName]: "" });
			} else if (
				typeof formData[fieldName] == "object" &&
				formData[fieldName]?.textField == initialState[fieldName]?.textField
			) {
				setFormData({
					...formData,
					[fieldName]: { ...formData[fieldName], textField: "" },
				});
				// refName.current.defaultValue = "";
			}
			DEBUG && console.log(refName?.current);
			refName?.current.focus();
		} else if (disabledEditable[fieldName] && operationName == "close") {
			DEBUG && console.log(!refName.current.defaultValue?.trim() == "");
			if (refName.current.textContent.trim() == "" && !prevVal[fieldName]) {
				setFormData({ ...formData, [fieldName]: initialDefaults[fieldName] });
			} else if (
				refName.current.defaultValue?.trim() != "" &&
				!prevVal[fieldName]
			) {
				setFormData({
					...formData,
					[fieldName]: {
						...initialState[fieldName],
						textField: initialState[fieldName]?.textField,
					},
				});
			} else {
				setFormData({ ...formData, [fieldName]: prevVal[fieldName] });
			}
		} else if (
			disabledEditable[fieldName] &&
			/*handleClickName[operationName]*/ operationName == "submit"
		) {
			if (
				typeof formData[fieldName] == "string" &&
				(refName.current.textContent.trim() == "" ||
					refName.current.textContent.trim() == "<br>")
			) {
				setFormData({ ...formData, [fieldName]: initialDefaults[fieldName] });
			} else if (
				typeof formData[fieldName] == "object" /* &&
				refName.current.defaultValue?.trim() == ""*/
			) {
				setFormData({
					...formData,
					[fieldName]: {
						...formData[fieldName],
						textField: initialState[fieldName]?.textField,
					},
				});
			} else {
				setFormData(trimmedFormData);
			}
			false && console.log("Form Data PC UE:", formData);
		}
	}, [disabledEditable]);

	// setInterval(()=>{console.log(formData);}, 10000)

	const CRUInputConfig = {
		type: "hidden",
		name: "operation",
	};

	return fields.map((field, i) => {
		const tagsEditable = {
			name: field.title,
			// value: formData[field.title],
			ref: eval(`${field.title}Ref`),
			// onChange: handleChange,
			disabled: disabledEditable[field.title],
			// style: {
			// 	wordWrap: "break-word",
			// },
			setFormData: setFormData,
			formData: formData,
			setPrevChar: setPrevChar,
		};

		return (
			<Card key={i} className={classes.cardRoot}>
				<CardHeader
					title={
						<Typography variant="h6">{capitalize(field.title)}</Typography>
					}
					avatar={
						field.icon && (
							<Avatar
								style={{
									backgroundColor: field.backgroundColor,
									color: theme.palette.grey[50],
								}}
							>
								{field.icon}
							</Avatar>
						)
					}
				/>
				<CardContent className={classes.cardContent}>
					{!field.isTags ? (
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
					) : (
						<ProfileCardTags
							subject={capitalize(field.title)}
							setValue={formData[field.title].set}
							textFieldValue={formData[field.title].textField}
							handleChange={handleChange}
							prevChar={prevChar}
							topic={topic}
							getXThunk={getXThunk}
							getXSuccessAction={getXSuccessAction}
							tagsEditable={tagsEditable}
						/>
					)}
					{/*{bioRef.current.textContent}</Typography>*/}
				</CardContent>
				<CardActions>
					{disabledEditable[field.title] ? (
						/*<form
						name={field.title}
						onSubmit={(e) => {
							toggleEditable({ type: field.title });
							e.preventDefault();
							handleClick(e);
						}}
					>
						<input {...CRUInputConfig} value={`edit-${field.title}`} />*/
						<IconButton
							// type="submit"
							color="secondary"
							onClick={(e) => {
								toggleEditable({ type: field.title });
								handleClick(field.title, `edit-${field.title}`);
							}}
							children={<Edit />}
						/>
					) : (
						// </form>
						<>
							{/*<form
							name={field.title}
							onSubmit={(e) => {
								toggleEditable({ type: field.title });
								e.preventDefault();
								handleClick(e);
							}}
						>
							<input {...CRUInputConfig} value={`close-${field.title}`} />*/}
							<IconButton
								// type="submit"
								color="secondary"
								onClick={(e) => {
									toggleEditable({ type: field.title });
									handleClick(field.title, `close-${field.title}`);
								}}
								children={<Close />}
							/>
							{/*</form>*/}
							{/*<form
							name={field.title}
							onSubmit={(e) => {
								toggleEditable({ type: field.title });
								e.preventDefault();
								handleClick(e);
								handleSubmit(formData);
							}}
						>
							<input {...CRUInputConfig} value={`submit-${field.title}`} />*/}
							<IconButton
								// type="submit"
								color="secondary"
								onClick={(e) => {
									toggleEditable({ type: field.title });
									handleClick(field.title, `submit-${field.title}`);

									DEBUG && console.log(formData);

									handleSubmit(trimmedFormData);
								}}
								children={<Check />}
							/>
							{/*</form>*/}
						</>
					)}
				</CardActions>
			</Card>
		);
	});
}

ProfileCard.propTypes = {
	fields: PropTypes.array.isRequired,
	topic: PropTypes.object.isRequired,
	getXThunk: PropTypes.func.isRequired,
	getXSuccessAction: PropTypes.func.isRequired,
	initialDefaults: PropTypes.object.isRequired,
	initialState: PropTypes.object.isRequired,
	formData: PropTypes.object.isRequired,
	setFormData: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default ProfileCard;

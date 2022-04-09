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

const useStyles = makeStyles((theme) => ({
	contenteditable: {
		// minHeight: !disabledEditable && bio == "" && "20px",
		// "&:focus": { border: "4px solid black" },
	},
}));

function ProfileInfo({ profile }) {
	const classes = useStyles();

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
		(disabledEditable) => !disabledEditable,
		true
	);

	const bioRef = useRef();

	const [bio, setBio] = useState(initialState.bio);
	const [prevBio, setPrevBio] = useState();
	const [handleClickName, setHandleClickName] = useState();

	const handleChange = (e) => {
		// bioRef.current = e.target.value
		setBio(e.target.value);
		console.log(bio);
	};

	const handleClick = (e) => {
		setHandleClickName(e.target.name);
		if (e.target.name == "edit") {
			setPrevBio(bio);
		}
	};

	useEffect(() => {
		console.log(disabledEditable, handleClickName, prevBio);
		if (!disabledEditable) {
			if (bio == initialState.bio) {
				setBio("");
			}
			bioRef.current.focus();
		} else if (disabledEditable && handleClickName == "close") {
			if (bioRef.current.textContent.trim() == "" && !prevBio) {
				setBio(initialState.bio);
			} else {
				setBio(prevBio);
			}
		} else if (disabledEditable && handleClickName == "submit") {
			if (bioRef.current.textContent.trim() == "") {
				setBio(initialState.bio);
			} else {
				setBio(bio);
			}
		}
	}, [disabledEditable]);

	// setInterval(()=>{console.log(formData);}, 10000)

	return (
		<Card>
			<CardHeader title="Bio" />
			<CardContent>
				<Typography
					variant="body2"
					// ref={bioRef}
					// contentEditable={editableField}
					// suppressContentEditableWarning={true}
					// onInput={handleChange}
				>
					<ContentEditable
						html={bio}
						innerRef={bioRef}
						onChange={handleChange}
						disabled={disabledEditable}
						style={{
							minHeight: !disabledEditable && bio == "" && "20px",
							border: !disabledEditable && `1px solid ${grey[500]}`,
							wordWrap: "break-word",
						}}
					/>
				</Typography>
				{/*{bioRef.current.textContent}</Typography>*/}
			</CardContent>
			<CardActions>
				{disabledEditable ? (
					<IconButton
						name="edit"
						onClick={(e) => {
							toggleEditable();
							handleClick(e);
						}}
						color="secondary"
					>
						<Edit />
					</IconButton>
				) : (
					<>
						<IconButton
							name="close"
							onClick={(e) => {
								toggleEditable();
								handleClick(e);
							}}
							color="secondary"
						>
							<Close />
						</IconButton>
						<IconButton
							name="submit"
							onClick={(e) => {
								toggleEditable();
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
	);
}

export default ProfileInfo;

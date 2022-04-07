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

import { connect } from "react-redux";
import ContentEditable from "react-contenteditable";

const useStyles = makeStyles((theme) => ({
	contenteditable: {
		// minHeight: !disabledEditable && bio == "" && "20px",
		// "&:focus": { border: "4px solid black" },
	},
}));

function CreateProfile() {
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

	const handleChange = (e) => {
		// bioRef.current = e.target.value
		setBio(e.target.value);
		console.log(bio);
	};

	useEffect(() => {
		if (!disabledEditable) {
			bioRef.current.focus();
			if (bio == initialState.bio) {
				setBio("");
			}
		} else {
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
				<Typography variant="body2">
					<ContentEditable
						// variant="body2"
						// ref={bioRef}
						// contentEditable={editableField}
						// suppressContentEditableWarning={true}
						// onInput={handleChange}
						html={bio}
						innerRef={bioRef}
						onChange={handleChange}
						disabled={disabledEditable}
						style={{
							minHeight: !disabledEditable && bio == "" && "20px",
							border: !disabledEditable && `1px solid ${grey[500]}`,
						}}
					/>
				</Typography>
				{/*{bioRef.current.textContent}</Typography>*/}
			</CardContent>
			<CardActions>
				{disabledEditable ? (
					<IconButton onClick={toggleEditable} color="secondary">
						<Edit />
					</IconButton>
				) : (
					<>
						<IconButton onClick={toggleEditable} color="secondary">
							<Close />
						</IconButton>
						<IconButton onClick={toggleEditable} color="secondary">
							<Check />
						</IconButton>
					</>
				)}
			</CardActions>
		</Card>
	);
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps)(CreateProfile);

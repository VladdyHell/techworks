import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Components
import ProfileCard from "./ProfileCard";

// External Components
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MUI
import {
	LocationOn,
	Description,
	Work,
	Business,
	Language,
	GitHub,
	CastForEducation,
} from "@material-ui/icons";
import { blue, green, pink, orange, yellow } from "@material-ui/core/colors";
import { Grid, makeStyles, Button, Container } from "@material-ui/core";

// router
import { useOutletContext } from "react-router-dom";

// redux
import { connect } from "react-redux";
import {
	getProfessionsTitle,
	createUpdateUserProfile,
} from "../../thunks/profile";
import { getProfessionsSuccess } from "../../actions/profile";

const debug = console.log.bind(window.console);
const DEBUG = false;

const useStyles = makeStyles((theme) => ({
	profileGrid: {
		// marginTop: theme.spacing(2.5),
	},
	buttonContainer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: theme.spacing(2.5),
	},
}));

function ProfileInfo({
	getProfessionsTitle,
	getProfessionsSuccess,
	createUpdateUserProfile,
}) {
	const { profile } = useOutletContext();
	const { userProfile, professions, error } = profile;

	const classes = useStyles();

	const initialDefaults = {
		company: "Insert your company name here",
		website: "Insert your website link here",
		location: "Insert your location here",
		status: [],
		skills: [],
		bio: "Insert your bio here",
		githubusername: "Insert your GitHub username here",
	};
	const [profileLS, setProfileLS] = useState(
		localStorage?.profile && JSON.parse(localStorage.profile)
	);

	const formFields = [
		["company"],
		["website"],
		["location"],
		["status"],
		["skills"],
		["bio"],
		["githubusername"],
	];
	const initialState = Object.fromEntries(
		formFields.map(([key, value]) => {
			value = !/status|skills/.test(key)
				? profileLS?.[key]
					? profileLS?.[key]
					: userProfile?.[key]
					? userProfile?.[key]
					: initialDefaults?.[key]
				: {
						set: profileLS?.[key]
							? profileLS?.[key]
							: userProfile?.[key]
							? userProfile?.[key]
							: initialDefaults?.[key],
						textField: `Insert your ${key} here`,
				  };

			return [key, value];
		})
	);

	DEBUG && debug("Initial Looped State: ", initialLoopedState);

	const [formData, setFormData] = useState(initialState);

	useEffect(() => {
		// true && console.log(initialState);
		setProfileLS(localStorage?.profile && JSON.parse(localStorage.profile));
		true && debug("ProfileLSUE: ", profileLS);
		setFormData(initialState);
		false && debug("Form Data PI UE: ", formData);
	}, [localStorage?.profile, userProfile]);

	const handleSubmit = async (formData, isFinal = false, save = false) => {
		if (isFinal) {
			if (save /* && (!userProfile || Object.entries(error).length != 0)*/) {
				true && debug(localStorage.profile);
				toast.promise(
					createUpdateUserProfile(
						localStorage.profile,
						userProfile ? true : false
					),
					{
						pending: "pending",
						success: "resolved 👌",
						error: {
							render({ data }) {
								true && console.error(data);
								return data.msg;
							},
						},
					},
					{
						position: "bottom-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					}
				);
			}
			localStorage.removeItem("profile");
			setProfileLS(localStorage.profile);
			true && debug(profileLS);
			return;
			// return setFormData(initialState);
		}

		true && debug("Form Data PI: ", formData);

		const formDataArr = Object.entries(formData);
		false && debug("formDataArr: ", formDataArr);

		const profileInfoFields = /bio|status|company|skills/;
		// const withEmptyFields = formDataArr.map(([key, value]) =>
		// 	profileInfoFields.test(key) ? [key, null] : [key, value]
		// );
		// false && debug("withEmptyFields: ", withEmptyFields);
		const formDataFields = Object.fromEntries(
			formDataArr.filter(([key, value]) => profileInfoFields.test(key))
		);
		true && debug("formDataFields: ", formDataFields);

		const formDataFinal = Object.fromEntries(
			formDataArr.map(([key, value]) =>
				typeof value != "object" ? [key, value] : [key, value.set]
			)
		);
		false && debug("formDataFinal: ", formDataFinal);

		const strExists = !userProfile
			? null
			: Object.entries(formDataFinal)
					.filter(([key, value]) => typeof value == "string")
					.every(([formKey, formValue]) => {
						const profileExc = /_id|date/;

						return (
							Object.fromEntries(
								Object.entries(userProfile).filter(
									([key, value]) =>
										typeof value == "string" && !profileExc.test(key)
								)
								// .some(([key, value]) => value == formValue);
							)[formKey] == formValue
						);
					});
		true && debug("Str Exists: ", strExists);

		// Wrap conditionals if two lines
		// Comment out and debug each line
		// Return array methods to loop through each element
		const arrExists = !userProfile
			? null
			: Object.entries(formDataFinal)
					.filter(([key, value]) => value instanceof Array)
					.sort((a, b) => a - b)
					.every(([formKey, formValue], formIndex) => {
						const profileInc = /status|skills/;
						DEBUG && debug(i, formKey, formValue);
						// return true;

						const userProfileMatch = Object.fromEntries(
							Object.entries(userProfile).filter(
								([key, value]) => value instanceof Array && profileInc.test(key)
							)
						)
							[formKey].sort((a, b) => a - b)
							.every((value, i) => {
								DEBUG && debug(i, value, formValue[i]);
								debug(i, value, formValue[i], value == formValue[i]);
								return value == formValue[i];
								// debug(`userProfile ${formKey} Array: `)
								// return true
							});

						const userProfileLengthMatch =
							Object.fromEntries(
								Object.entries(userProfile).filter(
									([key, value]) =>
										value instanceof Array && profileInc.test(key)
								)
							)[formKey].length == formDataFinal[formKey].length;

						true &&
							debug(`userProfile ${formKey} array exists: `, userProfileMatch);
						true && debug("userProfile length match: ", userProfileLengthMatch);
						return userProfileMatch && userProfileLengthMatch;
						// return true;
					});
		true && debug("Arr Exists: ", arrExists);

		if (
			Object.entries(formData).length != 0 &&
			(!strExists || !arrExists) /*formDataFinal != userProfile*/
		) {
			const changedFields = !userProfile
				? formDataFinal
				: Object.fromEntries(
						Object.entries(formDataFinal).filter(([formKey, formValue], i) => {
							const profileExc = /_id|date/;
							const profileInc = /status|skills/;

							return (
								Object.fromEntries(
									Object.entries(userProfile).filter(
										([key, value]) =>
											typeof value == "string" && !profileExc.test(key)
									)
									// .some(([key, value]) => value == formValue);
								)[formKey] != formValue &&
								Object.fromEntries(
									Object.entries(userProfile).filter(
										([key, value]) =>
											value instanceof Array && profileInc.test(key)
									)
								)[formKey]?.length != formDataFinal[formKey].length
							);
						})
				  );

			debug("Change Fields: ", changedFields);

			localStorage.setItem(
				"profile",

				JSON.stringify(changedFields)
			);

			setProfileLS(JSON.parse(localStorage.profile));

			true && debug(JSON.parse(localStorage.profile));
		} else {
			localStorage.removeItem("profile");
			// setFormData(initialState);
			setProfileLS(localStorage.profile);
			true && debug(profileLS);
		}
	};

	const fields = [
		{
			title: "bio",
			icon: <Description />,
			backgroundColor: blue[500],
		},
		{
			title: "status",
			icon: <Work />,
			backgroundColor: pink[500],
			isTags: true,
		},
		{
			title: "company",
			icon: <Business />,
			backgroundColor: orange[500],
		},
		{
			title: "skills",
			icon: <CastForEducation />,
			backgroundColor: blue[500],
			isTags: true,
		},
	];

	return (
		<Grid container className={classes.profileGrid}>
			{/*Left Column*/}
			<Grid item xs={12} md={4}>
				{profileLS && (
					<Container className={classes.buttonContainer} disableGutters>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => handleSubmit(null, true)}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleSubmit(null, true, true)}
						>
							Save Changes
						</Button>
					</Container>
				)}
				{/*{fields.map((field, i) => (*/}
				<ProfileCard
					// key={i}
					fields={fields}
					profile={userProfile}
					topic={professions}
					getXThunk={getProfessionsTitle}
					getXSuccessAction={getProfessionsSuccess}
					initialDefaults={initialDefaults}
					initialState={initialState}
					formData={formData}
					setFormData={setFormData}
					handleSubmit={handleSubmit}
				/>
				{/*))}*/}
			</Grid>
		</Grid>
	);
}

ProfileInfo.propTypes = {
	getProfessionsTitle: PropTypes.func.isRequired,
	getProfessionsSuccess: PropTypes.func.isRequired,
	createUpdateUserProfile: PropTypes.func.isRequired,
};

export default connect(null, {
	createUpdateUserProfile,
	getProfessionsTitle,
	getProfessionsSuccess,
})(ProfileInfo);

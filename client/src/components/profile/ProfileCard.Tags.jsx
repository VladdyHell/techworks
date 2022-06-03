import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { TextField, Chip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import capitalize from "capitalize";

const DEBUG = false;

export let tagsPopupTimeout = 5000;

function ProfileCardTags({
	subject,
	setValue,
	textFieldValue,
	handleChange,
	topic,
	topic: { loading, lists },
	getXThunk,
	getXSuccessAction,
	prevChar,
	tagsEditable: { setFormData, formData, setPrevChar, ref, ...tagsEditable },
	// tagsEditable: { name, value, ref, onChange, disabled, style },
}) {
	// const [tags, setTags] = useState([]);
	const [open, setOpen] = useState(false);
	const isLoading = loading || (open && lists.length === 0);
	const tagsRef = useRef();

	const handleTagsChange = (e, newVal) => {
		let finalVal;
		const name = tagsRef.current.getAttribute("name");
		const tags = formData[name].set;
		DEBUG && console.log(name);

		DEBUG && console.log("NewVal:", newVal);
		DEBUG && console.log("Tags:", tags);
		// DEBUG &&
		// 	console.log("last val:", newVal.includes(newVal[newVal.length - 1]));

		// if (newVal.length < tags.length) return setTags(newVal);
		if (newVal.length < tags.length)
			return setFormData({
				...formData,
				[name]: { ...formData[name], set: newVal },
			});

		const checkDuplicate = (arr) => {
			DEBUG && console.log("set:", new Set(arr));
			DEBUG && console.log("arr:", arr);
			return new Set(arr).size !== arr.length;
		};

		// Capitalize the uncapitalized words and check duplicates
		for (const val of newVal) {
			DEBUG && console.log("isLastItem: ", val == newVal[newVal.length - 1]);
			if (val == newVal[newVal.length - 1]) {
				DEBUG &&
					console.log(
						"exists:",
						checkDuplicate([...tags, capitalize.words(val)])
					);
				// if (checkDuplicate([...tags, capitalize.words(val)])) break;
				if (checkDuplicate([...tags, capitalize.words(val)]))
					return setFormData({
						...formData,
						[name]: { ...formData[name], textField: "" },
					});

				const firstChars = val.split(" ").map((word) => word[0]);
				const capitalizedChars = firstChars.map((word) =>
					word[0].toUpperCase()
				);
				DEBUG && console.log(firstChars, capitalizedChars);
				DEBUG &&
					console.log(
						"capitalized: ",
						firstChars.every((char, i) => char == capitalizedChars[i])
					);

				if (firstChars.every((char, i) => char == capitalizedChars[i])) {
					// DEBUG && console.log("exists:", newVal.includes(val));
					// DEBUG &&
					// 	console.log(
					// 		"exists:",
					// 		newVal.find((tag) => tag == val)
					// 	);
					// if (newVal.includes(newVal[newVal.length - 1])) break;
					finalVal = [...tags, val];
				} else {
					// DEBUG && console.log("exists", tags.includes(capitalize.words(val)));
					// if (newVal.includes(capitalize.words(newVal[newVal.length - 1]))) break;
					finalVal = [...tags, capitalize.words(val)];
				}
			}
		}

		// DEBUG && console.log("finalVal", finalVal);
		// finalVal && setTags(finalVal);

		DEBUG && console.log(e);
		finalVal &&
			setFormData({
				...formData,
				[name]: { /*...formData[name],*/ set: finalVal, textField: "" },
			});
		DEBUG && console.log(formData);
	};

	useEffect(() => {
		if (!open) {
			getXSuccessAction([]);
		} else {
			getXThunk("");
		}
	}, [open]);

	// useEffect(() => {
	// 	getXThunk("");
	// }, []);

	useEffect(() => {
		let noChangesInX = false;

		setTimeout(() => {
			DEBUG && console.log("Final: ", prevChar, textFieldValue);
			noChangesInX = textFieldValue == prevChar ? true : false;
		}, tagsPopupTimeout - 1);

		setTimeout(() => {
			noChangesInX && getXThunk(textFieldValue);
		}, tagsPopupTimeout);

		DEBUG && console.log(textFieldValue);
	}, [prevChar]);

	useEffect(() => {
		DEBUG && console.log(loading);
	}, [textFieldValue]);

	return (
		<Autocomplete
			{...tagsEditable}
			ref={tagsRef}
			multiple
			id="tags-outlined"
			// options={lists}
			options={lists.map((option) => option.title)}
			// getOptionLabel={(option) => option.title}
			// defaultValue={[top100Films[13]]}
			filterSelectedOptions
			loading={isLoading}
			clearOnBlur={false}
			open={open}
			freeSolo
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			onFocus={() => setOpen(true)}
			value={formData[tagsEditable.name].set}
			onChange={handleTagsChange}
			renderTags={(value, getTagProps) =>
				value.map((option, index) => (
					<Chip variant="outlined" label={option} {...getTagProps({ index })} />
				))
			}
			renderInput={({
				inputProps: { value, ...restInputProps },
				...params
			}) => (
				<TextField
					{...params}
					inputProps={restInputProps}
					{...tagsEditable}
					inputRef={ref}
					variant="outlined"
					type="text"
					label={capitalize(subject)}
					// placeholder={capitalize(subject)}
					// name={subject.toLowerCase()}
					value={textFieldValue}
					onChange={handleChange}
				/>
			)}
		/>
	);
}

ProfileCardTags.propTypes = {
	subject: PropTypes.string.isRequired,
	// setValue: PropTypes.array.isRequired,
	// textFieldValue: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	topic: PropTypes.shape({
		loading: PropTypes.bool.isRequired,
		lists: PropTypes.array.isRequired,
	}).isRequired,
	getXThunk: PropTypes.func.isRequired,
	getXSuccessAction: PropTypes.func.isRequired,
	prevChar: PropTypes.string.isRequired,
	tagsEditable: PropTypes.shape({
		name: PropTypes.string.isRequired,
		// value: PropTypes.array.isRequired,
		// ref: PropTypes.string.isRequired,
		ref: PropTypes.object.isRequired,
		// onChange: PropTypes.func.isRequired,
		disabled: PropTypes.bool.isRequired,
		// style: PropTypes.object.isRequired,
		setFormData: PropTypes.func.isRequired,
		formData: PropTypes.object.isRequired,
		setPrevChar: PropTypes.func.isRequired,
	}).isRequired,
};

export default ProfileCardTags;

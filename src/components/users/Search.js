import React, { useState } from "react";
import propTypes from "prop-types";

function Search({setAlert, searchUsers, showClear, clearUsers}) {
	const [text, setText] = useState("");

	const onSearch = ({ target: { value } }) => setText(value);

	const searchSubmit = e => {
		e.preventDefault();
		if (text === "") {
			setAlert("Please provide text", "light");
		} else {
			searchUsers(text);
			setText("");
		}
	};

	return (
		<div>
			<form onSubmit={searchSubmit} className="form">
				<input
					type="text"
					name="text"
					placeholder="Search Users..."
					value={text}
					onChange={onSearch}
				/>
				<input type="submit" value="Search" className="btn btn-dark btn-block" />
			</form>
			{showClear && (
				<button className="btn btn-light btn-block" onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
}

Search.propTypes = {
	searchUsers: propTypes.func.isRequired,
	clearUsers: propTypes.func.isRequired,
	showClear: propTypes.bool.isRequired,
	setAlert: propTypes.func.isRequired
};

export default Search;

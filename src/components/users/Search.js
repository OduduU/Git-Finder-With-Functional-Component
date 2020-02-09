import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

function Search() {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);
	const [text, setText] = useState("");

	const onSearch = ({ target: { value } }) => setText(value);

	const searchSubmit = e => {
		e.preventDefault();
		if (text === "") {
			alertContext.setAlert("Please provide text", "light");
		} else {
			githubContext.searchUsers(text);
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
			{githubContext.users.length > 0 && (
				<button
					className="btn btn-light btn-block"
					onClick={githubContext.clearUsers}
				>
					Clear
				</button>
			)}
		</div>
	);
}

export default Search;

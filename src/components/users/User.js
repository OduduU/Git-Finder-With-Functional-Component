import React, { useEffect, Fragment, useContext } from "react";
import { Spinner } from "../layout/Spinner";
import { useParams, Link } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from '../../context/github/githubContext';

function User() {
	const githubContext = useContext(GithubContext);

	const { getUser, user, loading, getUserRepos, repos } = githubContext;

	const { login: username } = useParams();
	useEffect(() => {
		getUser(username);
		getUserRepos(username);
		// eslint-disable-next-line
	}, []);

	const {
		name,
		avatar_url,
		location,
		bio,
		blog,
		company,
		login: userlogin,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable
	} = user;

	if (loading) return <Spinner />;

	return (
		<>
			<Link to="/" className="btn btn-light">
				Back To Search
			</Link>
			Hireable:{" "}
			{hireable ? (
				<i className="fas fa-check text-success" />
			) : (
				<i className="fas fa-times-circle text-danger" />
			)}
			<div className="card grid-2">
				<div className="all-center">
					<img
						src={avatar_url}
						className="round-img"
						alt=""
						style={{ width: "150px" }}
					/>
					<h1>{name}</h1>
					<p>Location: {location}</p>
				</div>
				<div>
					{bio && (
						<>
							<h3>Bio</h3>
							<p>{bio}</p>
						</>
					)}
					<a href={html_url} className="btn btn-dark my-1">
						Visit Github Profile
					</a>
					<ul>
						<li>
							{userlogin && (
								<Fragment>
									<strong>Username: </strong> {userlogin}
								</Fragment>
							)}
						</li>
						<li>
							{company && (
								<Fragment>
									<strong>Company: </strong> {company}
								</Fragment>
							)}
						</li>
						<li>
							{blog && (
								<Fragment>
									<strong>Website: </strong> {blog}
								</Fragment>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-primary">Follower: {followers}</div>
				<div className="badge badge-success">Following: {following}</div>
				<div className="badge badge-danger">Public Repos: {public_repos}</div>
				<div className="badge badge-dark">Public Gists: {public_gists}</div>
			</div>

			<Repos repos={repos} />
		</>
	);
}

export default User;

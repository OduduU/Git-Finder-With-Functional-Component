import React from 'react'
import UserItem from './UserItem';
import propTypes from 'prop-types';
import { Spinner } from '../layout/Spinner';

function Users({users, loading}) {
	return (
		loading ? <Spinner /> :
		<div style={userStyle}>
			{users.map(user => <UserItem key={user.id} user={user} />)}
		</div>
	);
}

const userStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gridGap: '1rem'
}

Users.propTypes = {
	users: propTypes.array.isRequired,
	loading: propTypes.bool.isRequired
}

export default Users

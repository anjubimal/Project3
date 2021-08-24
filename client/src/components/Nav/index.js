import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Navigation = () => {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<ul>
					<li>
						<Link to='/products'>Products</Link>
					</li>
					<li className='mx-1'>
						<a href='/' onClick={() => Auth.logout()}>
							Logout
						</a>
					</li>
					<li>
						<Link to='/admin'>Admin</Link>
					</li>
				</ul>
			);
		} else {
			return (
				<ul>
					<li>
						<Link to='/products'>Products</Link>
					</li>
					<li>
						<Link to='/login'>login</Link>
					</li>
					<li>
						<Link to='/signup'>Signup</Link>
					</li>
					<li>
						<Link to='/admin'>Admin</Link>
					</li>
				</ul>
			);
		}
	}

	return (
		<div>
			<Link to='/'>Epay</Link>
			<nav>{showNavigation()}</nav>
		</div>
	);
};

export default Navigation;

import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';

const Home = () => {
	return (
		<div>
			<h1>this is the home page</h1>
			<Link to='/products'>Products</Link>
			<Cart />
		</div>
	);
};

export default Home;

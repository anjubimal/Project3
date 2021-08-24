import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import ProductList from '../components/ProductList';

const Home = () => {
	return (
		<div>
			<h1>this is the home page</h1>
			<Link to='/products'>Products</Link>
			<ProductList />
			<Cart />
		</div>
	);
};

export default Home;

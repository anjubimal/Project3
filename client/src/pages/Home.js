import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import '../components/HomePage/style.css'

const Home = () => {
	return (
		<div id="home-container">
			<div>
				<h1 id="home-title">Welcome to Epay!</h1>
				<div id="product-link-div">
					<Link to='/products' id="product-link" class="button button--mimas"><span>Shop!</span></Link>
				</div>
			</div>
			
			<Cart />
		</div>
	);
};

export default Home;

import React from 'react';
import ProductForm from '../components/ProductForm';
import Cart from '../components/Cart';

const Admin = () => {
	return (
		<div>
			<h1>This is the Admin page!</h1>
			<ProductForm />
			<Cart />
		</div>
	);
};

export default Admin;

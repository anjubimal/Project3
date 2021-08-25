import React, { useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import Cart from '../components/Cart';
import ProductItem from '../components/ProductItem';
import { QUERY_PRODUCTS } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { DELETE_PRODUCT } from '../utils/mutations';

const Admin = () => {
	const { loading, data } = useQuery(QUERY_PRODUCTS);
	const [deleteProduct] = useMutation(DELETE_PRODUCT);
	const [state, dispatch] = useStoreContext();

	useEffect(() => {
		if (data) {
			dispatch({
				type: UPDATE_PRODUCTS,
				products: data.products,
			});

			data.products.forEach(product => {
				idbPromise('products', 'put', product);
			});
			// add else if to check if `loading` is undefined in `useQuery()` Hook
		} else if (!loading) {
			// since we're offline, get all of the data from the `products` store
			idbPromise('products', 'get').then(products => {
				// use retrieved data to set global state for offline browsing
				dispatch({
					type: UPDATE_PRODUCTS,
					products: products,
				});
			});
		}
	}, [data, loading, dispatch]);

	const handleDeleteProduct = async id => {
		try {
			const mutationResponse = await deleteProduct({
				variables: {
					deleteProductId: id
				}
			});
			const token = mutationResponse;
			console.log(token);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<h1>This is the Admin page!</h1>
			<ProductForm />
			<Cart />
			{state.products.map(product => (
				<div key={product._id}>
					<button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
					<ProductItem _id={product._id} image={product.image} name={product.name} price={product.price} quantity={product.quantity} />
				</div>
			))}
		</div>
	);
};

export default Admin;

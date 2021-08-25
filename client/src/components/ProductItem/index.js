import React from 'react';
import { Link } from 'react-router-dom';
import { pluralize } from '../../utils/helpers';
//import { useDispatch, useSelector } from 'react-redux';// --redux
import { useStoreContext } from "../../utils/GlobalState";// ------- non redux
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { CloudinaryContext, Image } from 'cloudinary-react';

function ProductItem(item) {
	//const dispatch = useDispatch();// ----- redux
	//const state = useSelector(state => state);// -----redux
	const [state, dispatch] = useStoreContext();

	const { image, name, _id, price, quantity } = item;

	const { cart } = state;

	const addToCart = () => {
		const itemInCart = cart.find(cartItem => cartItem._id === _id);
		if (itemInCart) {
			dispatch({
				type: UPDATE_CART_QUANTITY,
				_id: _id,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
			idbPromise('cart', 'put', {
				...itemInCart,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
		} else {
			dispatch({
				type: ADD_TO_CART,
				product: { ...item, purchaseQuantity: 1 },
			});
			idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
		}
	};

	return (
		<div className='card px-1 py-1'>
			<Link to={`/products/${_id}`}>
				<p>{name}</p>
				<CloudinaryContext cloudName="dfo6h6ipu">
					<Image publicId={image} width="100px" />
				</CloudinaryContext>
			</Link>
			<div>
				<div>
					{quantity} {pluralize('item', quantity)} in stock
				</div>
				<span>${price}</span>
			</div>
			<button onClick={addToCart}>Add to cart</button>
		</div>
	);
}

export default ProductItem;

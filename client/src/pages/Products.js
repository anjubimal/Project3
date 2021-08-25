import React from 'react';
import ProductList from '../components/ProductList';
import '../components/ProductPage/style.css'
import Cart from '../components/Cart';

const Products = () => {
    return (
        <div className="product-div">
            <h1 className="title">Store:</h1>
            <div className="wrapper">
                <ProductList />
            </div>
            <Cart />
        </div>
    )
}

export default Products

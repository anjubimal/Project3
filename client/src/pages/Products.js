import React from 'react';
import ProductList from '../components/ProductList';
import '../components/ProductPage/style.css'

const Products = () => {
    return (
        <div className="product-div">
            <h1 lassName="title">Store</h1>
            <div className="wrapper">
                <ProductList />
            </div>
        </div>
    )
}

export default Products

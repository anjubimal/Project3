import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>this is the home page</h1>
            <Link to="/products">Products</Link>
        </div>
    )
}

export default Home
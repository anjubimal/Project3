import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_PRODUCT, SAVE_PRODUCT } from "../../utils/mutations";
import { useQuery, useMutation } from '@apollo/react-hooks';
import ImageUpload from '../ImageUploader';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { UPDATE_CATEGORIES } from '../../utils/actions';
import './style.css'

function ProductForm(props) {
    const objects = { ...props };
    const updating = false;
    let placeHolderName = 'name';
    let placeHolderDescription = 'Description';
    let placeHolderPrice = '$$$';
    let placeHolderAmount = '100';
    if (updating) {
        placeHolderName = '';
        placeHolderDescription = '';
        placeHolderPrice = '';
        placeHolderAmount = '';
    }

    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: ''
    });
    const [state, dispatch] = useStoreContext();
    const { categories, imageId } = state;
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
    const [addProduct] = useMutation(ADD_PRODUCT);
    const [saveProduct] = useMutation(SAVE_PRODUCT);

    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories
            });
            categoryData.categories.forEach(category => {
                idbPromise('categories', 'put', category);
            });
        } else if (!loading) {
            idbPromise('categories', 'get').then(categories => {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categories
                });
            });
        }
    }, [categoryData, loading, dispatch]);

    const handleFormSubmit = async event => {
        event.preventDefault();
        console.log(formState.category);
        try {
            if (updating) {
                const mutationResponse = await saveProduct({
                    variables: {
                        _id: objects.id
                    }
                });
                const token = mutationResponse;
                console.log(token);
            } else {
                const mutationResponse = await addProduct({
                    variables: {
                        name: formState.name,
                        description: formState.description,
                        image: imageId,
                        price: parseFloat(formState.price),
                        quantity: parseInt(formState.quantity),
                        category: formState.category
                    }
                });
                const token = mutationResponse;
                console.log(token);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div id="admin-container">
            <h2 id="admin-title">Add Product</h2>
            <ImageUpload />
            <form id="admin-form" onSubmit={handleFormSubmit}>
                <div className="admin-section-divs">
                    <label htmlFor="name">Product Name:</label>
                    <input
                        placeholder={placeHolderName}
                        name="name"
                        type="text"
                        id="name"
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-section-divs">
                    <label htmlFor="description">Product Description:</label>
                    <input
                        placeholder={placeHolderDescription}
                        name="description"
                        type="text"
                        id="description"
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-section-divs">
                    <label htmlFor="price">Product Price:</label>
                    <input
                        placeholder={placeHolderPrice}
                        name="price"
                        type="number"
                        step='0.01'
                        id="price"
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-section-divs">
                    <label htmlFor="quantity">Product Quantity:</label>
                    <input
                        placeholder={placeHolderAmount}
                        name="quantity"
                        type="number"
                        id="quantity"
                        onChange={handleChange}
                    />
                </div>
                <div className="admin-section-divs">
                    <label htmlFor="category">Product Category:</label>
                    <select
                        name="category"
                        id="category"
                        onChange={handleChange}
                        defaultValue=""
                    >
                        <option key='1' value="" disabled >Select Category</option>
                        {categories.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>                
                <button id="admin-btn" data-testid="button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProductForm;
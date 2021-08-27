import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_CATEGORY } from "../../utils/mutations";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { UPDATE_CATEGORIES } from '../../utils/actions';
import './style.css'

function refreshPage() {
    window.location.reload(false);
}

function AddCategory() {

    const [formState, setFormState] = useState({
        name: ''
    });
    const [state, dispatch] = useStoreContext();
    const { categories } = state;
    console.log(categories);
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
    const [addCategory] = useMutation(ADD_CATEGORY);

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
        try {
            const mutationResponse = await addCategory({
                variables: {
                    name: formState.name,
                }
            });
            const token = mutationResponse;
            console.log(token);
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
            <form id="admin-form" onSubmit={handleFormSubmit}>
                <div className="admin-section-divs">
                    <label htmlFor="name">Category Name:</label>
                    <input
                        placeholder="Category"
                        name="name"
                        type="text"
                        id="name"
                        onChange={handleChange}
                    />
                </div>
                <button id="admin-btn" data-testid="button" type="submit" onClick={() => refreshPage()}>Add Category</button>
            </form>
        </div>
    );
}

export default AddCategory;
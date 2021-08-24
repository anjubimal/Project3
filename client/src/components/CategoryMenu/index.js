import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
//import { useDispatch, useSelector } from 'react-redux';// ------ redux
import { useStoreContext } from '../../utils/GlobalState';// ---- non redux
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
    //const dispatch = useDispatch();//-------- redux
    //const state = useSelector(state => state);// --------- redux

    const [state, dispatch] = useStoreContext();
    const { categories } = state;

    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
        //// if categoryData exists or has changed from the response of useQuery, then run dispatch() ////
        if (categoryData) {
            ///// execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to ////
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories,
            });
            categoryData.categories.forEach(category => {
                idbPromise('categories', 'put', category);
            });
        } else if (!loading) {
            idbPromise('categories', 'get').then(categories => {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categories,
                });
            });
        }
    }, [categoryData, loading, dispatch]);

    const handleClick = id => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id,
        });
    };

    return (
        <div>
            <h2>Choose a Category:</h2>
            {categories.map(item => (
                <button
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id);
                    }}>
                    {item.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryMenu;
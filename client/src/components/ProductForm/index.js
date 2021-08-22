import React, { useState } from 'react';
import { useStoreContext } from "../../utils/GlobalState";

function ProductForm() {
    const [state, dispatch] = useStoreContext();


    return (
        <div>
            <form onSubmit={ } className="form">
                <input></input>
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    );
}

export default ProductForm;
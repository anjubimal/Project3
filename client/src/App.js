import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import { StoreProvider } from "./utils/GlobalState";
import { ApolloProvider } from '@apollo/react-hooks';
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from '@apollo/client';


const httpLink = createHttpLink({
    uri: '/graphql',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});


function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <StoreProvider>
                        <ProductForm />
                    </StoreProvider>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
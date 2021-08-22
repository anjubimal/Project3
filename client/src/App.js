import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ImageUpload from "./components/ImageUploader";
import { StoreProvider } from "./utils/GlobalState";

import {
    ApolloProvider,
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
                        <ImageUpload />
                    </StoreProvider>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
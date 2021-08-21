import React from 'react';
import ImageUpload from "./components/imageUploader";

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
        <>
            <ImageUpload />
            <ApolloProvider client={client}>
                <div className="flex-column justify-flex-start min-100-vh">
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
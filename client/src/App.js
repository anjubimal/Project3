import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ImageUpload from "./components/imageUploader";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
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
                        <Nav />
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                        </Switch>
                        <ImageUpload />
                    </StoreProvider>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
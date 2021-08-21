import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from './components/Nav/index'

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

import { StoreProvider } from "./utils/GlobalState";


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
            <Navigation />
            {/* <Switch>
              <Route exact path="/" component={Home} />
              
            </Switch> */}
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>

  );
}

export default App;



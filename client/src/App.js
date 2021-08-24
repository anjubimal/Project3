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

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";


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
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/admin" component={Admin} />              
              </Switch>
              <Footer />
            </StoreProvider>
          </div>
        </Router>
      </ApolloProvider>
  
    );
  }
  
  export default App;
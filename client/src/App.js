import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import ProductForm from "./components/ProductForm";
import { StoreProvider } from "./utils/GlobalState";
import { ApolloProvider } from '@apollo/react-hooks';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

import Navigation from './components/Nav'
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin"
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  request: (operation) => { 
    // cache: new InMemoryCache()
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})



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
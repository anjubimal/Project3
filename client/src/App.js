//import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';// ------ -redux
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StoreProvider } from './utils/GlobalState';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Navigation from './components/Nav';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Footer from './components/Footer';

const client = new ApolloClient({
	request: operation => {
		const token = localStorage.getItem('id_token');
		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : '',
			},
		});
	},
	uri: '/graphql',
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div>
					<StoreProvider>
						<Navigation />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/products' component={Products} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/signup' component={Signup} />
							<Route exact path='/admin' component={Admin} />
						</Switch>
						<Footer />
					</StoreProvider>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;

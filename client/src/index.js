import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

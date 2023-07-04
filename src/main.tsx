import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import MyKlad from './App';

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MyKlad />
    </ApolloProvider>
  </React.StrictMode>
);

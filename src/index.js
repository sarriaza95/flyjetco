import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App/App'
import './main.scss'
import 'windicss'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

const client = new ApolloClient ({
    uri:'https://flyjetco.com/graphql',
    cache: new InMemoryCache()
})
ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('FLYJETCO'))

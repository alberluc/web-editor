import React, { useState } from 'react';
import './App.css';
import Editor from './components/Editor/Editor'
import { ApolloProvider, useApolloClient, useQuery } from '@apollo/react-hooks'
import { client } from './client'
import gql from 'graphql-tag'
import { fakeContent } from './components/Editor'


function App() {
    return (
        <ApolloProvider client={client}>
            <div id="App" className="App">
                <Editor>
                    {fakeContent}
                </Editor>
            </div>
        </ApolloProvider>
    )
}

export default App

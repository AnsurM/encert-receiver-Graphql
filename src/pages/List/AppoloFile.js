import React, { Component, Fragment } from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import AllCertificates from './AllCertificates';
import { render } from 'react-dom';

const client = new ApolloClient({
    uri: 'http://192.168.0.110:8000/graphql'
   });

const AppoloFile = () => {
    return (
    <ApolloProvider client={client}>
        <AllCertificates />
    </ApolloProvider>
    );    
}

export default AppoloFile;
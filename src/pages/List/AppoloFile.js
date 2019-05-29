import React, { Component, Fragment } from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import AllCertificates from './AllCertificates';
import { render } from 'react-dom';
import {url} from '../../utils/constants';

const client = new ApolloClient({
    uri: url
   });

const AppoloFile = () => {
    return (
    <ApolloProvider client={client}>
        <AllCertificates />
    </ApolloProvider>
    );    
}

export default AppoloFile;
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import Layout from "../components/Layout";

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
});

const App = ({Component, pageProps}: AppProps) => {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
};

export default App;
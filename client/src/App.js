import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { onError } from "apollo-link-error";

import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";

const uri = "http://localhost:4000/api";
const httpLink = createHttpLink({ uri, credentials: 'include' });
const cache = new InMemoryCache({});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const useApolloClient = () => {
  return new ApolloClient({
    link: errorLink.concat(httpLink),
    cache
  })
};

function App() {
  const client = useApolloClient();
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

export default App;

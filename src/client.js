import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

const cache = new InMemoryCache();
export const client = new ApolloClient({
    cache,
    resolvers: { },
});

const data = {
    currentAlign: 'justifyLeft'
}
cache.writeData({ data })
client.onResetStore(() => cache.writeData({ data }))

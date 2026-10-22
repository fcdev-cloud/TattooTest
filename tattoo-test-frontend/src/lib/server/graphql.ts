import { GraphQLClient } from 'graphql-request';
import { WPGRAPHQL_URL } from '$app/env/private';

export const client = new GraphQLClient(WPGRAPHQL_URL);
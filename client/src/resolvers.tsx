import gql from "graphql-tag";
import { ApolloCache } from "apollo-cache";
import * as GetCartItemsTypes from "./pages/__generated__/GetCartItems";
import * as LaunchTilesTypes from "./pages/__generated__/LaunchTile";
import { Resolvers } from "apollo-client";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromChart(id: ID!): [ID!]!
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {}

export const resolvers = {};

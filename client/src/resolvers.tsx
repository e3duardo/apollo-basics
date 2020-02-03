import gql from "graphql-tag";
import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";
import * as GetCartItemsTypes from "./pages/__generated__/GetCartItems";
import * as LaunchTilesTypes from "./pages/__generated__/LaunchTile";
import { GET_CART_ITEMS } from "./pages/cart";

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

interface AppResolvers extends Resolvers {
  Launch: ResolverMap;
}

export const resolvers: AppResolvers = {
  Launch: {
    isInCart: (launch: LaunchTilesTypes.LaunchTile, _, { cache }): boolean => {
      const queryResult = cache.readQuery<GetCartItemsTypes.GetCartItems>({
        query: GET_CART_ITEMS
      });
      if (queryResult) {
        return queryResult.cartItems.includes(launch.id);
      }
      return false;
    }
  }
};

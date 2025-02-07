import { TwitterResolverContext } from "../resolvers";
import { QueryResolvers } from "../resolvers-types.generated";

const queryTwitterResolvers: QueryResolvers<TwitterResolverContext> = {
  currentUser: (_, __, { db }) => {
    const [firstUser] = db.getAllUsers();

    if (!firstUser) {
      throw new Error('current user was requested, but there are no users in the database');
    }

    return firstUser;
  },
  suggestions: (_, __, { db: db }) => db.getAllSuggestions(),
};

export default queryTwitterResolvers;
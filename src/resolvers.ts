import { GraphQLError } from "graphql";

import classes from "./routes/classes/index.json";
import ancestries from "./routes/ancestry/index.json";
import communities from "./routes/community/index.json";
import domains from "./routes/domains/index.json";

import { joinDomains, joinSubclasses } from "./utils/classes";
import "./routes/subclasses/index.json";

const resolvers = {
  Query: {
    ancestries: () => {
      return ancestries.ancestries;
    },
    ancestry: (_: any, { id }: { id: string }) => {
      const reqAncestry = ancestries.ancestries.find(
        (c: any) => c.id.toLowerCase() === id.toLowerCase()
      );

      if (reqAncestry) return reqAncestry;

      throw new GraphQLError(`Ancestry with id '${id}' was not found.`, {
        extensions: {
          code: "NOT_FOUND",
          id,
        },
      });
    },
    classes: () => {
      return classes.classes.map((c: any) => {
        const subclassOptions = joinSubclasses(c.name);
        const domainList = joinDomains(c.domains || []);

        return {
          ...c,
          domains: domainList,
          subclassOptions,
        };
      });
    },
    class: (_: any, { id }: { id: string }) => {
      const reqClass = classes.classes.find(
        (c: any) => c.id.toLowerCase() === id.toLowerCase()
      );
      if (reqClass) {
        const subclassOptions = joinSubclasses(reqClass.name);
        const domainList = joinDomains(reqClass.domains || []);

        return {
          ...reqClass,
          domains: domainList,
          subclassOptions,
        };
      }

      throw new GraphQLError(`Class with id '${id}' was not found.`, {
        extensions: {
          code: "NOT_FOUND",
          id,
        },
      });
    },
    communities: () => {
      return communities.communities;
    },
    community: (_: any, { id }: { id: string }) => {
      const reqCommunity = communities.communities.find(
        (c: any) => c.id.toLowerCase() === id.toLowerCase()
      );

      if (reqCommunity) {
        return reqCommunity;
      }

      throw new GraphQLError(`Community with id '${id}' was not found.`, {
        extensions: {
          code: "NOT_FOUND",
          id,
        },
      });
    },
    domains: () => {
      return domains;
    },
    domain: (_: any, { id }: { id: string }) => {
      const reqDomain = domains.domain.find(
        (c: any) => c.id.toLowerCase() === id.toLowerCase()
      );
      if (reqDomain) {
        return reqDomain;
      }

      throw new GraphQLError(`Domain with id '${id}' was not found.`, {
        extensions: {
          code: "NOT_FOUND",
          id,
        },
      });
    },
  },
};

export default resolvers;


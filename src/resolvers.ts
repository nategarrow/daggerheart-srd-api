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
      return ancestries.ancestries.find(
        (c: any) => c.id.toLowerCase() === id.toLowerCase()
      );
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
      } else {
        throw new Error(`Class with id '${id}' was not found.`);
      }
    },
    communities: () => {
      return communities.communities;
    },
    community: (_: any, { id }: { id: string }) => {
      return communities.communities.find(
        (c: any) => c.id.toLowerCase() === id.toLowerCase()
      );
    },
    domains: () => {
      return domains;
    },
  },
};

export default resolvers;


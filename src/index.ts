import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";

import classes from "./routes/classes/index.json";
import { joinSubclasses } from "./routes/classes/utils";
import "./routes/subclasses/index.json";
import "./routes/community/index.json";
import "./routes/ancestry/index.json";

const typeDefs = gql`
  type Source {
    id: String!
    set: String!
    publisher: String!
    updated: String!
  }

  type CharacterClass {
    id: ID!
    type: String!
    name: String!
    description: String
    subclassOptions: [Subclass]
    source: Source!
  }

  type Subclass {
    id: ID!
    type: String!
    classId: String!
    name: String!
    description: String
    spellcastTrait: String
    levels: SubclassLevels
    source: Source!
  }

  type SubclassLevels {
    foundation: SubclassLevel
    specialization: SubclassLevel
    mastery: SubclassLevel
  }

  type SubclassLevel {
    level: String!
    traits: [SubclassTrait]
    tags: [String]
    source: Source!
  }

  type SubclassTrait {
    trait: String
    description: String
    type: String
    frequency: String
    options: [SubclassTraitOption]
  }

  type SubclassTraitOption {
    type: String!
    option: String
    description: String
  }

  type Query {
    classes: [CharacterClass]!
    class(id: ID!): CharacterClass
  }
`;

const resolvers = {
  Query: {
    classes: () => {
      return classes.data.map((c: any) => {
        const subclassOptions = joinSubclasses(c.name);
        console.log("subclassOptions:", c.name);

        return {
          ...c,
          subclassOptions,
        };
      });
    },
    class: (_: any, { id }: { id: string }) => {
      return classes.data.find(
        (c: any) => c.id.toLowerCase() === id.toLowerCase()
      );
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const graphql_tag_1 = require("graphql-tag");
const index_json_1 = __importDefault(require("./routes/classes/index.json"));
const utils_1 = require("./routes/classes/utils");
require("./routes/subclasses/index.json");
require("./routes/community/index.json");
require("./routes/ancestry/index.json");
const typeDefs = (0, graphql_tag_1.gql) `
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
            return index_json_1.default.data.map((c) => {
                const subclassOptions = (0, utils_1.joinSubclasses)(c.name);
                console.log("subclassOptions:", c.name);
                return {
                    ...c,
                    subclassOptions,
                };
            });
        },
        class: (_, { id }) => {
            return index_json_1.default.data.find((c) => c.id.toLowerCase() === id.toLowerCase());
        },
    },
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
(async () => {
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
})();

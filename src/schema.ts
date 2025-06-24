import { gql } from "graphql-tag";

const typeDefs = gql`
  # Global
  type Source {
    id: String!
    set: String!
    publisher: String!
    updated: String!
  }

  type Trait {
    id: String!
    name: String
    type: String
    mechanic: String
    frequency: String
    description: String
    descriptionFormat: String
  }

  type Tag {
    categories: [String]
    mechanics: [String]
    themes: [String]
  }

  type File {
    id: String
    url: String
    width: Int
    height: Int
    format: String
  }

  # Domains
  type Domain {
    id: String!
    name: String!
    description: String
    classes: [String]
    source: Source!
  }

  type DomainCard {
    id: String!
    domain: String!
    name: String!
  }

  type DomainQuery {
    domain: [Domain]!
    cards: [DomainCard]!
  }

  # Classes
  type CharacterClass {
    id: ID!
    type: String!
    name: String!
    description: String
    subclassOptions: [Subclass]
    domains: [Domain]
    source: Source!
  }

  # Subclasses
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

  # Ancestries
  type Ancestry {
    type: String
    name: String!
    description: String
    descriptionFormat: String
    traits: [Trait]
    tags: Tag
    ancestryImage: File
    source: Source!
  }

  # Communities
  type Community {
    type: String
    name: String
    description: String
    descriptionFormat: String
    traits: [Trait]
    tags: Tag
    communityImage: File
    source: Source!
  }

  type Query {
    ancestries: [Ancestry]!
    ancestry(id: ID!): Ancestry
    classes(verbose: Boolean): [CharacterClass]!
    class(id: ID!, verbose: Boolean): CharacterClass
    communities: [Community]!
    community(id: ID!): Community
    domains: DomainQuery
    domain(id: ID!): Domain
  }
`;

export default typeDefs;


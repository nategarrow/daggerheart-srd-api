import { loadFilesSync } from "@graphql-tools/load-files";

const typeDefs = loadFilesSync("api/**/*.graphql");

export default typeDefs;

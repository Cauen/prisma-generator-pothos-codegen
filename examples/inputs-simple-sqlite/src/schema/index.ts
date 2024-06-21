import { builder } from "./builder";
import { 
  generateAllCrud,
  // generateAllMutations,
  // generateAllObjects,
  // generateAllQueries,
  // generateAllResolvers,
} from "./__generated__/autocrud";

generateAllCrud(); // from generated

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});

import { builder } from "./builder";
import './objects' // rest example

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});

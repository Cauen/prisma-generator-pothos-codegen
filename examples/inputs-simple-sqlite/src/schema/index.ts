import { builder } from "./builder";
import './user'
import './post'
import './comment'
import './objects' // rest example

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});

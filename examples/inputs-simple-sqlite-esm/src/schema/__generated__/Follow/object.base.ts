import * as Inputs from '../inputs.js';
import { builder } from '../../builder.js';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils.js';

export const FollowObject = definePrismaObject('Follow', {
  description: undefined,
  findUnique: (fields) => ({ compositeID: fields }),
  fields: (t) => ({
    fromId: t.field(FollowFromIdFieldObject),
    toId: t.field(FollowToIdFieldObject),
    From: t.relation('From', FollowFromFieldObject),
    To: t.relation('To', FollowToFieldObject),
  }),
});

export const FollowFromIdFieldObject = defineFieldObject('Follow', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.fromId,
});

export const FollowToIdFieldObject = defineFieldObject('Follow', {
  type: "Int",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.toId,
});

export const FollowFromFieldObject = defineRelationObject('Follow', 'From', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

export const FollowToFieldObject = defineRelationObject('Follow', 'To', {
  description: undefined,
  nullable: false,
  args: undefined,
  query: undefined,
});

import * as Inputs from '../inputs';
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const FollowObject = definePrismaObject('Follow', {
  description: undefined,
  findUnique: (fields) => ({ compositeID: fields }),
  fields: (t) => ({
    fromId: t.exposeInt('fromId', FollowFromIdFieldObject),
    toId: t.exposeInt('toId', FollowToIdFieldObject),
    From: t.relation('From', FollowFromFieldObject),
    To: t.relation('To', FollowToFieldObject),
  }),
});

export const FollowFromIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});

export const FollowToIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
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

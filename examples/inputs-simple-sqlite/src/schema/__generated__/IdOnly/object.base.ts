import * as Inputs from '../inputs';
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const IdOnlyObject = definePrismaObject('IdOnly', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', IdOnlyIdFieldObject),
  }),
});

export const IdOnlyIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});

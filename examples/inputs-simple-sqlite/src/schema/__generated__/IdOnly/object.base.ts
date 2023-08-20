import * as Inputs from '@/schema/__generated__/inputs'
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const IdOnlyObject = definePrismaObject('IdOnly', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(IdOnlyIdFieldObject),
  }),
});

export const IdOnlyIdFieldObject = defineFieldObject('IdOnly', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

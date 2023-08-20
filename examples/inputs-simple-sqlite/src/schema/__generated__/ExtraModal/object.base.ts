import * as Inputs from '@/schema/__generated__/inputs'
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const ExtraModalObject = definePrismaObject('ExtraModal', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(ExtraModalIdFieldObject),
    title: t.field(ExtraModalTitleFieldObject),
    createdAt: t.field(ExtraModalCreatedAtFieldObject),
    updatedAt: t.field(ExtraModalUpdatedAtFieldObject),
  }),
});

export const ExtraModalIdFieldObject = defineFieldObject('ExtraModal', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const ExtraModalTitleFieldObject = defineFieldObject('ExtraModal', {
  type: "String",
  description: 'The title of extramodal',
  nullable: false,
  resolve: (parent) => parent.title,
});

export const ExtraModalCreatedAtFieldObject = defineFieldObject('ExtraModal', {
  type: Inputs.DateTime,
  description: 'createdAt description',
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const ExtraModalUpdatedAtFieldObject = defineFieldObject('ExtraModal', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.updatedAt,
});

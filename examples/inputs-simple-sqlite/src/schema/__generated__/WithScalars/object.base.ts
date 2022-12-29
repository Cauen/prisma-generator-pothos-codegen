import * as Inputs from '../inputs';
import {
  defineExposeObject,
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const WithScalarsObject = definePrismaObject('WithScalars', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.exposeID('id', WithScalarsIdFieldObject),
    string: t.exposeString('string', WithScalarsStringFieldObject),
    boolean: t.exposeBoolean('boolean', WithScalarsBooleanFieldObject),
    int: t.exposeInt('int', WithScalarsIntFieldObject),
    float: t.exposeFloat('float', WithScalarsFloatFieldObject),
    decimal: t.field(WithScalarsDecimalFieldObject),
    bigint: t.field(WithScalarsBigintFieldObject),
    datetime: t.field(WithScalarsDatetimeFieldObject),
    bytes: t.field(WithScalarsBytesFieldObject),
  }),
});

export const WithScalarsIdFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: false,
});

export const WithScalarsStringFieldObject = defineExposeObject('String', {
  description: undefined,
  nullable: true,
});

export const WithScalarsBooleanFieldObject = defineExposeObject('Boolean', {
  description: undefined,
  nullable: true,
});

export const WithScalarsIntFieldObject = defineExposeObject('Int', {
  description: undefined,
  nullable: true,
});

export const WithScalarsFloatFieldObject = defineExposeObject('Float', {
  description: undefined,
  nullable: true,
});

export const WithScalarsDecimalFieldObject = defineFieldObject('WithScalars', {
  type: Inputs.Decimal,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.decimal,
});

export const WithScalarsBigintFieldObject = defineFieldObject('WithScalars', {
  type: Inputs.Bigint,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.bigint,
});

export const WithScalarsDatetimeFieldObject = defineFieldObject('WithScalars', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.datetime,
});

export const WithScalarsBytesFieldObject = defineFieldObject('WithScalars', {
  type: Inputs.Bytes,
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.bytes,
});

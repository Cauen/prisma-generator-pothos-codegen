// TODO only import what is necessary
export const objectTemplate = `#{inputsImporter}#{builderCalculatedImport}
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const #{modelName}#{optionalUnderscore}Object = definePrismaObject('#{modelName}', {
  description: #{description},
  findUnique: #{findUnique},
  fields: (t) => ({
    #{fields}
  }),
});

#{exportFields}
`

export const fieldObjectTemplate = `export const #{modelName}#{optionalUnderscore}#{nameUpper}#{optionalUnderscore}FieldObject = defineFieldObject('#{modelName}', {
  type: #{conditionalType},
  description: #{description},
  nullable: #{nullable},
  resolve: (parent) => #{conditionalResolve},
});`

export const listRelationObjectTemplate = `export const #{modelName}#{optionalUnderscore}#{nameUpper}#{optionalUnderscore}FieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.#{type}WhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.#{type}OrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.#{type}WhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.#{typeUpper}ScalarFieldEnum], required: false }),
}))

export const #{modelName}#{optionalUnderscore}#{nameUpper}#{optionalUnderscore}FieldObject = defineRelationFunction('#{modelName}', (t) =>
  defineRelationObject('#{modelName}', '#{name}', {
    description: #{description},
    nullable: #{nullable},
    args: #{modelName}#{optionalUnderscore}#{nameUpper}#{optionalUnderscore}FieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);`

export const relationObjectTemplate = `export const #{modelName}#{optionalUnderscore}#{nameUpper}#{optionalUnderscore}FieldObject = defineRelationObject('#{modelName}', '#{name}', {
  description: #{description},
  nullable: #{nullable},
  args: undefined,
  query: undefined,
});`

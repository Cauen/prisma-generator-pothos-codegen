export const objectTemplate = `import { Inputs, definePrismaObject } from '../imports';

export const #{modelName}Object = definePrismaObject('#{modelName}', {
  description: #{description},
  findUnique: #{findUnique},
  fields: (t) => ({
    #{fields}
  }),
});
`;

export const relationArgsTemplate = `{
        where: t.arg({ type: Inputs.#{inputType}WhereInput, required: false }),
        orderBy: t.arg({ type: [Inputs.#{inputType}OrderByWithRelationInput], required: false }),
        cursor: t.arg({ type: Inputs.#{inputType}WhereUniqueInput, required: false }),
        take: t.arg({ type: 'Int', required: false }),
        skip: t.arg({ type: 'Int', required: false }),
        distinct: t.arg({ type: [Inputs.#{inputType}ScalarFieldEnum], required: false }),
      }`;

export const relationQueryTemplate = `(args) => ({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      })`;

export const relationTemplate = `t.relation('#{name}', {
      description: #{description},
      nullable: #{nullable},
      args: #{args},
      query: #{query},
    })`;

export const fieldTemplate = `t.field({
      type: Inputs.#{fieldType},
      description: #{description},
      nullable: #{nullable},
      resolve: (parent) => parent.#{name},
    })`;

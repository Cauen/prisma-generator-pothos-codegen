import { useTemplate } from '../../utils/template'

export const makeResolver = (
  root: 'Query' | 'Mutation',
  imports: string,
  operation: string,
  type: string,
  nullable: 'true' | 'false',
  args: string,
  resolve: string,
  isPrisma = true,
) =>
  useTemplate(
    resolverTemplate,
    {
      root,
      object: isPrisma ? 'PrismaObject' : 'Object',
      imports,
      operation,
      type,
      nullable,
      args,
      resolve,
      field: isPrisma ? 'prismaField' : 'field',
    },
    ['modelName', 'inputsImporter', 'resolverImports', 'builderCalculatedImport', 'importExt'],
  )

export const resolverTemplate = `#{inputsImporter}#{imports}#{resolverImports}#{builderCalculatedImport}
import { define#{root}, define#{root}Function, define#{root}#{object} } from '../../utils#{importExt}';

export const #{operation}#{modelName}#{root}Args = builder.args((t) => (#{args}))

export const #{operation}#{modelName}#{root}Object = define#{root}Function((t) =>
  define#{root}#{object}({
    type: #{type},
    nullable: #{nullable},
    args: #{operation}#{modelName}#{root}Args,
    resolve: #{resolve},
  }),
);

export const #{operation}#{modelName}#{root} = define#{root}((t) => ({
  #{operation}#{modelName}: t.#{field}(#{operation}#{modelName}#{root}Object(t)),
}));
`

import path from 'node:path';
import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../../utils/config';
import { writeFile } from '../../utils/filesystem';
import { firstLetterLowerCase, firstLetterUpperCase, getCompositeName } from '../../utils/string';
import { useTemplate } from '../../utils/template';
import { objectTemplate } from '../templates/object';
import { getObjectFieldsString } from './objectFields';

const getResolverTypeName = (type: ResolverType) => {
  return type === 'mutations' ? 'Mutation' : 'Query';
};

/** Write index.ts */
export async function writeIndex(
  config: ConfigInternal,
  model: DMMF.Model,
  { queries, mutations }: { queries: GeneratedResolver[]; mutations: GeneratedResolver[] },
) {
  const queriesExports = queries.map(
    (el) => `${el.resolverName}${el.modelName}${getResolverTypeName(el.type)}`,
  );
  const mutationsExports = mutations.map(
    (el) => `${el.resolverName}${el.modelName}${getResolverTypeName(el.type)}`,
  );

  const exportsWithName = [
    {
      name: './object.base',
      exports: [
        `${model.name}Object`,
        ...model.fields.map((el) => `${model.name}${firstLetterUpperCase(el.name)}FieldObject`),
      ],
    },
    {
      name: './mutations',
      exports: [...mutationsExports, ...mutationsExports.map((el) => `${el}Object`)],
    },
    {
      name: './queries',
      exports: [...queriesExports, ...queriesExports.map((el) => `${el}Object`)],
    },
  ];

  // TODO Refactor this logic + tests
  const exports = exportsWithName
    .filter((el) => el.exports.length)
    .map((el) => `export {\n  ${el.exports.join(',\n  ')}\n} from '${el.name}';`);
  const outputPath = path.join(config.crud.outputDir, model.name, 'index.ts');
  const content = exports.join('\n') + '\n';
  await writeFile(config, 'crud.model.index', content, outputPath);
  return exportsWithName;
}

/** Write object.base.ts */
export async function writeObject(config: ConfigInternal, model: DMMF.Model): Promise<void> {
  // findUnique
  const idField = model.fields.find((f) => f.isId);
  let findUnique = `(fields) => ({ ...fields })`;
  if (idField) findUnique = `({ ${idField.name} }) => ({ ${idField.name} })`;
  if (model.primaryKey?.fields)
    findUnique = `(fields) => ({ ${
      model.primaryKey.name || getCompositeName(model.primaryKey.fields)
    }: fields })`;

  // Fields
  const { fields, exportFields } = getObjectFieldsString(model.name, model.fields, config);

  const fileLocation = path.join(config.crud.outputDir, model.name, 'object.base.ts');
  const builderCalculatedImport = getBuilderCalculatedImport({ config, fileLocation });

  // Write output
  await writeFile(
    config,
    'crud.model.object',
    useTemplate(objectTemplate, {
      modelName: model.name,
      description: model.documentation ? `'${model.documentation}'` : 'undefined', // Object description defined in schema.prisma
      findUnique,
      inputsImporter: config.crud.inputsImporter,
      fields: fields.join('\n    '),
      exportFields: exportFields.join('\n\n'),
      builderCalculatedImport,
    }),
    fileLocation,
  );
}

const isExcludedResolver = (options: ConfigInternal, name: string) => {
  const {
    excludeResolversContain,
    excludeResolversExact,
    includeResolversContain,
    includeResolversExact,
  } = options.crud || {};
  if (includeResolversExact.length) {
    return !includeResolversExact.includes(name);
  }
  if (includeResolversContain.length) {
    return !includeResolversContain.some((include) => name.includes(include));
  }

  if (excludeResolversExact.length && excludeResolversExact.includes(name)) {
    return true;
  }
  if (excludeResolversContain.length && excludeResolversContain.some((r) => name.includes(r))) {
    return true;
  }
  return false;
};

export const getBuilderCalculatedImport = ({
  config,
  fileLocation,
}: {
  fileLocation: string;
  config: ConfigInternal;
}) => {
  const builderRelative = path.relative(
    process.cwd(),
    path.join(process.cwd(), config.global.builderLocation),
  );
  let relativeImport = path.relative(path.dirname(fileLocation), builderRelative);

  if (path.sep === '\\') {
    relativeImport = relativeImport.replace(/\\/g, '/');
  }

  const importer = `\nimport { builder } from '${relativeImport}';`;
  return importer;
};

/** Write resolvers (e.g. findFirst, findUnique, createOne, etc) */
type ResolverType = 'queries' | 'mutations';
export type GeneratedResolver = {
  resolverName: string;
  modelName: string;
  type: ResolverType;
};
export async function writeResolvers(
  config: ConfigInternal,
  model: DMMF.Model,
  type: ResolverType,
  templates: Record<string, string>,
): Promise<GeneratedResolver[]> {
  const { inputsImporter } = config.crud;
  const resolverInputsImporter = inputsImporter.includes('../')
    ? inputsImporter.replace('../', '../../') // go a level inside to import
    : inputsImporter;

  const resolvers = Object.entries(templates).filter(
    ([name]) => !isExcludedResolver(config, `${name}${model.name}`),
  );

  // Generate files
  await Promise.all(
    resolvers.map(([name, template]) => {
      const fileLocation = path.join(config.crud.outputDir, model.name, type, `${name}.base.ts`);
      const builderCalculatedImport = getBuilderCalculatedImport({ config, fileLocation });

      return writeFile(
        config,
        'crud.model.resolver',
        useTemplate(template, {
          modelName: model.name,
          modelNameLower: firstLetterLowerCase(model.name),
          modelNameUpper: firstLetterUpperCase(model.name),
          prisma: config.crud.prismaCaller,
          resolverImports: config.crud.resolverImports,
          inputsImporter: resolverInputsImporter,
          builderCalculatedImport,
        }),
        fileLocation,
      );
    }),
  );

  if (resolvers.length)
    await writeFile(
      config,
      'crud.model.resolverIndex',
      // TODO Refactor this logic + tests
      resolvers
        .map(
          ([name]) =>
            `export ${(() => {
              return `{ ${name}${model.name}${
                type === 'mutations' ? 'Mutation' : 'Query'
              }, ${name}${model.name}${getResolverTypeName(type)}Object }`;
            })()} from './${name}.base';`,
        )
        .join('\n') + '\n',
      path.join(config.crud.outputDir, model.name, type, 'index.ts'),
    );

  return resolvers.map(([resolverName]) => ({ resolverName, modelName: model.name, type }));
}

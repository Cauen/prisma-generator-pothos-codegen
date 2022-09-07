import path from 'node:path';
import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../../utils/config';
import { writeFile } from '../../utils/filesystem';
import { firstLetterLowerCase, getCompositeName } from '../../utils/string';
import { useTemplate } from '../../utils/template';
import { objectTemplate } from '../templates/object';
import { getObjectFieldsString } from './objectFields';

/** Write index.ts */
export function writeIndex(config: ConfigInternal, model: DMMF.Model): void {
  const exports = ['./object.base', './mutations', './queries'].map((e) => `export * from '${e}';`);
  const outputPath = path.join(config.crud.outputDir, model.name, 'index.ts');
  writeFile(config, 'crud.model.index', exports.join('\n') + '\n', outputPath);
}

/** Write object.base.ts */
export function writeObject(config: ConfigInternal, model: DMMF.Model): void {
  // findUnique
  const idField = model.fields.find((f) => f.isId);
  let findUnique = `(fields) => ({ ...fields })`;
  if (idField) findUnique = `({ ${idField.name} }) => ({ ${idField.name} })`;
  if (model.primaryKey?.fields)
    findUnique = `(fields) => ({ ${
      model.primaryKey.name || getCompositeName(model.primaryKey.fields)
    }: fields })`;

  // Fields
  const { fields, exportFields } = getObjectFieldsString(model.name, model.fields);

  // Write output
  writeFile(
    config,
    'crud.model.object',
    useTemplate(objectTemplate, {
      modelName: model.name,
      description: model.documentation ? `'${model.documentation}'` : 'undefined',
      findUnique,
      inputsImporter: config.crud.inputsImporter,
      fields: fields.join('\n    '),
      exportFields: exportFields.join('\n\n'),
    }),
    path.join(config.crud.outputDir, model.name, 'object.base.ts'),
  );
}

/** Write resolvers (e.g. findFirst, findUnique, createOne, etc) */
export function writeResolvers(
  config: ConfigInternal,
  model: DMMF.Model,
  type: 'queries' | 'mutations',
  templates: Record<string, string>,
): void {
  const { inputsImporter } = config.crud;
  const resolverInputsImporter = inputsImporter.includes('../')
    ? inputsImporter.replace('../', '../../') // go a level inside to import
    : inputsImporter;

  writeFile(
    config,
    'crud.model.resolverIndex',
    Object.keys(templates)
      .map((name) => `export * from './${name}.base';`)
      .join('\n') + '\n',
    path.join(config.crud.outputDir, model.name, type, 'index.ts'),
  );

  Object.entries(templates).forEach(([name, template]) =>
    writeFile(
      config,
      'crud.model.resolver',
      useTemplate(template, {
        modelName: model.name,
        modelNameLower: firstLetterLowerCase(model.name),
        prisma: config.crud.prismaCaller,
        resolverImports: config.crud.resolverImports,
        inputsImporter: resolverInputsImporter,
      }),
      path.join(config.crud.outputDir, model.name, type, `${name}.base.ts`),
    ),
  );
}

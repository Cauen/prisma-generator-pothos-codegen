import path from 'node:path';
import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../utils/config';
import { writeFile } from '../utils/filesystem';
import { useTemplate } from '../utils/template';
import { utilsTemplate, objectsTemplate, autoCrudTemplate } from './templates/root';
import { generateModel } from './utils/generator';

export async function generateCrud(config: ConfigInternal, dmmf: DMMF.Document): Promise<void> {
  if (config.crud.disabled) return;

  const modelNames = dmmf.datamodel.models.map((model) => model.name);

  // Generate CRUD directories (e.g. User, Comment, ...)
  await Promise.all(modelNames.map((model) => generateModel(config, dmmf, model)));

  // Generate root objects.ts file (export all models + prisma objects)
  const exports = dmmf.datamodel.models
    .map((model) => `export * from './${model.name}';`)
    .join('\n');
  const modelNamesEachLine = modelNames.map((model) => `'${model}',`).join('\n  ');

  await writeFile(
    config,
    'crud.objects',
    useTemplate(objectsTemplate, { exports, ...config.crud, modelNames: modelNamesEachLine }),
    path.join(config.crud.outputDir, 'objects.ts'),
  );

  // Generate root utils.ts file
  await writeFile(
    config,
    'crud.utils',
    useTemplate(utilsTemplate, config.crud),
    path.join(config.crud.outputDir, 'utils.ts'),
  );

  // Generate root autocrud.ts file
  if (config.crud.generateAutocrud) {
    await writeFile(
      config,
      'crud.autocrud',
      useTemplate(autoCrudTemplate, config.crud),
      path.join(config.crud.outputDir, 'autocrud.ts'),
    );
  }
}

import path from 'node:path';
import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../utils/config';
import { writeFile } from '../utils/filesystem';
import { useTemplate } from '../utils/template';
import { utilsTemplate, objectsTemplate } from './templates/root';
import { generateModel } from './utils/generator';

export async function generateCrud(config: ConfigInternal, dmmf: DMMF.Document): Promise<void> {
  if (config.crud.disabled) return;

  // Generate CRUD directories (e.g. User, Comment, ...)
  dmmf.datamodel.models.forEach((model) => generateModel(config, dmmf, model.name));

  // Generate root objects.ts file (export all models + prisma objects)
  const exports = dmmf.datamodel.models
    .map((model) => `export * from './${model.name}';`)
    .join('\n');

  writeFile(
    config,
    'crud.objects',
    useTemplate(objectsTemplate, { exports, ...config.crud }),
    path.join(config.crud.outputDir, 'objects.ts'),
  );

  // Generate root utils.ts file
  writeFile(
    config,
    'crud.utils',
    useTemplate(utilsTemplate, config.crud),
    path.join(config.crud.outputDir, 'utils.ts'),
  );
}

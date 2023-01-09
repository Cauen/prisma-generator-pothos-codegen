import path from 'node:path';
import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../utils/config';
import { deleteFolder, writeFile } from '../utils/filesystem';
import { useTemplate } from '../utils/template';
import { utilsTemplate, objectsTemplate, autoCrudTemplate } from './templates/root';
import { generateModel } from './utils/generator';

export async function generateCrud(config: ConfigInternal, dmmf: DMMF.Document): Promise<void> {
  if (config.crud.disabled) return;

  if (config.crud.deleteOutputDirBeforeGenerate)
    await deleteFolder(path.join(config.crud.outputDir));

  const modelNames = dmmf.datamodel.models.map((model) => model.name);

  // Generate CRUD directories (e.g. User, Comment, ...)
  const models = await Promise.all(
    modelNames.map(async (model) => {
      const generated = await generateModel(config, dmmf, model);
      return { model, generated };
    }),
  );

  // Generate root objects.ts file (export all models + prisma objects)
  const modelNamesEachLine = modelNames.map((model) => `'${model}',`).join('\n  ');

  await writeFile(
    config,
    'crud.objects',
    useTemplate(objectsTemplate, { ...config.crud, modelNames: modelNamesEachLine }),
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
  // TODO REFACTOR AND TESTS
  if (config.crud.generateAutocrud) {
    const imports = dmmf.datamodel.models
      .map((model) => `import * as ${model.name} from './${model.name}';`)
      .join('\n');

    const modelsGenerated = dmmf.datamodel.models
      .map((model) => {
        const { name } = model;
        return `  ${name}: {
    Object: ${name}.${name}Object,
    queries: ${(() => {
      const queries =
        models.find((el) => el.model === name)?.generated.filter((el) => el.type === 'queries') ||
        [];
      return `{\n${queries
        .map(
          (el) =>
            `      ${el.resolverName}: ${el.modelName}.${el.resolverName}${el.modelName}QueryObject,`,
        )
        .join('\n')}\n    }`;
    })()},
    mutations: ${(() => {
      const mutations =
        models.find((el) => el.model === name)?.generated.filter((el) => el.type === 'mutations') ||
        [];
      return `{\n${mutations
        .map(
          (el) =>
            `      ${el.resolverName}: ${el.modelName}.${el.resolverName}${el.modelName}MutationObject,`,
        )
        .join('\n')}\n    }`;
    })()},
  },`;
      })
      .join('\n');

    await writeFile(
      config,
      'crud.autocrud',
      useTemplate(autoCrudTemplate, { ...config.crud, imports, modelsGenerated }),
      path.join(config.crud.outputDir, 'autocrud.ts'),
    );
  }
}

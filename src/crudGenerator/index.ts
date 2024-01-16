import path from 'node:path'
import { ConfigInternal } from '../utils/config'
import { getConfigCrudUnderscore } from '../utils/configUtils'
import { deleteFolder, writeFile } from '../utils/filesystem'
import { useTemplate } from '../utils/template'
import { utilsTemplate, objectsTemplate, autoCrudTemplate } from './templates/root'
import { generateModel } from './utils/generator'
import { getBuilderCalculatedImport } from './utils/parts'
import type { DMMF } from '@prisma/generator-helper'

export async function generateCrud(config: ConfigInternal, dmmf: DMMF.Document): Promise<void> {
  if (config.crud.disabled) return

  if (config.crud.deleteOutputDirBeforeGenerate) await deleteFolder(path.join(config.crud.outputDir))

  const modelNames = dmmf.datamodel.models.map((model) => model.name)

  // Generate CRUD directories (e.g. User, Comment, ...)
  const generatedModels = await Promise.all(
    modelNames.map(async (model) => {
      const generated = await generateModel(config, dmmf, model)
      return { model, generated }
    }),
  )
  const exportAllInObjects = generatedModels
    .map((el) => {
      return {
        model: el.model,
        exports: el.generated.index.map((el) => el.exports).flat(),
      }
    })
    .filter((el) => Boolean(el.exports.length))

  // Generate root objects.ts file (export all models + prisma objects)
  const modelNamesEachLine = modelNames.map((model) => `'${model}',`).join('\n  ')
  const fileLocationObjects = path.join(config.crud.outputDir, 'objects.ts')
  const builderCalculatedImportObjects = getBuilderCalculatedImport({
    config,
    fileLocation: fileLocationObjects,
  })

  await writeFile(
    config,
    'crud.objects',
    useTemplate(objectsTemplate, {
      crudExportRoot: config.crud.exportEverythingInObjectsDotTs
        ? `\n${exportAllInObjects
            .map(
              (el) =>
                `export {\n  ${el.exports.join(',\n  ')}\n} from './${el.model}${
                  config.global.esm ? '/index.js' : ''
                }';`,
            )
            .join('\n')}`
        : '',
      ...config.crud,
      modelNames: modelNamesEachLine,
      builderCalculatedImport: builderCalculatedImportObjects,
    }),
    fileLocationObjects,
  )

  const fileLocation = path.join(config.crud.outputDir, 'utils.ts')
  const builderCalculatedImport = getBuilderCalculatedImport({
    config,
    fileLocation,
  })

  // Generate root utils.ts file
  await writeFile(
    config,
    'crud.utils',
    useTemplate(utilsTemplate, {
      builderCalculatedImport,
    }),
    fileLocation,
  )

  // Generate root autocrud.ts file
  // TODO REFACTOR AND TESTS
  if (config.crud.generateAutocrud) {
    const imports = dmmf.datamodel.models
      .map((model) => `import * as ${model.name} from './${model.name}${config.global.esm ? '/index.js' : ''}';`)
      .join('\n')
    const models = generatedModels.map((el) => ({
      model: el.model,
      generated: el.generated.resolvers,
    }))

    const modelsGenerated = dmmf.datamodel.models
      .map((model) => {
        const { name } = model
        return `  ${name}: {
    Object: ${name}.${name}${getConfigCrudUnderscore(config)}Object,
    queries: ${(() => {
      const queries = models.find((el) => el.model === name)?.generated.filter((el) => el.type === 'queries') || []
      return `{\n${queries
        .map((el) => `      ${el.resolverName}: ${el.modelName}.${el.resolverName}${el.modelName}QueryObject,`)
        .join('\n')}\n    }`
    })()},
    mutations: ${(() => {
      const mutations = models.find((el) => el.model === name)?.generated.filter((el) => el.type === 'mutations') || []
      return `{\n${mutations
        .map((el) => `      ${el.resolverName}: ${el.modelName}.${el.resolverName}${el.modelName}MutationObject,`)
        .join('\n')}\n    }`
    })()},
  },`
      })
      .join('\n')

    const fileLocation = path.join(config.crud.outputDir, 'autocrud.ts')
    const builderCalculatedImport = getBuilderCalculatedImport({
      config,
      fileLocation,
    })

    await writeFile(
      config,
      'crud.autocrud',
      useTemplate(autoCrudTemplate, {
        ...config.crud,
        imports,
        modelsGenerated,
        builderCalculatedImport,
        importExt: config.global.esm ? '.js' : '',
      }),
      fileLocation,
    )
  }
}

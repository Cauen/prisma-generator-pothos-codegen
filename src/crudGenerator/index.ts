import { Configs } from "../generator";
import { DMMF } from '@prisma/generator-helper';
import modelGenerate from './generator'
import { replaceAndWriteFileSafely } from "../utils/filesystem";
import path from 'path'

/**
 * - Export all the models
 * - Export Prisma Objects (BatchPayload)
 */
const writeObjects = (dmmf: DMMF.Document, configs: Configs) => {
  const dirname = configs.crud?.outputFolderPath || "./generated"
  const exportedModels = (() => {
    return dmmf.datamodel.models.map((model) => {
      return `export * from './${model.name}'`
    }).join("\n")
  })()


  const batchPayload = `import { builder } from "@/schema/builder";
import { Prisma } from '.prisma/client'

export const BatchPayload = builder.objectType(builder.objectRef<Prisma.BatchPayload>('BatchPayload'), {
  description: 'Batch payloads from prisma.',
  fields: (t) => ({
    count: t.exposeInt('count', { description: 'Prisma Batch Payload', nullable: false }),
  }),
});
  `

  const objectsSrc = `${exportedModels}\n\n${batchPayload}`
  replaceAndWriteFileSafely(configs, 'crud.objects')(objectsSrc, `${dirname}/objects.ts`)
}

/**
 * This generates:
 * - All content inside ./src/schema/User/...
 * - ./src/schema/objects.ts
 */
export default function generateCrud(dmmf: DMMF.Document, configs: Configs) {
  // Gerating User, Comment, ...
  const gen = dmmf.datamodel.models.map((model) => {
    return modelGenerate({ configs, dmmf, model: model.name })
  })

  // Generating objects.ts
  writeObjects(dmmf, configs)

  return gen
}
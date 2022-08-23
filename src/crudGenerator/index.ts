import { DMMF } from '@prisma/generator-helper';
import { Config } from '../utils/config';
import { replaceAndWriteFileSafely } from '../utils/filesystem';
import modelGenerate from './generator';

/**
 * - Export all the models
 * - Export Prisma Objects (BatchPayload)
 */
const writeObjects = (dmmf: DMMF.Document, config: Config) => {
  const dirname = config.crud?.outputDir || './generated';
  const exportedModels = dmmf.datamodel.models
    .map((model) => `export * from './${model.name}'`)
    .join('\n');
  // TODO import builder should come from the config
  const batchPayload = `import { builder } from "@/schema/builder";
import { Prisma } from '.prisma/client'

export const BatchPayload = builder.objectType(builder.objectRef<Prisma.BatchPayload>('BatchPayload'), {
  description: 'Batch payloads from prisma.',
  fields: (t) => ({
    count: t.exposeInt('count', { description: 'Prisma Batch Payload', nullable: false }),
  }),
});
  `;

  const objectsSrc = `${exportedModels}\n\n${batchPayload}`;
  replaceAndWriteFileSafely(config, 'crud.objects')(objectsSrc, `${dirname}/objects.ts`);
};

/**
 * This generates:
 * - All content inside ./src/schema/User/...
 * - ./src/schema/objects.ts
 */
export async function generateCrud(dmmf: DMMF.Document, config: Config) {
  if (config.crud?.disabled) return;

  // Gerating User, Comment, ...
  const gen = dmmf.datamodel.models.map((model) => {
    return modelGenerate({ config, dmmf, model: model.name });
  });

  // Generating objects.ts
  writeObjects(dmmf, config);

  return gen;
}

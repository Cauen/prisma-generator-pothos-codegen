import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../../utils/config';
import { mutations as MutationTemplates } from '../templates/mutation';
import { queries as QueryTemplates } from '../templates/query';
import { writeIndex, writeObject, writeResolvers } from './parts';

export async function generateModel(
  config: ConfigInternal,
  dmmf: DMMF.Document,
  modelName: string,
): Promise<void> {
  const model = dmmf.datamodel.models.find((m) => m.name === modelName);
  if (!model) return;

  await writeObject(config, model);
  const queries = await writeResolvers(config, model, 'queries', QueryTemplates);
  const mutations = await writeResolvers(config, model, 'mutations', MutationTemplates);
  await writeIndex(config, model, {
    writeQueries: Boolean(queries.length),
    writeMutations: Boolean(mutations.length),
  });
}

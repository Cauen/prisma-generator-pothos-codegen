import { ConfigInternal } from '../../utils/config';
import { mutations as MutationTemplates } from '../templates/mutation';
import { queries as QueryTemplates } from '../templates/query';
import { GeneratedResolver, writeIndex, writeObject, writeResolvers } from './parts';
import type { DMMF } from '@prisma/generator-helper';

/**
 * @returns List of generated resolvers
 */
export async function generateModel(
  config: ConfigInternal,
  dmmf: DMMF.Document,
  modelName: string,
): Promise<{ resolvers: GeneratedResolver[]; index: Awaited<ReturnType<typeof writeIndex>> }> {
  const model = dmmf.datamodel.models.find((m) => m.name === modelName);
  if (!model) return { index: [], resolvers: [] };

  await writeObject(config, model);
  const queries = await writeResolvers(config, model, 'queries', QueryTemplates);
  const mutations = await writeResolvers(config, model, 'mutations', MutationTemplates);
  const index = await writeIndex(config, model, { queries, mutations });

  return { resolvers: [...queries, ...mutations], index };
}

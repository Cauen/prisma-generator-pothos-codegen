import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../../utils/config';
import * as MutationTemplates from '../templates/mutation';
import * as QueryTemplates from '../templates/query';
import { writeIndex, writeObject, writeResolvers } from './parts';

export async function generateModel(
  config: ConfigInternal,
  dmmf: DMMF.Document,
  modelName: string,
): Promise<void> {
  const model = dmmf.datamodel.models.find((m) => m.name === modelName);
  if (!model) return;

  await writeIndex(config, model);
  await writeObject(config, model);
  await writeResolvers(config, model, 'queries', QueryTemplates);
  await writeResolvers(config, model, 'mutations', MutationTemplates);
}

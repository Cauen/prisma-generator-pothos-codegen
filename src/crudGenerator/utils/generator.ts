import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../../utils/config';
import * as MutationTemplates from '../templates/mutation';
import * as QueryTemplates from '../templates/query';
import { writeIndex, writeObject, writeResolvers } from './parts';

export function generateModel(
  config: ConfigInternal,
  dmmf: DMMF.Document,
  modelName: string,
): void {
  const model = dmmf.datamodel.models.find((m) => m.name === modelName);
  if (!model) return;

  writeIndex(config, model);
  writeObject(config, model);
  writeResolvers(config, model, 'queries', QueryTemplates);
  writeResolvers(config, model, 'mutations', MutationTemplates);
}

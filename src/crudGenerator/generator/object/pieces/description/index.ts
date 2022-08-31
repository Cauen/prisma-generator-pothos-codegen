import { DMMF } from '@prisma/generator-helper';

export const getDescriptionSrc = (foundModel: DMMF.Model) => {
  const description = foundModel.documentation || undefined;
  return description ? `"${description}"` : 'undefined';
};

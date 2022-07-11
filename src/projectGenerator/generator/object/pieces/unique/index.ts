import { DMMF } from '@prisma/generator-helper';

export const getFindUniqueSrc = (foundModel: DMMF.Model) => {
  const idField = foundModel.fields.find(f => f.isId)

  if (!idField) return "$1"
  return `({ ${idField.name} }) => ({ ${idField.name} })`
}
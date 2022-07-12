import { DMMF } from '@prisma/generator-helper';

export const getFindUniqueSrc = (foundModel: DMMF.Model) => {
  const idField = foundModel.fields.find(f => f.isId)

  if (idField) {
    return `({ ${idField.name} }) => ({ ${idField.name} })`
  }

  if (foundModel.primaryKey?.fields) {
    return `(fields) => ({ compositeID: fields })`
  }

  // props = { name: string } for example
  return `(props) => ({ ...props  })`
}
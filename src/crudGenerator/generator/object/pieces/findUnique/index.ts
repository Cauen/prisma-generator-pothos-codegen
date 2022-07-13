import { DMMF } from '@prisma/generator-helper';

const getCompositeName = (fields: string[]) => {
  return fields.map(f => (f)).join('_')
}

export const getFindUniqueSrc = (foundModel: DMMF.Model) => {
  const idField = foundModel.fields.find(f => f.isId)

  if (idField) {
    return `({ ${idField.name} }) => ({ ${idField.name} })`
  }

  if (foundModel.primaryKey?.fields) {
    return `(fields) => ({ ${foundModel.primaryKey.name || getCompositeName(foundModel.primaryKey.fields)}: fields })`
  }

  // props with unique = { name: string } for example
  return `(props) => ({ ...props  })`
}
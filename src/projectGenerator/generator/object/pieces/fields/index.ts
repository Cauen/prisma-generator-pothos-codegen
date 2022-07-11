import { DMMF } from '@prisma/generator-helper';

export const getFieldsSrc = (foundModel: DMMF.Model) => {
  const fields = foundModel.fields.map(field => {
    const fieldType = field.isId ? 'ID' : field.type
    return `${field.name}: t.expose${fieldType}('${field.name}'),`
  }).join('\n    ')
  return fields
}
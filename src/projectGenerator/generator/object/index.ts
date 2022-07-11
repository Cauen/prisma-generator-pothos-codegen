import { parseTemplateGlobal } from "@/projectGenerator/utils/parseTemplateGlobal"
import { ModelGenerateOptions } from ".."

const template = `
// importing builder + inputs
#{imports}

export const #{model} = builder.prismaObject('#{model}', {
  description: #{description}, // defined inside schema as comment
  findUnique: #{findUnique},
  fields: (t) => ({
    #{fields}
  }),
});
`

export const getObjectSrc = (options: ModelGenerateOptions) => {
  const { dmmf, model } = options
  const globalParsed = parseTemplateGlobal(template)
  const parsed1 = globalParsed.replace(/#{model}/g, options.model)

  const findUniqueSrc = (() => {
    const foundModel = dmmf.datamodel.models.find(m => m.name === model)
    const idField = foundModel?.fields.find(f => f.isId)

    if (!idField) return undefined
    return `({ ${idField.name} }) => ({ ${idField.name} })`
  })()
  const parsed2 = findUniqueSrc ? parsed1.replace(/#{findUnique}/g, findUniqueSrc) : parsed1

  const fieldsSrc = (() => { 
    const foundModel = dmmf.datamodel.models.find(m => m.name === model)
    if (!foundModel) return undefined
    const fields = foundModel.fields.map(field => {
      const fieldType = field.isId ? 'ID' : field.type
      return `${field.name}: t.expose${fieldType}('${field.name}'),`
    }).join('\n    ')
    return fields
  })()
  const parsed3 = fieldsSrc ? parsed2.replace(/#{fields}/g, fieldsSrc) : parsed2

  const descriptionSrc = (() => {
    const foundModel = dmmf.datamodel.models.find(m => m.name === model)
    if (!foundModel) return undefined
    const description = foundModel.documentation || undefined
    return description ? `"${description}"` : 'undefined'
  })()
  const parsed4 = descriptionSrc ? parsed3.replace(/#{description}/g, descriptionSrc) : parsed3

  return parsed4
}
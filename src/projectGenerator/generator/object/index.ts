import { parseTemplateGlobal } from "../../../projectGenerator/utils/parseTemplateGlobal"
import { ModelGenerateOptions } from ".."
import { getDescriptionSrc } from "./pieces/description"
import { getFieldsSrc } from "./pieces/fields"
import { getFindUniqueSrc } from "./pieces/findUnique"

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

export const getObjectSrc = (options: ModelGenerateOptions): string => {
  const { dmmf, model } = options
  const dmmfModel = dmmf.datamodel.models.find(m => m.name === model)
  if (!dmmfModel) return template

  const globalParsed = parseTemplateGlobal(template)

  const uniqueSrc = getFindUniqueSrc(dmmfModel)
  const fieldsSrc = getFieldsSrc(dmmfModel)
  const descriptionSrc = getDescriptionSrc(dmmfModel)

  const parsed = globalParsed
    .replace(/#{model}/g, model)
    .replace(/#{findUnique}/g, uniqueSrc)
    .replace(/#{fields}/g, fieldsSrc)
    .replace(/#{description}/g, descriptionSrc)

  return parsed
}
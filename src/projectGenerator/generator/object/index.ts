import { parseTemplateGlobal } from "@/projectGenerator/utils/parseTemplateGlobal"
import { ModelGenerateOptions } from ".."

const template = `
// importing builder + inputs
#{imports}

export const #{model} = builder.prismaObject('#{model}', {
  #{findUnique}
  #{fields}
  #{description} // defined inside schema as comment
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
    return `findUnique: ({ ${idField.name} }) => ({ ${idField.name} }),`
  })()
  const parsed2 = findUniqueSrc ? parsed1.replace(/#{findUnique}/g, findUniqueSrc) : parsed1
  return parsed2
}
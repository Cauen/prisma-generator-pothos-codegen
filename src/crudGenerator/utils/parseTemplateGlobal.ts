import { ModelGenerateOptions } from "../generator"

export const parseTemplateGlobal = (template: string, options: ModelGenerateOptions) => {
  return template.replace(/#{imports}/g, `${options.configs.crudBuilderImporter || `import { builder } from "../../schema/builder";`}
${options.configs.crudInputsImporter || `import * as Inputs from "@/generated/inputs";`}`)
}
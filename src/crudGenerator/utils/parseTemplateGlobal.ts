import { ModelGenerateOptions } from "../generator"

export const parseTemplateGlobal = (template: string, options: ModelGenerateOptions) => {
  return template.replace(/#{imports}/g, `${options.configs.crud?.builderImporter || `import { builder } from "../../schema/builder";`}
${options.configs.crud?.inputsImporter || `import * as Inputs from "@/generated/inputs";`}`)
}
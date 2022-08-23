import { ModelGenerateOptions } from "../generator"

export const parseTemplateGlobal = (template: string, options: ModelGenerateOptions) => {
  // TODO verify inputsImporter 
  // return template.replace(/#{imports}/g, `${options.config.crud?.builderImporter || `import { builder } from "../../schema/builder";`}
  // ${options.config.crud?.inputsImporter || `import * as Inputs from "@/generated/inputs";`}`)
  return template.replace(/#{imports}/g, `${options.config.crud?.builderImporter || `import { builder } from "../../schema/builder";`}
  import * as Inputs from "${options.config.inputs?.outputFilePath || '@/generated/inputs'}";`)
}
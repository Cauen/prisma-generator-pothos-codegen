const getImports = () => {
  return `import { builder } from "../../schema/builder";
import * as Inputs from "@/generated/inputs";`
}

export const parseTemplateGlobal = (template: string) => {
  return template.replace(/#{imports}/g, getImports())
}
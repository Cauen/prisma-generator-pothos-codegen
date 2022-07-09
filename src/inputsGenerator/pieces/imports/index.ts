import { Configs } from "@/generator"

export const getImports = (configs: Configs) => {
  return `${configs.inputsPrismaImporter || `import { Prisma } from ".prisma/client"`}
  ${configs.inputsBuilderImporter || `import { builder } from "./builder"`}`
}
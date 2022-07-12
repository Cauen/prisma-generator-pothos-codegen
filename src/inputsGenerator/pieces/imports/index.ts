import { Configs } from "../../../generator";

export const getImports = (configs: Configs) => {
  return `${configs.inputs?.prismaImporter || `import { Prisma } from ".prisma/client"`}
${configs.inputs?.builderImporter || `import { builder } from "./builder"`}`
}
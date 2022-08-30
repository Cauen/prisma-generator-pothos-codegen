import path from 'path';
import { getDMMF, getSchemaSync } from '@prisma/internals';

const simplePrismaSchema = getSchemaSync(path.join(__dirname, './simpleSchema.prisma'));
const complexPrismaSchema = getSchemaSync(path.join(__dirname, './complexSchema.prisma'));

export const getSampleDMMF = async (type: 'complex' | 'simple') => {
  return getDMMF({
    datamodel: type === 'complex' ? complexPrismaSchema : simplePrismaSchema,
  });
};

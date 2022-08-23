import { DMMF } from '@prisma/generator-helper';

export const getEnums = (dmmf: DMMF.Document) => {
  const enums = [
    ...dmmf.schema.enumTypes.prisma,
    ...dmmf.datamodel.enums.map((el) => ({ ...el, values: el.values.map((el) => el.name) })),
  ];
  const enumStrings = enums.map(
    (el) => `export const ${el.name} = builder.enumType('${el.name}', {
  values: ${JSON.stringify(el.values)} as const,
);`,
  );
  return enumStrings.join('\n');
};

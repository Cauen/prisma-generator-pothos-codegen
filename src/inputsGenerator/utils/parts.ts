import { getBuilderCalculatedImport } from '../../crudGenerator/utils/parts';
import { ConfigInternal } from '../../utils/config';
import { useTemplate } from '../../utils/template';
import { getUsedScalars } from './dmmf';
import { getInputFieldsString } from './inputFields';
import * as T from './templates';
import type { DMMF } from '@prisma/generator-helper';

export const getEnums = (dmmf: DMMF.Document) => {
  return [
    ...dmmf.schema.enumTypes.prisma,
    ...dmmf.datamodel.enums.map((el) => ({ ...el, values: el.values.map(({ name }) => name) })),
  ]
    .map((el) =>
      useTemplate(T.enumTemplate, { enumName: el.name, values: JSON.stringify(el.values) }),
    )
    .join('\n\n');
};

export const getImports = (config: ConfigInternal, fileLocation: string) =>
  // Add ts-nocheck command to get rid of "Excessive stack depth comparing types" error.
  [
    '// @ts-nocheck',
    config.inputs.prismaImporter,
    getBuilderCalculatedImport({ config, fileLocation }),
  ].join('\n');

export const getScalars = ({ inputs: { excludeScalars } }: ConfigInternal, dmmf: DMMF.Document) => {
  const usedScalars = getUsedScalars(dmmf.schema.inputObjectTypes.prisma);
  return [
    ...(usedScalars.hasDateTime && !excludeScalars?.includes('DateTime') ? [T.dateTimeScalar] : []),
    ...(usedScalars.hasDecimal && !excludeScalars?.includes('Decimal') ? [T.decimalScalar] : []),
    ...(usedScalars.hasBytes && !excludeScalars?.includes('Bytes') ? [T.bytesScalar] : []),
    ...(usedScalars.hasJson && !excludeScalars?.includes('Json') ? [T.jsonScalar] : []),
    ...(usedScalars.hasBigInt && !excludeScalars?.includes('BigInt') ? [T.bigIntScalar] : []),
    ...(usedScalars.hasNEVER && !excludeScalars?.includes('NEVER') ? [T.neverScalar] : []),
  ].join('\n\n');
};

export const getUtil = () => `type Filters = {
  string: Prisma.StringFieldUpdateOperationsInput;
  nullableString: Prisma.NullableStringFieldUpdateOperationsInput;
  dateTime: Prisma.DateTimeFieldUpdateOperationsInput;
  nullableDateTime: Prisma.NullableDateTimeFieldUpdateOperationsInput;
  int: Prisma.IntFieldUpdateOperationsInput;
  nullableInt: Prisma.NullableIntFieldUpdateOperationsInput;
  bool: Prisma.BoolFieldUpdateOperationsInput;
  nullableBool: Prisma.NullableBoolFieldUpdateOperationsInput;
  bigInt: Prisma.BigIntFieldUpdateOperationsInput;
  nullableBigInt: Prisma.NullableBigIntFieldUpdateOperationsInput;
  bytes: Prisma.BytesFieldUpdateOperationsInput;
  nullableBytes: Prisma.NullableBytesFieldUpdateOperationsInput;
  float: Prisma.FloatFieldUpdateOperationsInput;
  nullableFloat: Prisma.NullableFloatFieldUpdateOperationsInput;
  decimal: Prisma.DecimalFieldUpdateOperationsInput;
  nullableDecimal: Prisma.NullableDecimalFieldUpdateOperationsInput;
};

type ApplyFilters<InputField> = {
  [F in keyof Filters]: 0 extends 1 & Filters[F]
    ? never
    : Filters[F] extends InputField
    ? Filters[F]
    : never;
}[keyof Filters];

type PrismaUpdateOperationsInputFilter<T extends object> = {
  [K in keyof T]: [ApplyFilters<T[K]>] extends [never] ? T[K] : ApplyFilters<T[K]>
};`;

const makeInputs = (
  config: ConfigInternal,
  dmmf: DMMF.Document,
  inputNames: Record<string, DMMF.Model>,
) =>
  dmmf.schema.inputObjectTypes.prisma
    // Filter out irrelevant input types
    .filter(
      (input) =>
        ['Filter', 'Compound', 'UpdateOperations'].some((allowedKeyword) =>
          input.name.includes(allowedKeyword),
        ) || Object.keys(inputNames).some((inputName) => input.name.startsWith(inputName)),
    )
    .map((input) => {
      const model = Object.entries(inputNames).find(([inputName]) =>
        input.name.startsWith(inputName),
      );

      return useTemplate(T.inputTemplate, {
        inputName: input.name.replace('Unchecked', ''),
        prismaInputName: input.name,
        fields: getInputFieldsString(input, model?.[1], config).replaceAll('Unchecked', ''),
      });
    })
    .join('\n\n');

export const getInputs = (config: ConfigInternal, dmmf: DMMF.Document) => {
  if (config.inputs.simple)
    return makeInputs(
      config,
      dmmf,
      // Map from possible input names to their related model
      dmmf.datamodel.models.reduce(
        (prev, curr) => {
          return {
            ...prev,
            [`${curr.name}UncheckedCreateInput`]: curr,
            [`${curr.name}CreateNestedManyWithout`]: curr,
            [`${curr.name}UncheckedUpdateInput`]: curr,
            [`${curr.name}UpdateManyMutationInput`]: curr,
            [`${curr.name}UpdateManyWithout`]: curr,
            [`${curr.name}OrderByWithRelationInput`]: curr,
            [`${curr.name}OrderByRelationAggregateInput`]: curr,
            [`${curr.name}Where`]: curr,
          };
        },
        {} as Record<string, DMMF.Model>,
      ),
    );
  else
    return makeInputs(
      config,
      dmmf,
      // Map from possible input names to their related model
      dmmf.datamodel.models.reduce(
        (prev, curr) => {
          return {
            ...prev,
            ...[
              'Where',
              'ScalarWhere',
              'Create',
              'Update',
              'Upsert',
              'OrderBy',
              'CountOrderBy',
              'MaxOrderBy',
              'MinOrderBy',
              'AvgOrderBy',
              'SumOrderBy',
            ].reduce(
              (prev, keyword) => ({
                ...prev,
                [`${curr.name}${keyword}`]: curr,
              }),
              {},
            ),
          };
        },
        {} as Record<string, DMMF.Model>,
      ),
    );
};

import { DMMF } from '@prisma/generator-helper';
import { ConfigInternal } from '../../utils/config';
import { useTemplate } from '../../utils/template';
import { getUsedScalars } from './dmmf';
import { getFieldsString } from './inputFields';
import * as T from './templates';

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

export const getImports = (config: ConfigInternal) =>
  [config.inputs.prismaImporter, config.inputs.builderImporter].join('\n');

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

export const getInputs = (dmmf: DMMF.Document) => {
  return (
    dmmf.schema.inputObjectTypes.prisma
      // TODO make the generation of unchecked inputs configurable?
      // "Unchecked" inputs (that can be created using just an ID) are filtered out
      .filter(({ name }) => !name.includes('Unchecked'))
      .map((input) => {
        const model = dmmf.datamodel.models.find(({ name }) =>
          // TODO check if all of these are necessary + if this is exhaustive
          [
            'Where',
            'OrderBy',
            'ScalarWhere',
            'Update',
            'Create',
            'Upsert',
            'AvgOrderBy',
            'MaxOrderBy',
            'MinOrderBy',
            'SumOrderBy',
            'CountOrderBy',
            'Filter',
            'RelationFilter',
            'ListRelationFilter',
          ]
            .map((keyword) => name + keyword)
            .some((modelName) => input.name.startsWith(modelName)),
        );
        return useTemplate(T.inputTemplate, {
          inputName: input.name,
          fields: getFieldsString(input, model),
        });
      })
      .join('\n\n')
  );
};

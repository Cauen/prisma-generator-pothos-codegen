import { getSampleDMMF } from '../../tests/getPrismaSchema';
import { getUsedScalars, getMainInput } from './dmmf';
import type { DMMF } from '@prisma/generator-helper';

describe('getUsedScalars', () => {
  test('should return all complex scalars', async () => {
    const dmmf = await getSampleDMMF('complex');
    const used = getUsedScalars(dmmf.schema.inputObjectTypes.prisma);
    expect(used.hasBigInt).toBe(true);
    expect(used.hasDateTime).toBe(true);
    expect(used.hasBigInt).toBe(true);
    expect(used.hasDecimal).toBe(true);
    expect(used.hasNEVER).toBe(true);
    expect(used.hasJson).toBe(true);
  });

  test('should return only simple scalars', async () => {
    const dmmf = await getSampleDMMF('simple');
    const used = getUsedScalars(dmmf.schema.inputObjectTypes.prisma);
    expect(used.hasBigInt).toBe(false);
    expect(used.hasDateTime).toBe(true);
    expect(used.hasBigInt).toBe(false);
    expect(used.hasDecimal).toBe(false);
    expect(used.hasNEVER).toBe(false);
    expect(used.hasJson).toBe(false);
  });
});

describe('getMainInput', () => {
  test('should priorize list', () => {
    // prisma.user.findFirst({ where: { OR: { name: "Emanuel" } } })
    // prisma.user.findFirst({ where: { OR: [{ name: "Emanuel" }] } })
    const list: DMMF.InputTypeRef[] = [
      {
        type: 'UserWhereInput',
        namespace: 'prisma',
        location: 'inputObjectTypes',
        isList: false,
      },
      {
        type: 'UserWhereInput',
        namespace: 'prisma',
        location: 'inputObjectTypes',
        isList: true,
      },
    ];
    // prisma.user.findFirst({ where: { OR: [{ name: "Emanuel" }] } })
    expect(getMainInput().priorizeList(list)?.isList).toBe(true);
  });

  test('should priorize not scalar', () => {
    // prisma.user.findFirst({ where: { OR: { name: "Emanuel" } } })
    // prisma.user.findFirst({ where: { OR: [{ name: "Emanuel" }] } })
    const list: DMMF.InputTypeRef[] = [
      {
        type: 'IntFilter',
        namespace: 'prisma',
        location: 'inputObjectTypes',
        isList: false,
      },
      {
        type: 'Int',
        location: 'scalar',
        isList: false,
      },
    ];
    // prisma.user.findFirst({ where: { OR: [{ name: "Emanuel" }] } })
    expect(getMainInput().priorizeNotScalar(list)?.namespace).toBe('prisma');
    const list2: DMMF.InputTypeRef[] = [
      {
        type: 'DateTimeNullableWithAggregatesFilter',
        namespace: 'prisma',
        location: 'inputObjectTypes',
        isList: false,
      },
      {
        type: 'DateTime',
        location: 'scalar',
        isList: false,
      },
      {
        type: 'Null',
        location: 'scalar',
        isList: false,
      },
    ];
    // prisma.user.findFirst({ where: { OR: [{ name: "Emanuel" }] } })
    expect(getMainInput().priorizeNotScalar(list2)?.namespace).toBe('prisma');
  });

  test('should priorize json', () => {
    const list: DMMF.InputTypeRef[] = [
      {
        type: 'Json',
        location: 'scalar',
        isList: false,
      },
      {
        type: 'Null',
        location: 'scalar',
        isList: false,
      },
    ];
    expect(getMainInput().priorizeJson(list)?.type).toBe('Json');
    const list2: DMMF.InputTypeRef[] = [
      {
        type: 'NullableJsonNullValueInput',
        namespace: 'prisma',
        location: 'enumTypes',
        isList: false,
      },
      {
        type: 'Json',
        location: 'scalar',
        isList: false,
      },
    ];
    expect(getMainInput().priorizeJson(list2)?.type).toBe('Json');
  });

  test('should priorize WhereInput over RelationFilter', () => {
    const list: DMMF.InputTypeRef[] = [
      {
        type: 'ProfileRelationFilter',
        namespace: 'prisma',
        location: 'inputObjectTypes',
        isList: false,
      },
      {
        type: 'ProfileWhereInput',
        namespace: 'prisma',
        location: 'inputObjectTypes',
        isList: false,
      },
      {
        type: 'Null',
        location: 'scalar',
        isList: false,
      },
    ];
    expect(getMainInput().priorizeWhereInput(list)?.type).toBe('ProfileWhereInput');
    expect(getMainInput().run(list)?.type).toBe('ProfileWhereInput');
  });

  test('in update, should priorize "set" instead of directly set', () => {
    const list: DMMF.InputTypeRef[] = [
      {
        type: 'PAYMENT_METHOD',
        namespace: 'model',
        location: 'enumTypes',
        isList: false,
      },
      {
        type: 'EnumPAYMENT_METHODFieldUpdateOperationsInput',
        namespace: 'prisma',
        location: 'inputObjectTypes',
        isList: false,
      },
    ];
    expect(getMainInput().priorizeSetUpdateAlternative(list)?.type).toBe(
      'EnumPAYMENT_METHODFieldUpdateOperationsInput',
    );
    expect(getMainInput().run(list)?.type).toBe('EnumPAYMENT_METHODFieldUpdateOperationsInput');
  });
});

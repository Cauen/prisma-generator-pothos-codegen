import { getMainInput, getUsedScalars, InputType } from './dmmf'
import * as PrismaSDK from '@prisma/sdk'
import { fakePrismaSchema } from '@/tests/fakePrismaSchema'
import { fakePrismaSchemaSimple } from '@/tests/fakePrismaSchemaSimple'

describe('getMainInput', () => {
  test('should priorize list', () => {
    // prisma.user.findFirst({ where: { OR: { name: "Emanuel" } } })
    // prisma.user.findFirst({ where: { OR: [{ name: "Emanuel" }] } })
    const list: InputType[] = [
      {
        type: 'UserWhereInput',
        namespace: 'prisma',
        location: 'inputObjectTypes',
        isList: false
      },
      {
        type: 'UserWhereInput',
        namespace: 'prisma',
        location: 'inputObjectTypes',
        isList: true
      }
    ]
    // prisma.user.findFirst({ where: { OR: [{ name: "Emanuel" }] } })
    expect(getMainInput().priorizeList(list)?.isList).toBe(true)
  })

  test('should priorize not scalar', () => {
    // prisma.user.findFirst({ where: { OR: { name: "Emanuel" } } })
    // prisma.user.findFirst({ where: { OR: [{ name: "Emanuel" }] } })
    const list: InputType[] = [
      {
        type: "IntFilter",
        namespace: "prisma",
        location: "inputObjectTypes",
        isList: false
      },
      {
        type: "Int",
        location: "scalar",
        isList: false
      }
    ]
    // prisma.user.findFirst({ where: { OR: [{ name: "Emanuel" }] } })
    expect(getMainInput().priorizeNotScalar(list)?.namespace).toBe('prisma')
    const list2: InputType[] = [
      {
        type: "DateTimeNullableWithAggregatesFilter",
        namespace: "prisma",
        location: "inputObjectTypes",
        isList: false
      },
      {
        type: "DateTime",
        location: "scalar",
        isList: false
      },
      {
        type: "Null",
        location: "scalar",
        isList: false
      }
    ]
    // prisma.user.findFirst({ where: { OR: [{ name: "Emanuel" }] } })
    expect(getMainInput().priorizeNotScalar(list2)?.namespace).toBe('prisma')
  })

  test('should priorize json', () => {
    const list: InputType[] = [
      {
        type: "Json",
        location: "scalar",
        isList: false
      },
      {
        type: "Null",
        location: "scalar",
        isList: false
      }
    ]
    expect(getMainInput().priorizeJson(list)?.type).toBe('Json')
    const list2: InputType[] = [
      {
        type: "NullableJsonNullValueInput",
        namespace: "prisma",
        location: "enumTypes",
        isList: false
      },
      {
        type: "Json",
        location: "scalar",
        isList: false
      }
    ]
    expect(getMainInput().priorizeJson(list2)?.type).toBe('Json')
  })
})

describe('getUsedScalars', () => {
  test('should return all complex scalars', async () => {
    const dmmf = await PrismaSDK.getDMMF({
      datamodel: fakePrismaSchema,
    })
    const used = getUsedScalars(dmmf.schema.inputObjectTypes.prisma)
    expect(used.hasBigInt).toBe(true)
    expect(used.hasDateTime).toBe(true)
    expect(used.hasBigInt).toBe(true)
    expect(used.hasDecimal).toBe(true)
    expect(used.hasNEVER).toBe(true)
    expect(used.hasJson).toBe(true)
  })

  test('should return only simple scalars', async () => {
    const dmmf = await PrismaSDK.getDMMF({
      datamodel: fakePrismaSchemaSimple,
    })
    const used = getUsedScalars(dmmf.schema.inputObjectTypes.prisma)
    expect(used.hasBigInt).toBe(false)
    expect(used.hasDateTime).toBe(true)
    expect(used.hasBigInt).toBe(false)
    expect(used.hasDecimal).toBe(false)
    expect(used.hasNEVER).toBe(false)
    expect(used.hasJson).toBe(false)
  })
})
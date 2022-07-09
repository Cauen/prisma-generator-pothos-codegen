import { getMainInput, InputType } from './dmmf'

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
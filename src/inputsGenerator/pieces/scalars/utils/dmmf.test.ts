import { getSampleDMMF } from '../../../../tests/getPrismaSchema'
import { getUsedScalars } from './dmmf'

describe('getUsedScalars', () => {
  test('should return all complex scalars', async () => {
    const dmmf = await getSampleDMMF('complex')
    const used = getUsedScalars(dmmf.schema.inputObjectTypes.prisma)
    expect(used.hasBigInt).toBe(true)
    expect(used.hasDateTime).toBe(true)
    expect(used.hasBigInt).toBe(true)
    expect(used.hasDecimal).toBe(true)
    expect(used.hasNEVER).toBe(true)
    expect(used.hasJson).toBe(true)
  })

  test('should return only simple scalars', async () => {
    const dmmf = await getSampleDMMF('simple')
    const used = getUsedScalars(dmmf.schema.inputObjectTypes.prisma)
    expect(used.hasBigInt).toBe(false)
    expect(used.hasDateTime).toBe(true)
    expect(used.hasBigInt).toBe(false)
    expect(used.hasDecimal).toBe(false)
    expect(used.hasNEVER).toBe(false)
    expect(used.hasJson).toBe(false)
  })
})
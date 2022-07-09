import { getSampleDMMF } from "../../../tests/getPrismaSchema"
import { getScalars } from './index'

describe('getScalars', () => {
  test('should ignore excluded', async () => {
    const dmmf = await getSampleDMMF('complex')
    const includedScalars = getScalars({ dmmf, configs: {} })
    expect(includedScalars.includes(`builder.scalarType('DateTime'`)).toBe(true)
    const scalars = getScalars({ dmmf, configs: { excludeScalars: ['DateTime'] } })
    expect(scalars.includes(`builder.scalarType('DateTime'`)).toBe(false)
  })
})
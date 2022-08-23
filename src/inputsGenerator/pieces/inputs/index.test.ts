import { getSampleDMMF } from "../../../tests/getPrismaSchema"
import { getInputs } from './index'

describe('getInputs', () => {
  test('should ignore excluded', async () => {
    const dmmf = await getSampleDMMF('complex')
    const builtString = `export const UserCreateInput = builder.inputRef<Prisma.UserCreateInput>('UserCreateInput').implement({`

    const includedInputs = getInputs({ dmmf, config: {} })
    expect(includedInputs.includes(builtString)).toBe(true)
    const scalars = getInputs({ dmmf, config: { inputs: { excludeInputs: ['UserCreateInput'] } } })
    expect(scalars.includes(builtString)).toBe(false)
  })
})
import { escapeQuotesAndMultilineSupport } from '../../utils/string'
import { cleanifyDocumentation } from './objectFields'

describe('objectFields', () => {
  it('cleanifyDocumentation', () => {
    expect(cleanifyDocumentation('line 1\nline2\n@Pothos.omit()')).toBe('line 1\nline2')
    expect(cleanifyDocumentation('@Pothos.omit(create, update) createdAt description')).toBe('createdAt description')
  })

  it('convertToMultilineString + cleanifyDocumentation', () => {
    expect(escapeQuotesAndMultilineSupport(cleanifyDocumentation('line 1\nline2\n@Pothos.omit()'))).toBe(
      '`line 1\nline2`',
    )
    expect(escapeQuotesAndMultilineSupport(cleanifyDocumentation(''))).toBe(undefined)
    expect(escapeQuotesAndMultilineSupport(cleanifyDocumentation('@Pothos.omit(create, update)  '))).toBe(undefined)
  })
})

export const firstLetterUpperCase = (s: string) => s[0]?.toUpperCase() + s.slice(1)

export const firstLetterLowerCase = (s: string) => s[0]?.toLowerCase() + s.slice(1)

export const getCompositeName = (fields: readonly string[]) => fields.map((f) => f).join('_')

export const escapeQuotesAndMultilineSupport = (input: string | undefined): string | undefined => {
  if (!input) return undefined
  const withScapedQuotes = input.replace(/['"`´]/g, '\\$&')
  const isMultiline = withScapedQuotes.includes('\n')
  return isMultiline ? `\`${withScapedQuotes}\`` : `'${withScapedQuotes}'`
}

const validOptions = ['create', 'update', 'where', 'orderBy'] as const
type Omit = (typeof validOptions)[number]
type OmitType = 'all' | Omit[]

export function parseComment(comment: string): OmitType | null {
  const omitRegex = /@Pothos\.omit\(([^)]*)\)/
  const matches = comment.match(omitRegex)

  if (!matches) {
    return null
  }

  const omitValues = matches[1]
    ?.split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  if (!omitValues) return null

  if (omitValues.length === 0) {
    return 'all'
  }

  const hasUnrecognized = omitValues.some((el) => !validOptions.includes(el as Omit))
  if (hasUnrecognized) return null

  return omitValues as Omit[]
}

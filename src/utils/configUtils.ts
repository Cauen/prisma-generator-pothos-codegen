import { ConfigInternal } from './config'

export function getConfigCrudUnderscore(config: ConfigInternal) {
  if (config.crud.underscoreBetweenObjectVariableNames) return '_'
  return ''
}

import { PathLike } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { env } from '../env'
import { ConfigInternal } from './config'
import { Replacer, ReplacerSection } from './replacer'

export const debugLog = async (value: string, timestamp = true) => {
  if (!env.isTesting) return
  await fs.appendFile('log.txt', `${timestamp ? `${new Date().toISOString()}: ` : ''}${JSON.stringify(value)},\n`)
}

export const deleteFolder = (path: PathLike) => {
  return fs.rm(path, { recursive: true, force: true })
}

/** Replace content before writing to file using the replacers set in the config file */
export const writeFile = async (
  config: ConfigInternal,
  section: ReplacerSection,
  content: string,
  location: string,
): Promise<void> => {
  await debugLog(`Writing to ${location}`)

  const replace = (str: string): string =>
    [
      config.global.replacer,
      ...(section === 'inputs' ? [config.inputs.replacer as unknown as Replacer] : []),
      ...(section?.includes('crud') ? [config.crud.replacer as unknown as Replacer] : []),
    ].reduce((el, replacer) => replacer(el, section), str)

  try {
    const dir = path.dirname(location)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(location, replace(content), { flag: 'w' })
  } catch (err) {
    await debugLog(JSON.stringify(err))
  }
}

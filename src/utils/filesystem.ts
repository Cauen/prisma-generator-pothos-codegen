import { envs } from '../envs';
import fs from 'fs'
import path from 'path'
import fsExtra from 'fs-extra'

export const debugLog = (value: any, timestamp?: boolean) => {
  if (!envs.isTesting) return
  fs.appendFile('log.txt', `${timestamp ? `${new Date().toISOString()}: ` : ''}${JSON.stringify(value)},\n`, (err) => {
    if (err) throw err;
  })
}

export const writeFileSafely = async (content: string, writeLocation: string, rewrite = true) => {
  debugLog(`Writing to ${writeLocation}`)

  try {
    await fsExtra.ensureDir(path.dirname(writeLocation))
    const ensured = fs.existsSync(writeLocation)
    if (ensured && !rewrite) return content
    await fsExtra.writeFile(writeLocation, content)
    return content
  } catch (err) {
    debugLog(JSON.stringify(err))
    return content
  }
}

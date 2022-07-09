import { existsSync, mkdirSync, mkdir, writeFile, appendFile, access } from 'fs';
import * as path from 'path'
import { envs } from '../envs';

export const debugLog = (value: any, timestamp?: boolean) => {
  if (!envs.isTesting) return
  appendFile('log.txt', `${timestamp ? `${new Date().toISOString()}: ` : ''}${JSON.stringify(value)},\n`, (err) => {
    if (err) throw err;
  })
}

export const write = async (content: any, filePath = './generated/inputs.ts') => {
  const parsedContent = (typeof content === "string") ? content : JSON.stringify(content, null, 2);
  const dirname = path.dirname(filePath);
  mkdir(dirname, { recursive: true }, (err) => { if (err) throw err; })

  return new Promise<string>((resolve, reject) => {
    return writeFile(filePath, parsedContent, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}
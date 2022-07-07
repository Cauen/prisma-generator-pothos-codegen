import { existsSync, mkdirSync, mkdir, writeFile, access } from 'fs';
import * as path from 'path'

export const write = async (content: any, filePath = './generated/inputs.ts') => {
  const parsedContent = (typeof content === "string") ? content : JSON.stringify(content, null, 2);
  const dirname = path.dirname(filePath);
  mkdir(dirname, { recursive: true }, (err) => { if (err) throw err; })

  return new Promise<string>((resolve, reject) => {
    return writeFile(filePath, parsedContent, (err) => {
      if (err) {
        console.log({ err })
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}
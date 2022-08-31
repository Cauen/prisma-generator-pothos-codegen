import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import { env } from '../env';
import { ConfigInternal } from './config';
import { ReplacerPosition } from './replacer';

export const debugLog = (value: string, timestamp?: boolean) => {
  if (!env.isTesting) return;
  fs.appendFile(
    'log.txt',
    `${timestamp ? `${new Date().toISOString()}: ` : ''}${JSON.stringify(value)},\n`,
    (err) => {
      if (err) throw err;
    },
  );
};

/** Replace content before writing to file using the replacers set in the config file */
export const replaceAndWriteFileSafely = (config: ConfigInternal, position: ReplacerPosition) => {
  const replace = (str: string): string =>
    [
      config.global.replacer,
      ...(position === 'inputs' ? [config.inputs.replacer] : []),
      ...(position?.includes('crud') ? [config.crud.replacer] : []),
    ].reduce((el, replacer) => replacer(el, position), str);

  return async (content: string, writeLocation: string, rewrite = true) =>
    writeFileSafely(replace(content), writeLocation, rewrite);
};

export const writeFileSafely = async (content: string, writeLocation: string, rewrite = true) => {
  debugLog(`Writing to ${writeLocation}`);

  try {
    await fsExtra.ensureDir(path.dirname(writeLocation));
    const ensured = fs.existsSync(writeLocation);
    if (ensured && !rewrite) return content;
    fs.createWriteStream(writeLocation, { flags: 'w' }).write(content);
    return content;
  } catch (err) {
    debugLog(JSON.stringify(err));
    return content;
  }
};

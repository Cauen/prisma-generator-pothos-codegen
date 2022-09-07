import fs from 'node:fs';
import path from 'node:path';
import { env } from '../env';
import { ConfigInternal } from './config';
import { Replacer, ReplacerSection } from './replacer';

export const debugLog = (value: string, timestamp = true) => {
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
export const writeFile = async (
  config: ConfigInternal,
  section: ReplacerSection,
  content: string,
  location: string,
): Promise<void> => {
  debugLog(`Writing to ${location}`);

  const replace = (str: string): string =>
    [
      config.global.replacer,
      ...(section === 'inputs' ? [config.inputs.replacer as unknown as Replacer] : []),
      ...(section?.includes('crud') ? [config.crud.replacer as unknown as Replacer] : []),
    ].reduce((el, replacer) => replacer(el, section), str);

  try {
    const steps = location.split(path.sep);
    const dir = steps.slice(0, steps.length - 1).join(path.sep);
    fs.mkdir(dir, { recursive: true }, () => {
      fs.createWriteStream(location, { flags: 'w' }).write(replace(content));
    });
  } catch (err) {
    debugLog(JSON.stringify(err));
  }
};

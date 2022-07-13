import { envs } from "../envs";
import fs from "fs";
import path from "path";
import fsExtra from "fs-extra";
import { Configs } from "./config";

export const debugLog = (value: any, timestamp?: boolean) => {
  if (!envs.isTesting) return;
  fs.appendFile(
    "log.txt",
    `${timestamp ? `${new Date().toISOString()}: ` : ""}${JSON.stringify(
      value
    )},\n`,
    (err) => {
      if (err) throw err;
    }
  );
};


export type ReplacerPosition =
  "crud.model.object"
  | "crud.model.index"
  | "crud.model.resolver"
  | "crud.model.resolverIndex"
  | "crud.objects"
  | "inputs"
/**
 * Replace content before writing to file
 * The relacers is setten at the configs
 */
export const replaceAndWriteFileSafely = (
  configs: Configs,
  position: ReplacerPosition
) => {
  const replacer = (str: string) => {
    const defaultReplacer = (str: string) => str;
    const globalReplacer = configs.global?.replacer || defaultReplacer;
    const crudReplacer = configs.crud?.replacer || defaultReplacer;
    const inputsReplacer = configs.inputs?.replacer || defaultReplacer;
    const replacers = [
      globalReplacer,
      ...(position?.includes("crud") ? [crudReplacer] : []),
      ...(position === "inputs" ? [inputsReplacer] : []),
    ];
    return replacers.reduce((acc, replacer) => replacer(acc, position), str);
  };
  return async (content: string, writeLocation: string, rewrite = true) => {
    const replaced = replacer(content);
    return writeFileSafely(replaced, writeLocation, rewrite);
  };
};

export const writeFileSafely = async (
  content: string,
  writeLocation: string,
  rewrite = true
) => {
  debugLog(`Writing to ${writeLocation}`);

  try {
    await fsExtra.ensureDir(path.dirname(writeLocation));
    const ensured = fs.existsSync(writeLocation);
    if (ensured && !rewrite) return content;
    fs.createWriteStream(writeLocation, { flags: "w" }).write(content)
    return content;
  } catch (err) {
    debugLog(JSON.stringify(err));
    return content;
  }
};

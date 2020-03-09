import fs from "fs";
import 'reflect-metadata'
import { JavaScriptObfuscator } from "./dest/javascript-obfuscator/src/JavaScriptObfuscatorFacade";
import { ServiceIdentifiers } from "./dest/javascript-obfuscator/src/container/ServiceIdentifiers";
import { ICryptUtils } from "./dest/javascript-obfuscator/src/interfaces/utils/ICryptUtils";
import { IInversifyContainerFacade } from "./dest/javascript-obfuscator/src/interfaces/container/IInversifyContainerFacade";
import { InversifyContainerFacade } from "./dest/javascript-obfuscator/src/container/InversifyContainerFacade";

function hide(str: string, length: number, sourceCode: string, inputOptions: any): [string, string] {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();
    inversifyContainerFacade.load(sourceCode, '', inputOptions);
    return inversifyContainerFacade.get<ICryptUtils>(ServiceIdentifiers.ICryptUtils).hideString(str, length);
}

const HIDDEN_STRING_PLACEHOLDER = "HERE WILL BE MY HIDDEN STRING"; // The string we want to replace
let template = Buffer.from(fs.readFileSync("./src/template.js", "utf8")).toString();

// Hide string
const STRING_TO_HIDE = "SECRET";
let hiddenString = hide(STRING_TO_HIDE, HIDDEN_STRING_PLACEHOLDER.length * 3, template, {});
template = template.replace(HIDDEN_STRING_PLACEHOLDER, hiddenString[0]);
template = template.replace("_REGEXP_", hiddenString[1]);

// Obfuscate
template = JavaScriptObfuscator.obfuscate(template, {}).getObfuscatedCode();

// Output to ./out
fs.rmdirSync("out", {recursive: true});
fs.mkdirSync("out");
fs.copyFileSync('./src/index.html', './out/index.html');
fs.writeFileSync('./out/template.js', template);

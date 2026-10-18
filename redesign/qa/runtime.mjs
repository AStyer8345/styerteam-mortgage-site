import path from 'node:path';
import {fileURLToPath} from 'node:url';
export {parseHTML} from 'linkedom';
export const packageRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const packagePath=(...parts)=>path.join(packageRoot,...parts);

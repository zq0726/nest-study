import * as fs from 'fs';
import * as path from 'path';

export const getPackage = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'),
  );
};

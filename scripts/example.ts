import pmex from 'pmex';

import { rmSync } from 'fs';

const cwd = './example';

pmex('tsc --build --force');

rmSync(`${cwd}/yarn.lock`, { force: true });

rmSync(`${cwd}/package-lock.json`, { force: true });

rmSync(`${cwd}/node_modules/react-native-document`, { force: true, recursive: true });

pmex(`--cwd ${cwd} install`);

pmex(`--cwd ${cwd} expo start -c`);

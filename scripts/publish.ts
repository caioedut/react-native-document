import pmex from 'pmex';
import { execSync } from 'child_process';

pmex('test');

pmex('tsc --build --force');

pmex('npm version patch');

pmex('npm publish');

execSync('git push', { stdio: 'inherit' });

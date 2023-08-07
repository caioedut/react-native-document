import pmex from 'pmex';

pmex(`prettier "{scripts,lib}/**/*.{js,jsx,ts,tsx}" --check`);

pmex(`tsc --noEmit`);

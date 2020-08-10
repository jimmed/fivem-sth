const { resolve } = require('path');

module.exports = {
  projects: [
    { displayName: 'common', rootDir: resolve(__dirname, 'src/common'), preset: 'ts-jest' },
  ],
};

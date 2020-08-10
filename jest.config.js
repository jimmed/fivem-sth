const baseOptions = {
  preset: 'ts-jest',
};

module.exports = {
  projects: ['common'].map(name => ({
    ...baseOptions,
    displayName: name,
    testMatch: [`<rootDir>/src/${name}/**/*.test.ts`],
  })),
};

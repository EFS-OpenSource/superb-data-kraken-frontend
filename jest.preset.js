// eslint-disable-next-line import/no-extraneous-dependencies
const nxPreset = require('@nx/jest/preset').default;

const globalConf = {
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  collectCoverageFrom: ['/**/*.{js,jsx,ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  passWithNoTests: true,
};

module.exports = { ...nxPreset, ...globalConf };

// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  displayName: {
    name: 'BDEO TASKS',
    color: 'cyan',
  },
  maxConcurrency: 1,
  maxWorkers: 1,
  modulePaths: ['node_modules', '<rootDir>'],
  testEnvironment: 'node',
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: ['.module.ts'],
  collectCoverage: false,
  forceExit: true,
  logHeapUsage: true,
  testTimeout: 30000,
  detectOpenHandles: true,
};

export default config;

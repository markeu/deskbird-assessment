import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__test__/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__test__/'],
  coverageReporters: ['text', 'lcov'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;

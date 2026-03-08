import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: {
                jsx: 'react-jsx',
            },
        }],
    },
    testMatch: ['**/__tests__/unit/**/*.test.ts', '**/__tests__/unit/**/*.test.tsx'],
    passWithNoTests: true,
    collectCoverageFrom: [
        'lib/**/*.ts',
        'store/**/*.ts',
        '!**/*.d.ts',
    ],
};

export default config;

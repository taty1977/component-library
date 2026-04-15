module.exports = {
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        'src/components/**/*.{ts,tsx}',
        '!src/components/**/*.stories.{ts,tsx}',
        '!src/components/**/*.d.ts',
        '!src/components/**/index.ts',
    ],
    coverageReporters: ['text', 'text-summary', 'html'],
    testMatch: ['**/__tests__/**/*.{ts,tsx}', '**/?(*.)+(spec|test).{ts,tsx}'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
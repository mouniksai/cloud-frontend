const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files
    dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
    testEnvironment: 'jsdom',

    testMatch: ['**/testing/**/*.test.{js,jsx}'],
    collectCoverageFrom: [
        'app/**/*.{js,jsx}',
        'middleware.js',
        '!app/layout.js',
        '!app/globals.css',
        '!**/node_modules/**',
    ],
    coverageThreshold: {
        global: {
            branches: 10,
            functions: 10,
            lines: 10,
            statements: 10,
        },
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    verbose: true,
};

module.exports = createJestConfig(customJestConfig);

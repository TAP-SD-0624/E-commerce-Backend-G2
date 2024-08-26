module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}]
    },
    preset: 'ts-jest',
    maxWorkers: 1,
    detectOpenHandles: true
};


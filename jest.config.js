module.exports = {
  preset: 'ts-jest',
  detectOpenHandles: true,                      // Show open handles
  forceExit: true,                              // Force exit after tests
  testTimeout: 30000,                           // Give enough time for cleanup  
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  setupFilesAfterEnv: ["jest-extended/all"],    // To add extensions to jest such as toBeOneOf()
  collectCoverage: true,
  coverageDirectory: 'src/testCoverage',
  coverageReporters: ["lcov", "text", "cobertura"],
  "collectCoverageFrom": ["./src/**"],
  "coverageThreshold": {
    "global": {
      "lines": 40
    }
  },
  reporters: ["default", ["jest-md-dashboard", {
    title: "Eversports test cases results",
    outputPath: "./test/results.md"
  }]],
  //setupFilesAfterEnv: ['./test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
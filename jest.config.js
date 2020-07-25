require("module-alias/register");

module.exports = {
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/(?!@foo)",
    "src/__tests__/helper.ts",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@foo)"],
  modulePathIgnorePatterns: ["^.+\\.mock.ts?$"],
  testPathIgnorePatterns: ["src/__tests__/helper.ts"],
  collectCoverageFrom: ["src/**/*.ts"],
  coverageReporters: ["lcov", "text"],
  reporters: ["default", "jest-junit"],
};

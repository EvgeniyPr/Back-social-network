/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir: "./__tests__",
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: ".e2e.test.ts$",
};

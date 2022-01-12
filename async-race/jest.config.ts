import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: [ "src/**/*.{js,jsx,ts,tsx}" ],
    coverageDirectory: "coverage",
    rootDir: 'src',
    testEnvironment: "jsdom",
    transform: {
      "\\.[jt]sx?$": "babel-jest"
    },
    verbose: true,
  }
};

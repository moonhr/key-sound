module.exports = {
  preset: "ts-jest",
  testEnvironment: 'jsdom', // jsdom 환경을 사용하여 브라우저 API를 모방
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

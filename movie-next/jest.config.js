/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
process.env.REACT_APP_API_KEY = 'mock_api_key';

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(tsx?)$': 'babel-jest',
    '^.+\\.svg$': 'jest-transform-stub',
    // "\\.[jt]sx?$": "babel-jest",
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  rootDir: 'src',
  moduleNameMapper: {
    "\\.(s?css|less)$": "identity-obj-proxy",
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg|jpg|jpeg|png|gif|webp|avif|eot|otf|ttf|woff|woff2)$': 'jest-transform-stub',
  }
};
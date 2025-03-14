export default {
  files: [
    'src/**/*.spec.js'
  ],
  match: [],
  concurrency: 5,
  failFast: true,
  failWithoutAssertions: false,
  environmentVariables: {},
  verbose: true,
  require: [],
  nodeArguments: [
    '--no-warnings',
    '--loader=esm-module-alias/loader',
    '--no-experimental-require-module'
  ]
}

const fs = require('fs');
const angularTypes = require('@commitlint/config-angular-type-enum').value();

/*
  Let's get widget names as valid list of scopes.
*/
const scopes = [
  'schematics',
  'animations',
  ...fs.readdirSync("./src", {withFileTypes: true})
    .filter(d => d.isDirectory())
    .filter(d => !["test", "util"].includes(d.name))
    .map(d => d.name)
];

const types = ['demo', ...angularTypes];

module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    "scope-enum": [2, 'always', scopes],
    "type-enum": [2, 'always', types]
  }
};

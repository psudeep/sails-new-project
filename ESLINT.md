ESLINT Steps
------
## Basic Setup for ESLINT
- `npm install sails-eslint --save`
- `npm install eslint eslint-config-airbnb-base eslint-plugin-import --save-dev`
- Copy `.eslintrc` from here `https://github.com/jasancheg/sails-eslint/blob/master/.eslintrc`
- Add `airbnb-base` for using `airbnb-base` rules.
- Update environment to use `es6`
- Add `eslint.js` file in config and say folders and files you would like to apply eslint rules.
- Add command to fix `eslint` rules on command line. `"eslint:fix": "eslint ./api ./config --fix"`

## Handling Sails Global variables of Sails
- For sails global variables, install `npm install sails-generate-eslintrc`
- Add command to create/update `.eslintrc-sails` such as `"eslint:generate": "sails-generate-eslintrc -f ./api"`
- Whenever add new Model/controller/service, always run `npm run eslint:generate` to update global configurations.
- Add `.eslintrc-sails` to default `.eslintrc`

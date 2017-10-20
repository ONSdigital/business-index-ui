import Jasmine from 'jasmine'

var jasmine = new Jasmine()

// Load all files in the /spec dir ending in spec.js
jasmine.loadConfig({
    "spec_dir": "test/component-tests",
    "spec_files": [
      "*.js"
    ],
    "helpers": [
      "../node_modules/jasmine-es6/lib/install.js",
      "helpers/**/*.js"
    ]
});

jasmine.execute()

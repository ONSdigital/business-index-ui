import Jasmine from 'jasmine'

var jasmine = new Jasmine()

// Load all files in the /spec dir ending in spec.js
jasmine.loadConfig({
    "spec_dir": "test/utils-spec",
    "spec_files": [
      "*.js"
    ],
    "helpers": [
      "../node_modules/jasmine-es6/lib/install.js",
      "helpers/**/*.js"
    ]
});

jasmine.execute()

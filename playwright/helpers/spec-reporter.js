const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

if (!process.env.CI) {
  // See reporter config documentation on https://github.com/bcaudan/jasmine-spec-reporter/blob/HEAD/src/configuration.ts
  const config = {
    spec: {
      displayPending: true,
      displayStacktrace: 'raw',
      // displayStacktrace: 'pretty',
    },
    // stacktrace: {
    //   filter(stacktrace) {
    //     console.log('filter', stacktrace);
    //     debugger;
    //   }
    // }
  };

  jasmine.getEnv().clearReporters();  // remove default reporter logs
  jasmine.getEnv().addReporter(new SpecReporter(config));
}

const waitOn = require('wait-on');

var yargs = require('yargs');

yargs.usage('Build for production')
    .alias('h', 'help')
    .option('baseDir', {alias: 'd', description: 'Base directory for the tests', type: 'string', default: 'e2e-app'})
    .option('browser', {alias: 'b', description: 'Browser. Support chromium, firefox and webkit', type: 'string', default: 'chromium'})
    .option('headless', {description: 'enable the headless mode. By default, the browser is run headfull locally and headless in CI', type: 'boolean'})
    .option('debug', {description: 'enable debugging environment', type: 'boolean'})
    .option('slow', {description: 'enable slow motion', type: 'boolean'})
    .option('video', {alias: 'v', description: 'enable the video recording. By default, true for the ci, false locally', type: 'boolean'})
    .example('yarn ngb:e2e-playwright -d ssr-app', "Run the ssr-app tests suite")
    .example('yarn ngb:e2e-playwright -b firefox --headless', "Run playwright with firefox in headless mode")
    .example('yarn ngb:e2e-playwright --debug', "Run playwright in debug mode")
    .example('yarn ngb:e2e-playwright --slow', "Run playwright in slow motion mode")
    .example('yarn ngb:e2e-playwright -v', "Enable the video recording")
    .wrap(null);
var parameters = yargs.parse(process.argv);

async function start() {
  const url = 'http://localhost:4200';

  console.log(`Wait for ${url}`);
  await waitOn({
    resources: [url]
  });

  const Jasmine = require('jasmine');
  const jasmineRunner = new Jasmine();

  process.env.NGB_BROWSER = parameters.browser;

  if (parameters.debug) {
    console.log('Debugging environment is enabled');
    process.env.PWDEBUG = '1';
    process.env.DEBUG = 'pw:api';
  }

  if (parameters.slow) {
    console.log('Slow motion is enabled');
    process.env.NGB_SLOW_MOTION = 'true';
  }

  if (parameters.video == null) {
    parameters.video = process.env.CI;
  }

  if (parameters.video) {
    console.log('Video recording is enabled');
    process.env.NGB_VIDEO = 'true';
  }


  const baseDir = parameters.baseDir;
  const config = require(`../${baseDir}/jasmine.json`);

  require("ts-node").register({
    project: `${baseDir}/tsconfig.spec.json`,
  });

  jasmineRunner.loadConfig(config);

  jasmineRunner.execute();
}

start();


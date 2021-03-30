import * as fs from 'fs';
import * as path from 'path';
import {ConsoleMessage} from 'playwright';
import {browserName, test, launchOptions} from './playwright.conf';

beforeAll(async() => {
  Error.stackTraceLimit = Infinity;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  try {
    console.log(`Launch browser ${browserName} with`, launchOptions);
    await test.newPage();
  } catch (e) {
    console.error('Unable to setup a new page with playwright', e);
  }

  // Listen for all console events and handle errors
  test.page.on('console', async msg => {
    const type = msg.type();
    if (type === 'error' || type === 'warning') {
      const output = ['Unexpected console error:'];
      for (let m of msg.args()) {
        output.push(await m.jsonValue());
      }
      fail(output.join('\n'));
    }
  });

  // Log all uncaught errors to the terminal
  test.page.on('pageerror', exception => { console.log(`Uncaught exception:\n${exception}`); });

});

afterAll(async() => {
  if (browserName === 'chromium') {
    try {
      console.log('Retrieving coverage...');
      const coverage: string = await test.page.evaluate('JSON.stringify(window.__coverage__);');
      if (coverage) {
        console.log(`Coverage retrieved (${coverage.length} bytes)`);
        fs.mkdirSync(path.join(__dirname, '..', '.nyc_output'));
        fs.writeFileSync(path.join(__dirname, '..', '.nyc_output', 'out.json'), coverage);
        const NYC = require('nyc');
        const nycInstance = new NYC(
            {cwd: path.join(__dirname, '..'), reportDir: `coverage-e2e`, reporter: ['lcov', 'json', 'text-summary']});
        nycInstance.report();
        nycInstance.cleanup();
        console.log('Coverage saved successfully!');
      } else {
        console.log('No coverage data!');
      }
    } catch (error) {
      console.log('Error in onComplete:', error);
      process.exit(1);
    }
  }
  await test.destroy();
}, 120000);

import {Playwright} from '../playwright/controller';

export let baseUrl: string;
export let test: Playwright;

export function setupTest(newTest: Playwright, newBaseUrl = 'http://localhost:4200/#') {
  if (test) {
    throw new Error('Cannot setup tests multiple times!');
  }
  test = newTest;
  baseUrl = newBaseUrl;
  console.log('Test suite is configured for browser:', test.browserName);
}

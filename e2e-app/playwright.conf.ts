import {BrowserContextOptions, LaunchOptions} from 'playwright';
import {Browsers, Playwright} from '../playwright/controller';

type BrowserName = 'chromium' | 'firefox' | 'webkit';

export const baseUrl = 'http://localhost:4200/#';
process.env.NGB_BROWSER = (process.env.NGB_BROWSER || 'chromium').trim();
export const browserName: BrowserName = process.env.NGB_BROWSER as BrowserName;

console.log('Test suite is configured for browser:', browserName);

export const launchOptions: LaunchOptions = {
  headless: !!process.env.CI
};

if (process.env.NGB_SLOW_MOTION) {
  launchOptions.slowMo = 1000;
}

export const contextOptions: BrowserContextOptions = {
  viewport: {width: 1280, height: 720},
  recordVideo: process.env.NGB_VIDEO ? {dir: `test-videos/e2e/${browserName}`} : undefined
};

export const test = new Playwright(Browsers[browserName], launchOptions, contextOptions);

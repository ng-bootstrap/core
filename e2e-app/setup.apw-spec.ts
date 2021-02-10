import * as os from "os";
import {VMConfiguration} from 'assistive-playwright-client';
import {BrowserContextOptions, LaunchOptions} from 'playwright';
import {Playwright} from '../playwright/controller';
import {setupTest, test} from './playwright.conf';

function findPublicIP() {
  const interfaces = os.networkInterfaces();
  const interfaceNames = Object.keys(interfaces);
  const ips: os.NetworkInterfaceInfo[] = [];
  interfaceNames.forEach((interfaceName) => {
    ips.push(...interfaces[interfaceName].filter((address) => !address.internal && address.family === 'IPv4'));
  });
  return ips.length > 0 ? ips[0].address : undefined;
}

beforeAll(async() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  try {
    process.env.NGB_BROWSER = (process.env.NGB_BROWSER || 'chromium').trim();
    const browserName = process.env.NGB_BROWSER;
    const vmConfig: VMConfiguration = {vmSettings: {type: "virtualbox", vm: "win10-nvda", snapshot: "nvda"}};
    const launchOptions: LaunchOptions = {headless: false};
    const contextOptions: BrowserContextOptions = {viewport: null};
    const baseURL = `http://${findPublicIP()}:4200/#`;
    setupTest(new Playwright(browserName, launchOptions, contextOptions, vmConfig), baseURL);
    console.log(`Launch browser ${browserName} with`, launchOptions, " in vm ", vmConfig);
    await test.newPage();
  } catch (e) {
    console.error('Unable to setup a new page with assistive-playwright', e);
  }
}, 60000);

afterAll(async() => {
  try {
    await test.destroy();
  } catch (e) {
    console.error('Unable to destroy the vm with assistive-playwright', e);
  }
});

import {WebDriver} from 'selenium-webdriver';

export let browser: WebDriver;
export let baseURL: string;
export const setBrowser = (newBrowser: WebDriver) => (browser = newBrowser);
export const setBaseURL = (url: string) => (baseURL = url);
export const navigateTo = (url: string) => browser.navigate().to(`${baseURL}#${url}`);

import {baseUrl, test} from '../../playwright.conf';

/**
 * Sends keys to a currently focused element
 *
 * @param keys list of keys to send
 * https://playwright.dev/docs/api/class-keyboard?_highlight=keyboard#keyboardpresskey-options
 */
export const sendKey = async(key: string) => {
  await test.page.keyboard.press(key);
};

/**
 * Wait for the provided element to be focused
 *
 * @param selector element selector to check
 * @param message to display in case of error
 */
export const waitForFocus = async(selector: string, message = `Unable to focus '${selector}'`) => {
  const {page} = test;
  const el = await page.$(selector);
  await timeoutMessage(page.waitForFunction(function(_el) { return _el === document.activeElement; }, el), message);
};

/**
 * Focus the provided element, and wait for this element to be focused, to avoid asynchronous side effet.
 *
 * @param selector element selector to focus
 */
export const focusElement = async(selector: string) => {
  await test.page.focus(selector);
  await waitForFocus(selector);
};


/**
 * Reopens internal URL by navigating to home url and then to desired one
 */
let hasBeenLoaded = false;
export const openUrl = async(url: string, selector: string) => {
  const page = test.page;
  const targetUrl = `#navigate-${url.replace('/', '-')}`;
  const browser = process.env.NGB_BROWSER;
  if (hasBeenLoaded && browser === 'chromium') {
    await page.click(`#navigate-home`);
    await page.waitForSelector(targetUrl);
    await page.click(targetUrl);
    await page.waitForSelector(selector);
  } else {
    if (browser === 'webkit') {
      // To perform a full reload on webkit and increase the test suite stability
      await page.goto('about:blank');
      await page.waitForSelector('ng-component', {state: 'detached'});
    } else {
      await page.goto(`${baseUrl}/`);
      await page.waitForSelector(targetUrl);
      await page.waitForSelector('ng-component', {state: 'detached'});
    }
    await page.goto(`${baseUrl}/${url}`);
    await page.waitForSelector(selector);
  }
  hasBeenLoaded = true;
};

const roundBoundingBox = (rect: {x: number, y: number, width: number, height: number}) => {
  rect.x = Math.round(rect.x);
  rect.y = Math.round(rect.y);
  rect.width = Math.round(rect.width);
  rect.height = Math.round(rect.height);

  return rect;
};

/**
 * Returns the element bounding box
 */
export const getBoundingBox = async(selector: string) => {
  const element = await test.page.$(selector);
  const boundingBox = element ? await element.boundingBox() : {x: 0, y: 0, width: 0, height: 0};
  return roundBoundingBox(boundingBox !);
};

/**
 * Returns the caret position ({start, end}) of the given element (must be an input).
 */
export const getCaretPosition = async(selector: string) =>
    await test.page.$eval(selector, (el: HTMLInputElement) => ({start: el.selectionStart, end: el.selectionEnd}));

/**
* Add a custom message on a playwright timeout failure
* This is a workaround, waiting for the followinf PR to be merged:
* {@link https://github.com/microsoft/playwright/pull/4778}
* @template T
* @param {Promise<T>} promise
* @param {string} message
* @return {Promise<T>}
*/
export const timeoutMessage = (promise: Promise<any>, message: string) => {
  return promise.catch(e => {
    if (e instanceof require('playwright').errors.TimeoutError) {
      e.message += '\n' + message;
    }
    throw e;
  });
};

/**
 * @example
 * js `some code with ${json} variables to be stringified`
 * @param code
 * @param variables
 */
export const js = (code: TemplateStringsArray, ...variables: any[]) => {
  let result = '';
  const l = code.length - 1;
  for (let i = 0; i < l; i++) {
    result += code[i] + JSON.stringify(variables[i]);
  }
  result += code[l];
  return result;
};

/**
 * Move the mouse hover the provided element
 * @param selector Element selector
 */
export const mouseMove = async(selector: string) => {
  const rect = await getBoundingBox(selector);
  const x = rect.x + rect.width / 2;
  const y = rect.y + rect.height / 2;
  await test.page.mouse.move(x, y);
};

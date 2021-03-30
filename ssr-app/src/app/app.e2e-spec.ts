import {BASE_URL, test} from '../../playwright.conf';
import {ConsoleMessage, Page} from 'playwright';

const SELECTOR_HEADER = 'h1';

describe('SSR application', () => {

  const messages: ConsoleMessage[] = [];
  let page: Page;

  beforeAll(async () => {
    page = await test.newPage(BASE_URL);
    page.on('console', msg => messages.push(msg));

    await page.waitForSelector(SELECTOR_HEADER);
  });

  afterAll(async() => {
    if (messages.length > 0) {
      console.log(messages);
      fail('Unexpected console messages found');
    }
  });

  afterAll(async() => {
    await test.destroy();
  }, 120000);

  it('should open server side rendered page without failures', async () => {
    expect(await page.innerText(SELECTOR_HEADER)).toBe('ng-bootstrap SSR test application');
  });
});

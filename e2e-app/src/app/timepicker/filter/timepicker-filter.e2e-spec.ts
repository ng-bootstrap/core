import {openUrl} from '../../tools.po';
import {test} from '../../../../playwright.conf';
import {SELECTOR_HOUR, SELECTOR_MIN, SELECTOR_SEC} from '../timepicker.po';

describe('Timepicker Filter', () => {

  beforeEach(async() => await openUrl('timepicker/filter', 'h3:text("Timepicker filtering")'));

  async function expectValue(expectedValue) {
    const hh = await test.page.$eval(SELECTOR_HOUR, (el: HTMLInputElement) => el.value);
    const mm = await test.page.$eval(SELECTOR_MIN, (el: HTMLInputElement) => el.value);
    const ss = await test.page.$eval(SELECTOR_SEC, (el: HTMLInputElement) => el.value);

    expect(`${hh}:${mm}:${ss}`).toBe(expectedValue);
  }

  describe('filter', async() => {
    it(`should accept numbers`, async() => {
      await expectValue('::');  // No starting values

      await test.page.type(SELECTOR_HOUR, '1');
      await test.page.type(SELECTOR_MIN, '2');
      await test.page.type(SELECTOR_SEC, '3');

      await test.page.click(SELECTOR_HOUR);
      await expectValue('01:02:03');
    });

    it(`shouldn't accept alpha`, async() => {
      await expectValue('::');  // No starting values

      await test.page.type(SELECTOR_HOUR, 'A');
      await test.page.type(SELECTOR_MIN, 'A');
      await test.page.type(SELECTOR_SEC, 'A');

      await test.page.click(SELECTOR_HOUR);
      await expectValue('::');
    });
  });
});

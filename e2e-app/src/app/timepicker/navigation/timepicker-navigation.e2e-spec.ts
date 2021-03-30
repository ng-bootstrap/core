import {waitForFocus, getCaretPosition, openUrl, sendKey} from '../../tools.po';
import {test} from '../../../../playwright.conf';
import {SELECTOR_HOUR, SELECTOR_MIN, SELECTOR_SEC} from '../timepicker.po';

const SELECTOR_BEFORE = '#before';
const SELECTOR_AFTER = '#after';

const focusInputBefore = async() => await test.page.click('#before');

describe('Timepicker', () => {

  beforeEach(async() => await openUrl('timepicker/navigation', 'h3:text("Timepicker navigation")'));

  async function expectCaretPosition(selector: string, position: number) {
    const {start, end} = await getCaretPosition(selector);
    expect(end).toBe(end, 'Caret should be at single position (no range selected)');
    expect(start).toBe(position, `Caret is not at proper position for given field`);
  }

  describe('navigation', () => {
    it(`should jump between inputs`, async() => {
      await focusInputBefore();

      await sendKey('Tab');
      await waitForFocus(SELECTOR_HOUR, 'Hour field should be focused');
      await sendKey('Tab');
      await waitForFocus(SELECTOR_MIN, 'Minute field should be focused');
      await sendKey('Tab');
      await waitForFocus(SELECTOR_SEC, 'Second field should be focused');
      await sendKey('Tab');
      await waitForFocus(SELECTOR_AFTER, 'Input after should be focused');

      await sendKey('Shift+Tab');
      await waitForFocus(SELECTOR_SEC, 'Second field should be focused');
      await sendKey('Shift+Tab');
      await waitForFocus(SELECTOR_MIN, 'Minute field should be focused');
      await sendKey('Shift+Tab');
      await waitForFocus(SELECTOR_HOUR, 'Hour field should be focused');
      await sendKey('Shift+Tab');
      await waitForFocus(SELECTOR_BEFORE, 'Input before should be focused');
    });
  });

  if (process.env.NGB_BROWSER !== 'firefox' && process.env.NGB_BROWSER !== 'webkit') {
    describe('arrow keys', () => {
      it(`should keep caret at the end of the input`, async() => {
        for (const selector of[SELECTOR_HOUR, SELECTOR_MIN, SELECTOR_SEC]) {
          await test.page.click(selector);

          const expectCaretAtEnd = () => expectCaretPosition(selector, 2);

          await sendKey('End');
          await expectCaretAtEnd();

          await sendKey('ArrowUp');
          await expectCaretAtEnd();

          await sendKey('ArrowDown');
          await expectCaretAtEnd();

          await sendKey('Home');
          await expectCaretPosition(selector, 0);

          await sendKey('ArrowUp');
          await expectCaretAtEnd();

          await sendKey('ArrowDown');
          await expectCaretAtEnd();
        }
      });
    });
  }
});

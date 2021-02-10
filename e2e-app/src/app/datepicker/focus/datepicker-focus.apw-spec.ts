import {Key} from 'assistive-playwright-client';
import {test} from '../../../../playwright.conf';
import {openUrl} from '../../tools.po';

describe('Datepicker', () => {

  beforeEach(async() => await openUrl('datepicker/focus', 'h3:text("Datepicker focus")'));

  it('should be accessible', async() => {
    const input = await test.page.$('input.form-control');
    await test.mouse.click(0, 0, {origin: input});
    await test.screenReader !.waitForMessage('my date');
    await test.keyboard.type('2020-04-06');
    await test.keyboard.press(Key.Tab);
    await test.screenReader !.waitForMessage('Toggle');
    await test.keyboard.press(Key.Space);
    await test.screenReader !.waitForMessage('Monday, April 6, 2020');
    await test.keyboard.press(Key.ArrowDown);
    await test.screenReader !.waitForMessage('Monday, April 13, 2020');
    await test.keyboard.press(Key.ArrowRight);
    await test.screenReader !.waitForMessage('Tuesday, April 14, 2020');
    await test.keyboard.press(Key.Space);
    await test.screenReader !.waitForMessage('Toggle');
    await test.keyboard.press('Shift+Tab');
    await test.screenReader !.waitForMessage('2020 04 14');
  }, 120000);
});

import {sendKey, openUrl, waitForFocus} from '../../tools.po';
import {clickOnDay, SELECTOR_DAY} from '../datepicker.po';
import {test} from '../../../../playwright.conf';

const expectActive = async(selector: string) => {
  await test.page.waitForSelector(selector + ' >> .active');
  await waitForFocus(selector, `active date should be focused`);
};

describe('Datepicker multiple instances', () => {

  beforeEach(async() => await openUrl('datepicker/multiple', 'h3:text("Datepicker multiple")'));

  it('the instance tapped should gain focus', async() => {

    await clickOnDay(new Date(2016, 7, 1), '#dp1');
    await sendKey('ArrowDown');
    await expectActive(SELECTOR_DAY(new Date(2016, 7, 8), '#dp1'));

    await clickOnDay(new Date(2016, 7, 1), '#dp2');
    await sendKey('ArrowDown');
    await expectActive(SELECTOR_DAY(new Date(2016, 7, 8), '#dp2'));
  });
});

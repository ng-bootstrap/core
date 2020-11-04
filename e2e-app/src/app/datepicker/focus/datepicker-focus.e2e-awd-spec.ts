import {By, Key, until} from 'selenium-webdriver';
import {forScreenReaderToSay} from 'assistive-webdriver';
import {browser, navigateTo} from '../../../../awd';

describe('Datepicker', () => {
  it('should be accessible', async() => {
    await navigateTo('/datepicker/focus');
    const input = await browser.wait(until.elementLocated(By.css('input.form-control')));
    await browser.actions().click(input).perform();
    await browser.wait(forScreenReaderToSay('my date'));
    await browser.actions().sendKeys('2020-04-06', Key.TAB).perform();
    await browser.wait(forScreenReaderToSay('Toggle'));
    await browser.actions().sendKeys(Key.SPACE).perform();
    await browser.wait(forScreenReaderToSay('Monday, April 6, 2020'));
    await browser.actions().sendKeys(Key.DOWN).perform();
    await browser.wait(forScreenReaderToSay('Monday, April 13, 2020'));
    await browser.actions().sendKeys(Key.RIGHT).perform();
    await browser.wait(forScreenReaderToSay('Tuesday, April 14, 2020'));
    await browser.actions().sendKeys(Key.SPACE).perform();
    await browser.wait(forScreenReaderToSay('Toggle'));
    await browser.actions().keyDown(Key.SHIFT).sendKeys(Key.TAB).keyUp(Key.SHIFT).perform();
    await browser.wait(forScreenReaderToSay('2020 04 14'));
  }, 120000);
});

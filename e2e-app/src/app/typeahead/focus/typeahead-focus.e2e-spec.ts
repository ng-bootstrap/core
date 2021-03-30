import {focusElement, waitForFocus, openUrl, sendKey, timeoutMessage, js} from '../../tools.po';
import {test} from '../../../../playwright.conf';
import {SELECTOR_TYPEAHEAD, SELECTOR_TYPEAHEAD_ITEMS, SELECTOR_TYPEAHEAD_WINDOW} from '../typeahead.po';

describe('Typeahead', () => {

  const waitForTypeaheadFocused = async() => await waitForFocus(SELECTOR_TYPEAHEAD, `Typeahead should be focused`);

  const waitForDropdownOpen = async(suggestions = 10) => {
    await timeoutMessage(
        test.page.waitForFunction(
            js `document.querySelectorAll(${SELECTOR_TYPEAHEAD_ITEMS}).length === ${suggestions}`),
        `Wrong number of suggestions (expected ${suggestions})`);
  };

  const waitForDropDownClosed = async() =>
      await test.page.waitForSelector(SELECTOR_TYPEAHEAD_WINDOW, {state: 'detached'});

  const waitForTypeaheadValue = async expectedValue => {
    await timeoutMessage(
        test.page.waitForFunction(js `document.querySelector(${SELECTOR_TYPEAHEAD}).value === ${expectedValue}`),
        `Wrong input value (expected ${expectedValue})`);
  };

  const clickBefore = async() => await test.page.click('#first');

  beforeEach(async() => await openUrl('typeahead/focus', 'h3:text("Typeahead focus")'));

  it(`should be open after a second click`, async() => {
    await test.page.click(SELECTOR_TYPEAHEAD);
    await waitForTypeaheadFocused();
    await test.page.click(SELECTOR_TYPEAHEAD);
    await waitForDropdownOpen();
    await waitForTypeaheadFocused();
  });

  it(`should preserve value previously selected with mouse when reopening with focus then closing without selection`,
     async() => {
       await test.page.click(SELECTOR_TYPEAHEAD);
       await test.page.type(SELECTOR_TYPEAHEAD, 'col');

       await waitForDropdownOpen(2);
       await waitForTypeaheadFocused();

       await test.page.click(`${SELECTOR_TYPEAHEAD_ITEMS}:first-child`);
       await waitForTypeaheadValue('Colorado');
       await waitForTypeaheadFocused();

       await clickBefore();
       await sendKey('Tab');

       await waitForTypeaheadFocused();
       await waitForDropdownOpen(1);
       await waitForTypeaheadValue('Colorado');

       await sendKey('Escape');
       await waitForTypeaheadFocused();
       await waitForDropDownClosed();
       await waitForTypeaheadValue('Colorado');
     });

  describe('Keyboard', () => {

    beforeEach(async() => {
      // Be sure that the mouse does not interfere with the highlighted items in dropdown
      await clickBefore();
    });

    it(`should be focused on item selection`, async() => {
      await sendKey('Tab');
      await waitForTypeaheadFocused();
      await waitForDropdownOpen();

      await sendKey('Enter');
      await waitForTypeaheadValue('Alabama');
      await waitForTypeaheadFocused();
    });

    if (process.env.NGB_BROWSER !== 'webkit') {
      it(`should select element on tab`, async() => {
        await focusElement(SELECTOR_TYPEAHEAD);
        await sendKey('Tab');
        await waitForTypeaheadFocused();
        await waitForDropDownClosed();
        await waitForTypeaheadValue('Alabama');
      });
    }
  });
});

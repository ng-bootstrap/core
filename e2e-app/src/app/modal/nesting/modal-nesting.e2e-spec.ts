import {test} from '../../../../playwright.conf';
import {openUrl, sendKey, waitForFocus, timeoutMessage} from '../../tools.po';
import {waitForModalCount} from '../modal.po';

import {
  openModal,
  pressButton,
  SELECTOR_DATEPICKER,
  SELECTOR_DATEPICKER_BUTTON,
  SELECTOR_DROPDOWN_BUTTON,
  SELECTOR_DROPDOWN,
  SELECTOR_TYPEAHEAD_INPUT,
  SELECTOR_TYPEAHEAD_DROPDOWN,
} from './modal-nesting.po';

import {SELECTOR_DAY} from '../../datepicker/datepicker.po';

describe('Modal nested components', () => {
  beforeEach(async() => await openUrl('modal/nesting', 'h3:text("Modal nesting tests")'));

  afterEach(async() => { await waitForModalCount(0); });

  it('should close only datepicker, then modal on ESC', async() => {
    await openModal();

    // open datepicker
    await pressButton(SELECTOR_DATEPICKER_BUTTON);
    await timeoutMessage(test.page.waitForSelector(SELECTOR_DATEPICKER), `Datepicker should be opened`);
    await waitForFocus(SELECTOR_DAY(new Date(2018, 0, 1)), `01 JAN 2018 should be focused`);

    // close datepicker
    await sendKey('Escape');
    await timeoutMessage(
        test.page.waitForSelector(SELECTOR_DATEPICKER, {state: 'detached'}), `Datepicker should be closed`);
    await waitForFocus(SELECTOR_DATEPICKER_BUTTON, `Datepicker open button should be focused`);
    await waitForModalCount(1, `Modal should stay opened`);

    await sendKey('Escape');
  });

  it('should close only dropdown, then modal on ESC', async() => {
    await openModal();

    // open dropdown
    await pressButton(SELECTOR_DROPDOWN_BUTTON);
    await timeoutMessage(test.page.waitForSelector(SELECTOR_DROPDOWN), `Dropdown should be opened`);
    await waitForFocus(SELECTOR_DROPDOWN_BUTTON, `Dropdown button should be focused`);

    // close dropdown
    await sendKey('Escape');
    await timeoutMessage(
        test.page.waitForSelector(SELECTOR_DROPDOWN, {state: 'detached'}), `Dropdown should be closed`);
    await waitForFocus(SELECTOR_DROPDOWN_BUTTON, `Dropdown open button should be focused`);
    await waitForModalCount(1, `Modal should stay opened`);

    await sendKey('Escape');
  });

  it('should close only typeahead, then modal on ESC', async() => {
    await openModal();

    // open typeahead
    await test.page.click(SELECTOR_TYPEAHEAD_INPUT);
    await sendKey(' ');
    await timeoutMessage(test.page.waitForSelector(SELECTOR_TYPEAHEAD_DROPDOWN), `Typeahead should be opened`);
    await waitForFocus(SELECTOR_TYPEAHEAD_INPUT, `Typeahead input should be focused`);

    // close typeahead
    await sendKey('Escape');
    await timeoutMessage(
        test.page.waitForSelector(SELECTOR_TYPEAHEAD_DROPDOWN, {state: 'detached'}), `Typeahead should be
                closed`);
    await waitForFocus(SELECTOR_TYPEAHEAD_INPUT, `Typeahead input should be focused`);
    await waitForModalCount(1, `Modal should stay opened`);

    await sendKey('Escape');
  });
});

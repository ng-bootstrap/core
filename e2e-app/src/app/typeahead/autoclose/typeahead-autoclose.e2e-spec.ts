import {openUrl, waitForFocus, sendKey} from '../../tools.po';
import {test} from '../../../../playwright.conf';
import {
  getTypeaheadValue,
  SELECTOR_TYPEAHEAD,
  SELECTOR_TYPEAHEAD_ITEMS,
  SELECTOR_TYPEAHEAD_WINDOW
} from '../typeahead.po';

const SELECTOR_OUTSIDE_BUTTON = '#outside-button';
const SELECTOR_OPEN_STATUS = '#open-status';

const clickOutside = async() => await test.page.click(SELECTOR_OUTSIDE_BUTTON);
const rightClickOutside = async() => await test.page.click(SELECTOR_OUTSIDE_BUTTON, {button: 'right'});

const showHint = async(hint: boolean) => {
  await test.page.click('#hint-dropdown');
  await test.page.click(`#hint-${hint}`);
};

const expectTypeaheadToBeOpen = async(message: string) => {
  await test.page.waitForSelector(SELECTOR_TYPEAHEAD_WINDOW);
  expect(await test.page.textContent(SELECTOR_OPEN_STATUS)).toBe('open', message);
};

const expectTypeaheadToBeClosed = async(message: string) => {
  await test.page.waitForSelector(SELECTOR_TYPEAHEAD_WINDOW, {state: 'detached'});
  expect(await test.page.textContent(SELECTOR_OPEN_STATUS)).toBe('closed', message);
};

const setTypeaheadValue = async(text: string) => {
  await test.page.type(SELECTOR_TYPEAHEAD, text);
  await expectTypeaheadToBeOpen(`Typed ${text}, should be open`);
};

const openTypeahead = async() => {
  await setTypeaheadValue('o');
  const items = await test.page.$$(SELECTOR_TYPEAHEAD_ITEMS);
  expect(items.length).toBe(2);
};

describe('Typeahead Autoclose', () => {

  beforeEach(async() => await openUrl('typeahead/autoclose', 'h3:text("Typeahead autoclose")'));

  it(`should not close typeahead on right clicks`, async() => {
    await openTypeahead();

    await test.page.click(SELECTOR_TYPEAHEAD, {button: 'right'});
    await expectTypeaheadToBeOpen(`Dropdown should stay visible when right-clicking on the input`);

    await test.page.click(`${SELECTOR_TYPEAHEAD_ITEMS}:first-child`, {button: 'right'});
    await expectTypeaheadToBeOpen(`Dropdown should stay visible when right-clicking inside`);

    await rightClickOutside();
    await expectTypeaheadToBeOpen(`Dropdown should stay visible when right-clicking outside`);
  });

  it(`should close typeahead on outside click and lose focus`, async() => {
    await openTypeahead();

    await clickOutside();
    await expectTypeaheadToBeClosed(`Dropdown should become hidden`);
    await waitForFocus(SELECTOR_OUTSIDE_BUTTON, `Clicked button should be focused`);
  });

  it(`should close typeahead on outside click and lose focus (with hint)`, async() => {
    await showHint(true);
    await openTypeahead();
    expect(await getTypeaheadValue()).toBe('one', `Hint should be shown`);

    await clickOutside();
    await expectTypeaheadToBeClosed(`Dropdown should become hidden`);
    await waitForFocus(SELECTOR_OUTSIDE_BUTTON, `Clicked button should be focused`);
    expect(await getTypeaheadValue()).toBe('o', `Hint should have been removed`);
  });

  it(`should not close typeahead on input click and stay focused`, async() => {
    await openTypeahead();

    await test.page.click(SELECTOR_TYPEAHEAD);
    await expectTypeaheadToBeOpen(`Dropdown should stay visible`);
    await waitForFocus(SELECTOR_TYPEAHEAD, `Typeahead input should stay focused`);
  });

  it(`should close typeahead on item click and stay focused`, async() => {
    await openTypeahead();

    await test.page.click(`${SELECTOR_TYPEAHEAD_ITEMS}:first-child`);
    await expectTypeaheadToBeClosed(`Dropdown should become hidden`);
    await waitForFocus(SELECTOR_TYPEAHEAD, `Typeahead input should stay focused`);
  });

  it(`should close typeahead on Escape and stay focused`, async() => {
    await openTypeahead();

    await sendKey('Escape');
    await expectTypeaheadToBeClosed(`Dropdown should become hidden`);
    await waitForFocus(SELECTOR_TYPEAHEAD, `Typeahead input should stay focused`);
  });

  it(`should close typeahead on Escape and stay focused (with hint)`, async() => {
    await showHint(true);
    await openTypeahead();
    expect(await getTypeaheadValue()).toBe('one', `Hint should be shown`);

    await sendKey('Escape');
    await expectTypeaheadToBeClosed(`Dropdown should become hidden`);
    await waitForFocus(SELECTOR_TYPEAHEAD, `Typeahead input should stay focused`);
    expect(await getTypeaheadValue()).toBe('o', `Hint should have been removed`);
  });
});

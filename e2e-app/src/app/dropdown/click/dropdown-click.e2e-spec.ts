import {openUrl, sendKey, waitForFocus} from '../../tools.po';
import {test} from '../../../../playwright.conf';
import {isDropdownOpened} from '../dropdown.po';

const SELECTOR_DROPDOWN_TOGGLE = '[ngbDropdownToggle]';
const SELECTOR_DROPDOWN_ITEM = '[ngbDropdownItem]';

const focusDropdownItem = async(index: number) => {
  await test.page.press(SELECTOR_DROPDOWN_TOGGLE, 'ArrowDown');
  await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `dropdown should be focused`);
  for (let i = 0; i <= index; ++i) {
    await sendKey('ArrowDown');
  }
  await waitForFocus(`${SELECTOR_DROPDOWN_ITEM}:nth-child(${index + 1})`, `Item should be focused`);
};

describe(`Dropdown user (click) handler`, () => {

  beforeEach(async() => await openUrl('dropdown/click', 'h3:text("Dropdown click")'));

  it(`should call user (click) handler on 'Enter'`, async() => {
    await focusDropdownItem(0);

    await sendKey('Enter');
    expect(await isDropdownOpened()).toBeFalsy(`Dropdown should be hidden on Enter`);
    await test.page.waitForSelector('#enter-click');
    await test.page.waitForSelector('#enter-key');
  });

  it(`should call user (click) handler on 'Space'`, async() => {
    await focusDropdownItem(1);

    await sendKey(' ');
    expect(await isDropdownOpened()).toBeFalsy(`Dropdown should be hidden on Space`);
    await test.page.waitForSelector('#space-click');
    await test.page.waitForSelector('#space-key');
  });

});

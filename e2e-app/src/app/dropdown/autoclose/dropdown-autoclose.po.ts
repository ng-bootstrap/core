import {test} from '../../../../playwright.conf';
import {isDropdownOpened, toggleDropdown} from '../dropdown.po';

export const SELECTOR_OPEN_STATUS = '#open-status';
export const SELECTOR_DROPDOWN = '#dropdown';
export const SELECTOR_DROPDOWN_MENU = '#dropdownMenuId';
export const SELECTOR_DROPDOWN_TOGGLE = '#dropdown >> button[ngbDropdownToggle]';
export const SELECTOR_DROPDOWN_ITEM = '#item-1';
export const SELECTOR_FORM_INPUT = '#dropdownMenuId >> input';

export const expectDropdownToBeVisible = async(message: string) => {
  await test.page.waitForSelector(SELECTOR_DROPDOWN_ITEM);
  expect(await isDropdownOpened(SELECTOR_DROPDOWN)).toBeTruthy(message);
  expect(await test.page.textContent(SELECTOR_OPEN_STATUS)).toBe('open', message);
};

export const expectDropdownToBeHidden = async(message: string) => {
  await test.page.waitForSelector(SELECTOR_DROPDOWN_ITEM, {state: 'hidden'});
  expect(await isDropdownOpened(SELECTOR_DROPDOWN)).toBeFalsy(message);
  expect(await test.page.textContent(SELECTOR_OPEN_STATUS)).toBe('closed', message);
};

export const openDropdown = async(message: string) => {
  await toggleDropdown(SELECTOR_DROPDOWN);
  await expectDropdownToBeVisible(message);
};

export const closeDropdown = async(message: string) => {
  await toggleDropdown(SELECTOR_DROPDOWN);
  await expectDropdownToBeHidden(message);
};

export const clickDropdownItem = async() => await test.page.click(SELECTOR_DROPDOWN_ITEM);
export const rightClickDropdownItem = async() => await test.page.click(SELECTOR_DROPDOWN_ITEM, {button: 'right'});

export const clickOutside = async() => await test.page.click('#outside-button');
export const rightClickOutside = async() => await test.page.click('#outside-button', {button: 'right'});

export const selectAutoClose = async(type: string) => {
  await test.page.click('#autoclose-dropdown');
  await test.page.click(`#autoclose-${type}`);
};

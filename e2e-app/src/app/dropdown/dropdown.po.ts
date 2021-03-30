import {test} from '../../../playwright.conf';

const SELECTOR_DROPDOWN = '[ngbDropdown]';

const expectDropdownToBeVisible = async(message: string, selector: string, toBody: boolean) => {
  if (toBody) {
    await test.page.waitForSelector(`body > div > [ngbDropdownMenu]`);
  } else {
    await test.page.waitForSelector(`${selector} >> [ngbDropdownItem]`);
  }
  expect(await isDropdownOpened(selector)).toBeTruthy(message);
};

const expectDropdownToBeHidden = async(message: string, selector: string, toBody: boolean) => {
  if (toBody) {
    await test.page.waitForSelector(`body > div > [ngbDropdownMenu]`, {state: 'hidden'});
  } else {
    await test.page.waitForSelector(`${selector} >> [ngbDropdownItem]`, {state: 'hidden'});
  }
  expect(await isDropdownOpened(selector)).toBeFalsy(message);
};

export const isDropdownOpened = async(selector = SELECTOR_DROPDOWN) => {
  const classNames = await test.page.getAttribute(selector, 'class');
  return classNames !.includes('show');
};

export const toggleDropdown = async(selector: string) => {
  const expectedState = !(await isDropdownOpened(selector));
  await test.page.click(`${selector} >> [ngbDropdownToggle]`);
  if (expectedState) {
    expect(await isDropdownOpened(selector)).toBeTruthy(`Dropdown should have been opened`);
  } else {
    expect(await isDropdownOpened(selector)).toBeFalsy(`Dropdown should have been closed`);
  }
};

export const openDropdown = async(errorMessage = '', selector = SELECTOR_DROPDOWN, toBody = false) => {
  await toggleDropdown(selector);
  await expectDropdownToBeVisible(errorMessage, selector, toBody);
};

export const closeDropdown = async(errorMessage = '', selector = SELECTOR_DROPDOWN, toBody = false) => {
  await toggleDropdown(selector);
  await expectDropdownToBeHidden(errorMessage, selector, toBody);
};

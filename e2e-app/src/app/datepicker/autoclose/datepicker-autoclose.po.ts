import {test} from '../../../../playwright.conf';
import {SELECTOR_DATEPICKER} from '../datepicker.po';

export const SELECTOR_OPEN_STATUS = '#open-status';

export const clickOutside = async() => await test.page.click('#outside-button');
export const rightClickOutside = async() => await test.page.click('#outside-button', {button: 'right'});

export const selectAutoClose = async(type: string) => {
  await test.page.click('#autoclose-dropdown');
  await test.page.click(`#autoclose-${type}`);
};

export const selectDisplayMonths = async(displayMonths: number) => {
  await test.page.click('#displayMonths-dropdown');
  await test.page.click(`#displayMonths-${displayMonths}`);
};

export const openDatepicker = async(message: string) => {
  await test.page.click('#selectDate');
  await test.page.click('#toggle');
  await expectDatepickerToBeOpen(message);
};

export const closeDatepicker = async(message: string) => {
  await test.page.click('#close');
  await expectDatepickerToBeClosed(message);
};

export const expectDatepickerToBeOpen = async function(message) {
  await test.page.waitForSelector(SELECTOR_DATEPICKER);
  expect(await test.page.innerText(SELECTOR_OPEN_STATUS)).toEqual('open', message);
};

export const expectDatepickerToBeClosed = async(message: string) => {
  await test.page.waitForSelector(SELECTOR_DATEPICKER, {state: 'detached'});
  expect(await test.page.innerText(SELECTOR_OPEN_STATUS)).toEqual('closed', message);
};

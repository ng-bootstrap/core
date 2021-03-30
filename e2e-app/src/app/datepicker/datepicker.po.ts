import {test} from '../../../playwright.conf';

export const SELECTOR_DATEPICKER = 'ngb-datepicker';
export const SELECTOR_DATEPICKER_INPUT = 'input[ngbDatepicker]';
export const SELECTOR_TOGGLE = '#toggle';
export const SELECTOR_DAY = (date: Date, selector = SELECTOR_DATEPICKER) => {
  const ariaLabel = date.toLocaleString('en', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
  return `${selector} >> div.ngb-dp-day[aria-label="${ariaLabel}"]`;
};
export const SELECTOR_FIRST_WEEKDAY = `${SELECTOR_DATEPICKER} >> div.ngb-dp-weekday:first-child`;
export const SELECTOR_MONTH_SELECT = `${SELECTOR_DATEPICKER} >> select[aria-label="Select month"]`;
export const SELECTOR_YEAR_SELECT = `${SELECTOR_DATEPICKER} >> select[aria-label="Select year"]`;
export const SELECTOR_NEXT_MONTH = `${SELECTOR_DATEPICKER} >> button[aria-label="Next month"]`;
export const SELECTOR_PREV_MONTH = `${SELECTOR_DATEPICKER} >> button[aria-label="Previous month"]`;


export const openDatepicker = async() => {
  await test.page.click(SELECTOR_TOGGLE);
  expect(await test.page.waitForSelector(SELECTOR_DATEPICKER)).not.toBeNull();
};

export const clickOnDay = async(date: Date, datepicker = SELECTOR_DATEPICKER) => {
  await test.page.click(SELECTOR_DAY(date, datepicker));
};

export async function rightClickOnDay(date: Date, datepicker = SELECTOR_DATEPICKER) {
  await test.page.click(SELECTOR_DAY(date, datepicker), {button: 'right'});
}

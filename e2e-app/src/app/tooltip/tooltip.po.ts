import {test} from '../../../playwright.conf';

export const SELECTOR_OPEN_STATUS = '#open-status';
export const SELECTOR_TOOLTIP = 'ngb-tooltip-window';

export const expectTooltipToBeOpen = async(message: string) => {
  await test.page.waitForSelector(SELECTOR_TOOLTIP);
  expect(await test.page.textContent(SELECTOR_OPEN_STATUS)).toBe('open', message);
};

export const expectTooltipToBeClosed = async(message: string) => {
  await test.page.waitForSelector(SELECTOR_TOOLTIP, {state: 'detached'});
  expect(await test.page.textContent(SELECTOR_OPEN_STATUS)).toBe('closed', message);
};

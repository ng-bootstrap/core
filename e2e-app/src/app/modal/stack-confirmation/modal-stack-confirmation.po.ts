import {test} from '../../../../playwright.conf';
import {SELECTOR_MODAL_WINDOW, waitForModalCount} from '../modal.po';

export const SELECTOR_MODAL_BUTTON = '#open-modal';
export const SELECTOR_STACK_MODAL = '#stack-modal';
export const SELECTOR_CLOSE_BUTTON = '#close';
export const SELECTOR_CONFIRM_BUTTON = '#confirm';
export const SELECTOR_DISMISS_BUTTON = '#dismiss';

export const openModal = async() => {
  await test.page.click(SELECTOR_MODAL_BUTTON);
  await waitForModalCount(1);
};

export const clickOnModal = async(index) => {
  const modals = await test.page.$$(SELECTOR_MODAL_WINDOW);
  await modals[index].click();
};

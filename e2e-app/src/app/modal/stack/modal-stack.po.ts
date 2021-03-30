import {test} from '../../../../playwright.conf';
import {focusElement, sendKey} from '../../tools.po';
import {waitForModalCount} from '../modal.po';

export const SELECTOR_MODAL_BUTTON = '#open-modal';
export const SELECTOR_STACK_MODAL_BUTTON = '#open-inner-modal';
export const SELECTOR_STACK_MODAL = '#stack-modal';
export const SELECTOR_CLOSE_ICON = 'button.close';

export const openModal = async() => {
  await test.page.click(SELECTOR_MODAL_BUTTON);
  await waitForModalCount(1);
};

export const openStackModal = async() => {
  await focusElement(SELECTOR_STACK_MODAL_BUTTON);
  await sendKey('Enter');
  await test.page.waitForSelector(SELECTOR_STACK_MODAL);
};

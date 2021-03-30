import {focusElement, sendKey} from '../../tools.po';
import {waitForModalCount} from '../modal.po';

export const SELECTOR_MODAL_CONTENT = 'div.modal-content';
export const SELECTOR_DISMISS_BUTTON = 'div.modal-header >> button';
export const SELECTOR_CLOSE_BUTTON = 'div.modal-footer >> button';
export const SELECTOR_MODAL_INPUT = 'div.modal-body >> input';
export const SELECTOR_MODAL_HEADER = 'div.modal-header';

export const openModal = async(type: string) => {
  await focusElement(`#open-modal-${type}`);
  await sendKey('Enter');
  await waitForModalCount(1);
};

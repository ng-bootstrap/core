import {test} from '../../../../playwright.conf';
import {focusElement, sendKey} from '../../tools.po';
import {waitForModalCount} from '../modal.po';

export const SELECTOR_DATEPICKER = 'ngb-datepicker';
export const SELECTOR_DATEPICKER_BUTTON = '#datepicker-button';
export const SELECTOR_DROPDOWN_BUTTON = '#dropdown';
export const SELECTOR_DROPDOWN = '[ngbDropdown].show';
export const SELECTOR_TYPEAHEAD_INPUT = '#typeahead';
export const SELECTOR_TYPEAHEAD_DROPDOWN = 'ngb-typeahead-window.show';


export const openModal = async() => {
  await test.page.click(`#open-modal`);
  await waitForModalCount(1);
};

export const pressButton = async(buttonSelector) => {
  await focusElement(buttonSelector);
  await sendKey('Enter');
};

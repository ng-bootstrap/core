import {test} from '../../../playwright.conf';

export const SELECTOR_TYPEAHEAD = 'input#typeahead';
export const SELECTOR_TYPEAHEAD_WINDOW = 'ngb-typeahead-window';
export const SELECTOR_TYPEAHEAD_ITEMS = 'ngb-typeahead-window > button';

export const getTypeaheadValue = async() =>
    await test.page.$eval(SELECTOR_TYPEAHEAD, (el: HTMLInputElement) => el.value);

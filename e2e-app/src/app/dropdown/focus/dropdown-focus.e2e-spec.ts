import {isDropdownOpened, openDropdown} from '../dropdown.po';
import {test} from '../../../../playwright.conf';
import {sendKey, waitForFocus, openUrl} from '../../tools.po';

const SELECTOR_DROPDOWN = '[ngbDropdown]';
const SELECTOR_DROPDOWN_TOGGLE = '[ngbDropdownToggle]';
const SELECTOR_DROPDOWN_ITEM = (item: number) => `#item-${item}`;

const focusToggle = async() => {
  await test.page.focus(SELECTOR_DROPDOWN_TOGGLE);
  await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `dropdown toggle should be focused`);
};

const selectContainer = async(container: string) => await test.page.click(`#container-${container}`);
const selectWithItems = async(withItems: boolean) => await test.page.click(`#items-${withItems}`);

describe(`Dropdown focus`, () => {

  beforeEach(async() => await openUrl('dropdown/focus', 'h3:text("Dropdown focus")'));

  const containers = ['inline', 'body'];
  containers.forEach((container) => {

    describe(`with container = ${container}`, () => {

      beforeEach(async() => {
        await selectContainer(container);
        await selectWithItems(true);
      });

      it(`should not be present on the page initially`,
         async() => { expect(await isDropdownOpened()).toBeFalsy(`Dropdown should be closed initially`); });

      it(`should open dropdown with 'Space' and focus toggling element`, async() => {
        await focusToggle();
        await sendKey(' ');
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);
        expect(await isDropdownOpened()).toBeTruthy(`Dropdown should be opened on 'Space' press`);
      });

      it(`should open dropdown with 'Enter' and focus toggling element`, async() => {
        await focusToggle();
        await sendKey('Enter');
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);
        expect(await isDropdownOpened()).toBeTruthy(`Dropdown should be opened on 'Enter' press`);
      });

      it(`should open dropdown with 'ArrowDown' and focus toggling element`, async() => {
        await focusToggle();
        await sendKey('ArrowDown');
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);
        expect(await isDropdownOpened()).toBeTruthy(`Dropdown should be opened on 'ArrowDown' press`);
      });

      it(`should open dropdown with 'ArrowUp' and focus toggling element`, async() => {
        await focusToggle();
        await sendKey('ArrowUp');
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);
        expect(await isDropdownOpened()).toBeTruthy(`Dropdown should be opened on 'ArrowUp' press`);
      });

      it(`should focus dropdown items with 'ArrowUp' / 'ArrowDown'`, async() => {
        // Open
        await openDropdown('Dropdown should be opened', SELECTOR_DROPDOWN, container === 'body');
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);

        // Down -> first
        await sendKey('ArrowDown');
        await waitForFocus(SELECTOR_DROPDOWN_ITEM(1), `first dropdown item should be focused`);

        // Down -> second
        await sendKey('ArrowDown');
        await waitForFocus(SELECTOR_DROPDOWN_ITEM(2), `second dropdown item should be focused`);

        // Down -> second
        await sendKey('ArrowDown');
        await waitForFocus(SELECTOR_DROPDOWN_ITEM(2), `second dropdown item should stay focused`);

        // Up -> first
        await sendKey('ArrowUp');
        await waitForFocus(SELECTOR_DROPDOWN_ITEM(1), `first dropdown item should be focused`);

        // Up -> first
        await sendKey('ArrowUp');
        await waitForFocus(SELECTOR_DROPDOWN_ITEM(1), `first dropdown item should stay focused`);
      });

      it(`should focus dropdown first and last items with 'Home' / 'End'`, async() => {
        // Open
        await openDropdown('Dropdown should be opened', SELECTOR_DROPDOWN, container === 'body');
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);

        // End -> last
        await sendKey('End');
        await waitForFocus(SELECTOR_DROPDOWN_ITEM(2), `last dropdown item should be focused`);

        // Home -> first
        await sendKey('Home');
        await waitForFocus(SELECTOR_DROPDOWN_ITEM(1), `first dropdown item should be focused`);
      });

      it(`should close dropdown with 'Escape' and focus toggling element (toggle was focused)`, async() => {
        await openDropdown('Dropdown should be opened', SELECTOR_DROPDOWN, container === 'body');
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);

        await sendKey('Escape');
        expect(await isDropdownOpened()).toBeFalsy(`Dropdown should be closed on 'Escape' press`);
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);
      });

      it(`should close dropdown with 'Escape' and focus toggling element (item was focused)`, async() => {
        await openDropdown('Dropdown should be opened', SELECTOR_DROPDOWN, container === 'body');
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);

        await sendKey('ArrowDown');
        await waitForFocus(SELECTOR_DROPDOWN_ITEM(1), `first dropdown item should be focused`);

        await sendKey('Escape');
        expect(await isDropdownOpened()).toBeFalsy(`Dropdown should be closed on 'Escape' press`);
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);
      });

      if (process.env.NGB_BROWSER !== 'webkit') {
        it(`should focus dropdown first item with Tab when dropdown is opened (toggle was focused)`, async() => {
          await openDropdown('Dropdown should be opened', SELECTOR_DROPDOWN, container === 'body');
          await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);

          // Tab -> first
          await sendKey('Tab');
          await waitForFocus(SELECTOR_DROPDOWN_ITEM(1), `first dropdown item should be focused`);
        });
      }

      it(`should close dropdown with 'Tab' when focus is moved to another element`, async() => {
        await openDropdown('Dropdown should be opened', SELECTOR_DROPDOWN, container === 'body');
        await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);

        // Down -> first
        await sendKey('ArrowDown');
        await waitForFocus(SELECTOR_DROPDOWN_ITEM(1), `first dropdown item should be focused`);

        // Home -> last
        await sendKey('End');
        await waitForFocus(SELECTOR_DROPDOWN_ITEM(2), `second dropdown item should be focused`);

        // Tab -> another element
        await sendKey('Tab');
        expect(await isDropdownOpened()).toBeFalsy(`Dropdown should be closed`);
      });
    });
  });

  describe(`without ngbDropdownItems`, () => {

    beforeEach(async() => {
      await selectContainer('inline');
      await selectWithItems(false);
    });

    it(`should open dropdown with 'ArrowDown' and focus toggling element`, async() => {
      await focusToggle();
      await sendKey('ArrowDown');
      await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);
      expect(await isDropdownOpened()).toBeTruthy(`Dropdown should be opened on 'ArrowDown' press`);
    });

    it(`should open dropdown with 'ArrowUp' and focus toggling element`, async() => {
      await focusToggle();
      await sendKey('ArrowUp');
      await waitForFocus(SELECTOR_DROPDOWN_TOGGLE, `Toggling element should be focused`);
      expect(await isDropdownOpened()).toBeTruthy(`Dropdown should be opened on 'ArrowUp' press`);
    });
  });

});

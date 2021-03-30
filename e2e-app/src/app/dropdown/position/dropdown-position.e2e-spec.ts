import {getBoundingBox, openUrl} from '../../tools.po';
import {test} from '../../../../playwright.conf';
import {openDropdown} from '../dropdown.po';
import {waitForModalCount} from '../../modal/modal.po';

const removeFromDom = async() => await test.page.click('#isInDom-false');

const toggleContainer = async(container: null | 'body') => await test.page.click(`#container-${container || 'null'}`);

const togglePlacement = async(placement: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right') => {
  await test.page.click(`#placement-${placement}`);
};

['#dropdown', '#dropdownWithTemplate'].forEach((selector) => {
  describe(`Dropdown Position for id ${selector}`, () => {

    const expectSamePositions = async(placement) => {

      // Setup start conditions
      await toggleContainer(null);
      await togglePlacement(placement);

      await test.page.waitForSelector(`${selector} >> ${selector}Menu`);
      const inlineBox = await getBoundingBox(`${selector} >> ${selector}Menu`);

      // Append to body
      await toggleContainer('body');
      await test.page.waitForSelector(`body > div > ${selector}Menu`);
      const bodyBox = await getBoundingBox(`body > div > ${selector}Menu`);

      for (const[key, value] of Object.entries(inlineBox)) {
        expect(bodyBox[key])
            .toBeGreaterThanOrEqual(
                value - 1, `Position ${key} should give the same results when placed on ${placement}`);
        expect(bodyBox[key])
            .toBeLessThanOrEqual(
                value + 1, `Position '${key}' should give the same results when placed on ${placement}`);
      }

      // Reset
      await toggleContainer(null);
    };

    beforeEach(async() => await openUrl('dropdown/position', 'h3:text("Dropdown positioning")'));

    afterEach(async() => { await waitForModalCount(0); });

    it(`should keep the same position when appended to widget or body`, async() => {
      await openDropdown('should open dropdown', selector);

      await expectSamePositions('bottom-left');
      await expectSamePositions('top-left');
      await expectSamePositions('bottom-right');
      await expectSamePositions('top-right');
    });

    it(`should be removed on destroy`, async() => {
      await openDropdown('should open dropdown', selector);

      await removeFromDom();
      await test.page.waitForSelector(`${selector}Menu`, {state: 'detached'});
    });

    it(`should have the body container added and removed`, async() => {
      await toggleContainer('body');
      await openDropdown('should open dropdown', selector, true);

      await togglePlacement('bottom-left');
      await test.page.waitForSelector(`body > div > ${selector}Menu`);

      await togglePlacement('top-left');
      await test.page.waitForSelector(`body > div > ${selector}Menu`);

      await toggleContainer(null);
      await test.page.waitForSelector(`body > div > ${selector}Menu`, {state: 'detached'});
    });

  });
});

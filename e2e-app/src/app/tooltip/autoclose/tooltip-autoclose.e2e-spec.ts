import {openUrl, sendKey} from '../../tools.po';
import {test} from '../../../../playwright.conf';
import {expectTooltipToBeClosed, expectTooltipToBeOpen} from '../tooltip.po';

const clickOutside = async() => await test.page.click('#outside-button');
const rightClickOutside = async() => await test.page.click('#outside-button', {button: 'right'});

const clickInside = async() => await test.page.click('div.tooltip-inner');
const rightClickInside = async() => await test.page.click('div.tooltip-inner', {button: 'right'});

const selectAutoClose = async(type: string) => {
  await test.page.click('#autoclose-dropdown');
  await test.page.click(`#autoclose-${type}`);
};

const openTooltip = async(message: string) => {
  await test.page.click('button[ngbTooltip]');
  await expectTooltipToBeOpen(message);
};

describe('Tooltip Autoclose', () => {

  beforeEach(async() => await openUrl('tooltip/autoclose', 'h3:text("Tooltip autoclose")'));

  it(`should not close tooltip on right clicks`, async() => {
    await openTooltip(`Opening tooltip for right clicks`);

    await rightClickInside();
    await expectTooltipToBeOpen(`Tooltip should stay visible when right-clicking inside`);

    await rightClickOutside();
    await expectTooltipToBeOpen(`Tooltip should stay visible when right-clicking outside`);
  });

  it(`should work when autoClose === true`, async() => {
    await selectAutoClose('true');

    // escape
    await openTooltip(`Opening tooltip for escape`);
    await sendKey('Escape');
    await expectTooltipToBeClosed(`Tooltip should be closed on ESC`);

    // outside click
    await openTooltip(`Opening tooltip for outside click`);
    await clickOutside();
    await expectTooltipToBeClosed(`Tooltip should be closed on outside click`);

    // inside click
    await openTooltip(`Opening tooltip for inside click`);
    await clickInside();
    await expectTooltipToBeClosed(`Tooltip should be closed on date selection`);
  });

  it(`should work when autoClose === false`, async() => {
    await selectAutoClose('false');

    // escape
    await openTooltip(`Opening tooltip for escape`);
    await sendKey('Escape');
    await expectTooltipToBeOpen(`Tooltip should NOT be closed on ESC`);

    // outside click
    await clickOutside();
    await expectTooltipToBeOpen(`Tooltip should NOT be closed on outside click`);

    // inside click
    await clickInside();
    await expectTooltipToBeOpen(`Tooltip should NOT be closed on date selection`);
  });

  it(`should work when autoClose === 'outside'`, async() => {
    await selectAutoClose('outside');

    // escape
    await openTooltip(`Opening tooltip for escape`);
    await sendKey('Escape');
    await expectTooltipToBeClosed(`Tooltip should be closed on ESC`);

    // outside click
    await openTooltip(`Opening tooltip for outside click`);
    await clickOutside();
    await expectTooltipToBeClosed(`Tooltip should be closed on outside click`);

    // date selection
    await openTooltip(`Opening tooltip for date selection`);
    await clickInside();
    await expectTooltipToBeOpen(`Tooltip should NOT be closed on date selection`);
  });

  it(`should work when autoClose === 'inside'`, async() => {
    await selectAutoClose('inside');

    // escape
    await openTooltip(`Opening tooltip for escape`);
    await sendKey('Escape');
    await expectTooltipToBeClosed(`Tooltip should be closed on ESC`);

    // outside click
    await openTooltip(`Opening tooltip for outside click`);
    await clickOutside();
    await expectTooltipToBeOpen(`Tooltip should NOT be closed on outside click`);

    // date selection
    await clickInside();
    await expectTooltipToBeClosed(`Tooltip should be closed on date selection`);
  });
});

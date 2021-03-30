import {sendKey, openUrl} from '../../tools.po';
import {test} from '../../../../playwright.conf';

const SELECTOR_OPEN_STATUS = '#open-status';
const SELECTOR_POPOVER = 'ngb-popover-window';

const clickOutside = async() => await test.page.click('#outside-button');
const rightClickOutside = async() => await test.page.click('#outside-button', {button: 'right'});

const clickInside = async() => await test.page.click('div.popover-body');
const rightClickInside = async() => await test.page.click('div.popover-body', {button: 'right'});

const selectAutoClose = async(type: string) => {
  await test.page.click('#autoclose-dropdown');
  await test.page.click(`#autoclose-${type}`);
};

const expectPopoverToBeOpen = async(message: string) => {
  await test.page.waitForSelector(SELECTOR_POPOVER);
  expect(await test.page.textContent(SELECTOR_OPEN_STATUS)).toBe('open', message);
};

const expectPopoverToBeClosed = async(message: string) => {
  await test.page.waitForSelector(SELECTOR_POPOVER, {state: 'detached'});
  expect(await test.page.textContent(SELECTOR_OPEN_STATUS)).toBe('closed', message);
};

const openPopover = async(message: string) => {
  await test.page.click('button[ngbPopover]');
  await expectPopoverToBeOpen(message);
};

describe('Popover Autoclose', () => {

  beforeEach(async() => await openUrl('popover/autoclose', 'h3:text("Popover autoclose")'));

  it(`should not close popover on right clicks`, async() => {
    await openPopover(`Opening popover for right clicks`);

    await rightClickInside();
    await expectPopoverToBeOpen(`Popover should stay visible when right-clicking inside`);

    await rightClickOutside();
    await expectPopoverToBeOpen(`Popover should stay visible when right-clicking outside`);
  });

  it(`should work when autoClose === true`, async() => {
    await selectAutoClose('true');

    // escape
    await openPopover(`Opening popover for escape`);
    await sendKey('Escape');
    await expectPopoverToBeClosed(`Popover should be closed on ESC`);

    // outside click
    await openPopover(`Opening popover for outside click`);
    await clickOutside();
    await expectPopoverToBeClosed(`Popover should be closed on outside click`);

    // inside click
    await openPopover(`Opening popover for inside click`);
    await clickInside();
    await expectPopoverToBeClosed(`Popover should be closed on inside click`);
  });

  it(`should work when autoClose === false`, async() => {
    await selectAutoClose('false');

    // escape
    await openPopover(`Opening popover for escape`);
    await sendKey('Escape');
    await expectPopoverToBeOpen(`Popover should NOT be closed on ESC`);

    // outside click
    await clickOutside();
    await expectPopoverToBeOpen(`Popover should NOT be closed on outside click`);

    // inside click
    await clickInside();
    await expectPopoverToBeOpen(`Popover should NOT be closed on inside click`);
  });

  it(`should work when autoClose === 'outside'`, async() => {
    await selectAutoClose('outside');

    // escape
    await openPopover(`Opening popover for escape`);
    await sendKey('Escape');
    await expectPopoverToBeClosed(`Popover should be closed on ESC`);

    // outside click
    await openPopover(`Opening popover for outside click`);
    await clickOutside();
    await expectPopoverToBeClosed(`Popover should be closed on outside click`);

    // inside click
    await openPopover(`Opening popover for inside click`);
    await clickInside();
    await expectPopoverToBeOpen(`Popover should NOT be closed on inside click`);
  });

  it(`should work when autoClose === 'inside'`, async() => {
    await selectAutoClose('inside');

    // escape
    await openPopover(`Opening popover for escape`);
    await sendKey('Escape');
    await expectPopoverToBeClosed(`Popover should be closed on ESC`);

    // outside click
    await openPopover(`Opening popover for outside click`);
    await clickOutside();
    await expectPopoverToBeOpen(`Popover should NOT be closed on outside click`);

    // inside click
    await clickInside();
    await expectPopoverToBeClosed(`Popover should be closed on inside click`);
  });
});

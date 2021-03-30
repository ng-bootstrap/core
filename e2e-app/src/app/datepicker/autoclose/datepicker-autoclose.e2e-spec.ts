import {test} from '../../../../playwright.conf';
import {openUrl, sendKey} from '../../tools.po';
import {
  clickOutside,
  closeDatepicker,
  expectDatepickerToBeClosed,
  expectDatepickerToBeOpen,
  openDatepicker,
  rightClickOutside,
  selectAutoClose,
  selectDisplayMonths
} from './datepicker-autoclose.po';
import {clickOnDay, rightClickOnDay} from '../datepicker.po';

describe('Datepicker Autoclose', () => {

  for (let displayMonths of[1, 2]) {
    describe(`displayMonths = ${displayMonths}`, () => {

      beforeEach(async() => {
        await openUrl('datepicker/autoclose', 'h3:text("Datepicker autoclose")');
        await selectDisplayMonths(displayMonths);
      });

      const DATE_SELECT = new Date(2018, 7, 1);
      const DATE_OUTSIDE_BEFORE = new Date(2018, 6, 31);
      const DATE_OUTSIDE_AFTER = displayMonths === 1 ? new Date(2018, 6, 31) : new Date(2018, 9, 1);

      it(`should not close when right clicking`, async() => {
        await selectAutoClose('true');
        await openDatepicker(`Opening datepicker for right click test`);
        await rightClickOnDay(DATE_SELECT);
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on right click inside`);
        await rightClickOutside();
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on right click outside`);
      });

      it(`should work when autoClose === true`, async() => {
        await selectAutoClose('true');

        // escape
        await openDatepicker(`Opening datepicker for escape`);
        await test.page.keyboard.press('Escape');
        await expectDatepickerToBeClosed(`Datepicker should be closed on ESC`);

        // outside click
        await openDatepicker(`Opening datepicker for outside click`);
        await clickOutside();
        await expectDatepickerToBeClosed(`Datepicker should be closed on outside click`);

        // date selection
        await openDatepicker(`Opening datepicker for date selection`);
        await clickOnDay(DATE_SELECT);
        await expectDatepickerToBeClosed(`Datepicker should be closed on date selection`);

        // outside days click -> month before
        await openDatepicker(`Opening datepicker for outside days click -> month before`);
        await clickOnDay(DATE_OUTSIDE_BEFORE);
        await expectDatepickerToBeClosed(`Datepicker should be closed on outside day click`);

        // outside days click -> month after
        await openDatepicker(`Opening datepicker for outside days click -> month after`);
        await clickOnDay(DATE_OUTSIDE_AFTER);
        await expectDatepickerToBeClosed(`Datepicker should be closed on outside day click`);
      });

      it(`should work when autoClose === false`, async() => {
        await selectAutoClose('false');

        // escape
        await openDatepicker(`Opening datepicker`);
        await sendKey('Escape');
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on ESC`);

        // outside click
        await clickOutside();
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on outside click`);

        // date selection
        await clickOnDay(DATE_SELECT);
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on date selection`);

        // outside days click -> month before
        await clickOnDay(DATE_OUTSIDE_BEFORE);
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on outside day click`);

        // outside days click -> month after
        await closeDatepicker(`Closing datepicker`);
        await openDatepicker(`Reopening datepicker`);  // to reset visible month
        await clickOnDay(DATE_OUTSIDE_AFTER);
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on outside day click`);
      });

      it(`should work when autoClose === 'outside'`, async() => {
        await selectAutoClose('outside');

        // escape
        await openDatepicker(`Opening datepicker for escape`);
        await sendKey('Escape');
        await expectDatepickerToBeClosed(`Datepicker should be closed on ESC`);

        // outside click
        await openDatepicker(`Opening datepicker for outside click`);
        await clickOutside();
        await expectDatepickerToBeClosed(`Datepicker should be closed on outside click`);

        // date selection
        await openDatepicker(`Opening datepicker for date selection`);
        await clickOnDay(DATE_SELECT);
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on date selection`);

        // outside days click -> month before
        await clickOnDay(DATE_OUTSIDE_BEFORE);
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on outside day click`);

        // outside days click -> month after
        await closeDatepicker(`Closing datepicker`);
        await openDatepicker(`Reopening datepicker`);  // to reset visible month
        await clickOnDay(DATE_OUTSIDE_AFTER);
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on outside day click`);
      });

      it(`should work when autoClose === 'inside'`, async() => {
        await selectAutoClose('inside');

        // escape
        await openDatepicker(`Opening datepicker for escape`);
        await sendKey('Escape');
        await expectDatepickerToBeClosed(`Datepicker should be closed on ESC`);

        // outside click
        await openDatepicker(`Opening datepicker for outside click`);
        await clickOutside();
        await expectDatepickerToBeOpen(`Datepicker should NOT be closed on outside click`);

        // date selection
        await clickOnDay(DATE_SELECT);
        await expectDatepickerToBeClosed(`Datepicker should be closed on date selection`);

        // outside days click -> month before
        await openDatepicker(`Opening datepicker for outside days click -> month before`);
        await clickOnDay(DATE_OUTSIDE_BEFORE);
        await expectDatepickerToBeClosed(`Datepicker should be closed on outside day click`);

        // outside days click -> month after
        await openDatepicker(`Opening datepicker for outside days click -> month after`);
        await clickOnDay(DATE_OUTSIDE_AFTER);
        await expectDatepickerToBeClosed(`Datepicker should be closed on outside day click`);
      });
    });
  }
});

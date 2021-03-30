import {focusElement, openUrl} from '../../tools.po';
import {expectTooltipToBeClosed, expectTooltipToBeOpen} from '../tooltip.po';

describe('Tooltip Focus', () => {

  beforeEach(async() => await openUrl('tooltip/focus', 'h3:text("Tooltip focus")'));

  it(`should work when triggers === 'focus'`, async() => {
    // focusin to show
    await focusElement('#btn-tooltip');
    await expectTooltipToBeOpen(`Tooltip should be visible when tooltip button gains focus`);

    // focusout to hide
    await focusElement('#btn-after');
    await expectTooltipToBeClosed(`Tooltip should not be visible when tooltip button looses focus`);
  });
});

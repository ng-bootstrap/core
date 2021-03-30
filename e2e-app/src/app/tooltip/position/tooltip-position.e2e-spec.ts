import {getBoundingBox, openUrl} from '../../tools.po';
import {test} from '../../../../playwright.conf';
import {SELECTOR_TOOLTIP} from '../tooltip.po';

const selectPosition = async(position: string) => await test.page.click(`#flex-${position}`);

describe('Tooltip Position', () => {

  const expectTooltipsPosition = async(type: string, expectedPlacement: string, excludedPlacements: string[] = []) => {

    const SELECTOR_BUTTON = `#btn-${type}`;
    await test.page.click(SELECTOR_BUTTON);

    const btnBox = await getBoundingBox(SELECTOR_BUTTON);
    const tooltipBox = await getBoundingBox(SELECTOR_TOOLTIP);

    let [primary, secondary] = expectedPlacement.split('-');
    const classNames = await test.page.getAttribute(SELECTOR_TOOLTIP, 'class');
    expect(classNames).toContain(`bs-tooltip-${primary}`, 'Missing primary class');
    if (secondary) {
      expect(classNames).toContain(`bs-tooltip-${primary}-${secondary}`, 'Missing secondary class');
    }

    excludedPlacements.forEach(
        (placement) => { expect(classNames).not.toContain(`bs-tooltip-${placement}`, 'Unexpected class'); });

    let yDiff = 0, xDiff = 0;

    if (primary === 'top') {
      yDiff = (tooltipBox.y + tooltipBox.height) - btnBox.y;
      if (secondary === 'left') {
        xDiff = tooltipBox.x - btnBox.x;
      } else if (secondary === 'right') {
        xDiff = (tooltipBox.x + tooltipBox.width) - (btnBox.x + btnBox.width);
      } else {
        xDiff = (tooltipBox.x + tooltipBox.width / 2) - (btnBox.x + (btnBox.width / 2));
      }
    }

    if (primary === 'left') {
      yDiff = (tooltipBox.y + tooltipBox.height / 2) - (btnBox.y + btnBox.height / 2);
      xDiff = (tooltipBox.x + tooltipBox.width) - btnBox.x;
    }

    if (primary === 'right') {
      yDiff = (tooltipBox.y + tooltipBox.height / 2) - (btnBox.y + btnBox.height / 2);
      xDiff = tooltipBox.x - (btnBox.x + btnBox.width);
    }


    expect(Math.abs(yDiff))
        .toBeLessThanOrEqual(1, `Tooltip top positionning for expected placement '${expectedPlacement}'`);
    expect(Math.abs(xDiff))
        .toBeLessThanOrEqual(1, `Tooltip left positionning for expected placement '${expectedPlacement}'`);

    // Close the tooltip
    await test.page.click(SELECTOR_BUTTON);
  };

  beforeEach(async() => await openUrl('tooltip/position', 'h3:text("Tooltip positioning")'));

  it(`should be well positioned on the left edge`, async() => {
    await selectPosition('left');
    await expectTooltipsPosition('normal', 'right');
    await expectTooltipsPosition('innerHtml', 'top-left');
    await expectTooltipsPosition('body-off', 'right');
    await expectTooltipsPosition('fixed', 'top-left');
  });

  it(`should be well positioned on the center`, async() => {
    await selectPosition('center');
    await expectTooltipsPosition('normal', 'top');
    await expectTooltipsPosition('innerHtml', 'top');
    await expectTooltipsPosition('body-off', 'top');
    await expectTooltipsPosition('fixed', 'top');
  });

  it(`should be well positioned on the right edge`, async() => {
    await selectPosition('right');
    await expectTooltipsPosition('normal', 'left');
    await expectTooltipsPosition('innerHtml', 'top-right');
    await expectTooltipsPosition('body-off', 'left');
    await expectTooltipsPosition('fixed', 'top-right');
  });

  it(`should be positioned at the first placement by default`, async() => {
    await selectPosition('left');
    await expectTooltipsPosition('default', 'left', ['left-bottom']);
  });

});

import {openUrl} from '../../tools.po';
import {TooltipPositionPage as TooltipPositionPage} from './tooltip-position.po';

const roundLocation = function(location) {
  location.x = Math.round(location.x);
  location.y = Math.round(location.y);

  return location;
};

describe('Tooltip Position', () => {
  let page: TooltipPositionPage;

  const expectTooltipsPosition = async(type: string, expectedPlacement: string, excludedPlacements: string[] = []) => {


    const btn = page.getTooltipButton(type);
    await btn.click();
    const btnLocation = roundLocation(await btn.getLocation());
    const btnSize = await btn.getSize();
    const tooltip = page.getTooltip();
    const tooltipLocation = roundLocation(await tooltip.getLocation());
    const tooltipSize = await tooltip.getSize();

    let [primary, secondary] = expectedPlacement.split('-');
    const classname = await tooltip.getAttribute('class');
    expect(classname).toContain(`bs-tooltip-${primary}`, 'Missing primary class');
    if (secondary) {
      expect(classname).toContain(`bs-tooltip-${primary}-${secondary}`, 'Missing secondary class');
    }

    excludedPlacements.forEach(
        (placement) => { expect(classname).not.toContain(`bs-tooltip-${placement}`, 'Unexpected class'); });

    let yDiff = 0, xDiff = 0;

    if (primary === 'top') {
      yDiff = (tooltipLocation.y + tooltipSize.height) - btnLocation.y;
      if (secondary === 'left') {
        xDiff = tooltipLocation.x - btnLocation.x;
      } else if (secondary === 'right') {
        xDiff = (tooltipLocation.x + tooltipSize.width) - (btnLocation.x + btnSize.width);
      } else {
        xDiff = (tooltipLocation.x + tooltipSize.width / 2) - (btnLocation.x + (btnSize.width / 2));
      }
    }

    if (primary === 'left') {
      yDiff = (tooltipLocation.y + tooltipSize.height / 2) - (btnLocation.y + btnSize.height / 2);
      xDiff = (tooltipLocation.x + tooltipSize.width) - btnLocation.x;
    }

    if (primary === 'right') {
      yDiff = (tooltipLocation.y + tooltipSize.height / 2) - (btnLocation.y + btnSize.height / 2);
      xDiff = tooltipLocation.x - (btnLocation.x + btnSize.width);
    }


    expect(Math.abs(yDiff))
        .toBeLessThanOrEqual(1, `Tooltip top positionning for expected placement '${expectedPlacement}'`);
    expect(Math.abs(xDiff))
        .toBeLessThanOrEqual(1, `Tooltip left positionning for expected placement '${expectedPlacement}'`);

    // Close the tooltip
    await btn.click();
  };

  beforeAll(() => page = new TooltipPositionPage());

  ['on', 'off'].forEach((gpuSelector: 'on' | 'off') => {
    describe(`positioning tests when gpu is ${gpuSelector}`, () => {
      beforeEach(async() => {
        await openUrl('tooltip/position');
        await page.getGpuButton(gpuSelector).click();
      });

      it(`should be well positionned on the left edge`, async() => {
        await page.selectPosition('left');
        await expectTooltipsPosition('normal', 'right');
        await expectTooltipsPosition('innerHtml', 'top-left');
        await expectTooltipsPosition('body', 'right');
        await expectTooltipsPosition('innerHtml-body', 'top-left');
        await expectTooltipsPosition('fixed', 'top-left');
      });

      it(`should be well positionned on the center`, async() => {
        await page.selectPosition('center');
        await expectTooltipsPosition('normal', 'top');
        await expectTooltipsPosition('innerHtml', 'top');
        await expectTooltipsPosition('body', 'top');
        await expectTooltipsPosition('innerHtml-body', 'top');
        await expectTooltipsPosition('fixed', 'top');
      });

      it(`should be well positionned on the right edge`, async() => {
        await page.selectPosition('right');
        await expectTooltipsPosition('normal', 'left');
        await expectTooltipsPosition('innerHtml', 'top-right');
        await expectTooltipsPosition('body', 'left');
        await expectTooltipsPosition('innerHtml-body', 'top-right');
        await expectTooltipsPosition('fixed', 'top-right');
      });

      it(`should be positionned at the first placement by default`, async() => {
        await page.selectPosition('left');
        await expectTooltipsPosition('default', 'left', ['left-bottom']);
      });
    });

  });


});

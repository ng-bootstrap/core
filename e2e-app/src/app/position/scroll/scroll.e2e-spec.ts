import {openUrl} from '../../tools.po';
import {ScrollPage} from './scroll.po';

const roundLocation = function(location) {
  location.x = Math.round(location.x);
  location.y = Math.round(location.y);

  return location;
};

const popoverMarginBottom = 8;

describe('Scroll', () => {

  let page: ScrollPage;

  const expectPositionOnTop = async(btn, popupElement, offset = 0) => {
    const btnLocation = roundLocation(await btn.getLocation());
    const btnSize = await btn.getSize();
    const popupLocation = roundLocation(await popupElement.getLocation());
    const popupSize = await popupElement.getSize();

    const yDiff = (popupLocation.y + popupSize.height) - btnLocation.y + offset;
    const xDiff = (popupLocation.x + popupSize.width / 2) - (btnLocation.x + (btnSize.width / 2));

    expect(Math.abs(yDiff)).toBeLessThanOrEqual(1, `Popup top positionning`);
    expect(Math.abs(xDiff)).toBeLessThanOrEqual(1, `Popup left positionning`);

  };

  beforeAll(() => page = new ScrollPage());

  beforeEach(async() => await openUrl('position/scroll'));

  describe('Tooltip', () => {

    it(`move with the target (first parent scrolled, container = null)`, async() => {

      const tooltipButton = page.getButton('tooltip');
      await tooltipButton.click();
      const tooltip = page.getPopup('tooltip');

      await expectPositionOnTop(tooltipButton, tooltip);
      await page.scrollElement('inner-container', 50);
      await expectPositionOnTop(tooltipButton, tooltip);

    });

    it(`move with the target (first parent scrolled, container = body)`, async() => {

      await page.selectContainer('body');

      const tooltipButton = page.getButton('tooltip');
      await tooltipButton.click();
      const tooltip = page.getPopup('tooltip');

      await expectPositionOnTop(tooltipButton, tooltip);
      await page.scrollElement('inner-container', 50);
      await expectPositionOnTop(tooltipButton, tooltip);

    });

    it(`move with the target (second parent scrolled, container = null)`, async() => {

      const tooltipButton = page.getButton('tooltip');
      await tooltipButton.click();
      const tooltip = page.getPopup('tooltip');

      await expectPositionOnTop(tooltipButton, tooltip);
      await page.scrollElement('outer-container', 50);
      await expectPositionOnTop(tooltipButton, tooltip);

    });

    it(`move with the target (second parent scrolled, container = body)`, async() => {

      await page.selectContainer('body');

      const tooltipButton = page.getButton('tooltip');
      await tooltipButton.click();
      const tooltip = page.getPopup('tooltip');

      await expectPositionOnTop(tooltipButton, tooltip);
      await page.scrollElement('outer-container', 50);
      await expectPositionOnTop(tooltipButton, tooltip);

    });


  });

  describe('Popover', () => {

    it(`move with the target (first parent scrolled, container = null)`, async() => {

      const popoverButton = page.getButton('popover');
      await popoverButton.click();
      const popover = page.getPopup('popover');

      await expectPositionOnTop(popoverButton, popover, popoverMarginBottom);
      await page.scrollElement('inner-container', 50);
      await expectPositionOnTop(popoverButton, popover, popoverMarginBottom);


    });

    it(`move with the target (first parent scrolled, container = body)`, async() => {
      await page.selectContainer('body');

      const popoverButton = page.getButton('popover');
      await popoverButton.click();
      const popover = page.getPopup('popover');

      await expectPositionOnTop(popoverButton, popover, popoverMarginBottom);
      await page.scrollElement('inner-container', 50);
      await expectPositionOnTop(popoverButton, popover, popoverMarginBottom);

    });

    it(`move with the target (second parent scrolled, container = null)`, async() => {

      const popoverButton = page.getButton('popover');
      await popoverButton.click();
      const popover = page.getPopup('popover');

      await expectPositionOnTop(popoverButton, popover, popoverMarginBottom);
      await page.scrollElement('outer-container', 50);
      await expectPositionOnTop(popoverButton, popover, popoverMarginBottom);


    });

    it(`move with the target (second parent scrolled, container = body)`, async() => {
      await page.selectContainer('body');

      const popoverButton = page.getButton('popover');
      await popoverButton.click();
      const popover = page.getPopup('popover');

      await expectPositionOnTop(popoverButton, popover, popoverMarginBottom);
      await page.scrollElement('outer-container', 50);
      await expectPositionOnTop(popoverButton, popover, popoverMarginBottom);

    });

  });

});

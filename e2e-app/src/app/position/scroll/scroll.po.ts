import {$, browser} from 'protractor';

export class ScrollPage {
  getButton(type: 'tooltip' | 'popover') { return $(`#${type}-target`); }

  getPopup(type: 'tooltip' | 'popover') { return $(`ngb-${type}-window`); }

  async scrollElement(elementId: string, elementScrollY) {
    await browser.executeScript(function(id, scrollY = 0) {
      // Scroll to given position
      document.getElementById(id) !.scrollTo(0, scrollY);
    }, elementId, elementScrollY);
  }

  async selectContainer(container: null | 'body') { await $(`#container-${container}`).click(); }
}

import {$} from 'protractor';

export class TooltipPositionPage {
  getTooltip() { return $('ngb-tooltip-window'); }

  getTooltipButton(type: string) { return $(`#btn-${type}`); }

  getGpuButton(type: 'on' | 'off') { return $(`#gpu-${type}`); }

  async selectPosition(position: string) { await $(`#flex-${position}`).click(); }
}

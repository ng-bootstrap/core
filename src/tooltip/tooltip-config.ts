import {Injectable} from '@angular/core';
import {PlacementArray} from '../util/positioning';

/**
 * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
@Injectable({providedIn: 'root'})
export class NgbTooltipConfig {
  autoClose: boolean | 'inside' | 'outside' = true;
  placement: PlacementArray = 'auto';
  triggers = 'hover focus';
  container: string;
  disableTooltip = false;
  tooltipClass: string;
  openDelay = 0;
  closeDelay = 0;
  focusoutCloseDelay = 10;
  mouseleaveCloseDelay = 100;
}

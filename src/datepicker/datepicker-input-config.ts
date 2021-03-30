import {Injectable} from '@angular/core';

import {NgbDatepickerConfig} from './datepicker-config';
import {PlacementArray} from '../util/positioning';

/**
 * A configuration service for the [`NgbDatepickerInput`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepicker inputs used in the application.
 *
 * @since 5.2.0
 */
@Injectable({providedIn: 'root'})
export class NgbInputDatepickerConfig extends NgbDatepickerConfig {
  autoClose: boolean | 'inside' | 'outside' = true;
  container: null | 'body';
  positionTarget: string | HTMLElement;
  placement: PlacementArray = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
  restoreFocus: true | HTMLElement | string = true;
}

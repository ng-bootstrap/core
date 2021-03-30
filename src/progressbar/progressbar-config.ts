import {Injectable} from '@angular/core';

/**
 * A configuration service for the [`NgbProgressbar`](#/components/progressbar/api#NgbProgressbar) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
@Injectable({providedIn: 'root'})
export class NgbProgressbarConfig {
  max = 100;
  animated = false;
  striped = false;
  textType: string;
  type: string;
  showValue = false;
  height: string;
}

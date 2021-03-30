import {Injectable} from '@angular/core';
import {PlacementArray} from '../util/positioning';
import {NgbConfig} from '../ngb-config';

/**
 * A configuration service for the [`NgbPopover`](#/components/popover/api#NgbPopover) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the popovers used in the application.
 */
@Injectable({providedIn: 'root'})
export class NgbPopoverConfig {
  autoClose: boolean | 'inside' | 'outside' = true;
  placement: PlacementArray = 'auto';
  triggers = 'click';
  container: string;
  disablePopover = false;
  popoverClass: string;
  openDelay = 0;
  closeDelay = 0;

  private _animation: boolean;

  constructor(private _ngbConfig: NgbConfig) {}

  get animation(): boolean { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; }
  set animation(animation: boolean) { this._animation = animation; }
}

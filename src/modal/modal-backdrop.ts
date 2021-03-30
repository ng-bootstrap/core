import {Component, ElementRef, Input, NgZone, OnInit, ViewEncapsulation} from '@angular/core';

import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {ngbRunTransition} from '../util/transition/ngbTransition';
import {reflow} from '../util/util';

@Component({
  selector: 'ngb-modal-backdrop',
  encapsulation: ViewEncapsulation.None,
  template: '',
  host: {
    '[class]': '"modal-backdrop" + (backdropClass ? " " + backdropClass : "")',
    '[class.show]': '!animation',
    '[class.fade]': 'animation',
    'style': 'z-index: 1050'
  }
})
export class NgbModalBackdrop implements OnInit {
  @Input() animation: boolean;
  @Input() backdropClass: string;

  constructor(private _el: ElementRef<HTMLElement>, private _zone: NgZone) {}

  ngOnInit() {
    this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
      ngbRunTransition(this._zone, this._el.nativeElement, (element: HTMLElement, animation: boolean) => {
        if (animation) {
          reflow(element);
        }
        element.classList.add('show');
      }, {animation: this.animation, runningTransition: 'continue'});
    });
  }

  hide(): Observable<void> {
    return ngbRunTransition(
        this._zone, this._el.nativeElement, ({classList}) => classList.remove('show'),
        {animation: this.animation, runningTransition: 'stop'});
  }
}

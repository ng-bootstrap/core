import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ngbd-accordion-header',
  templateUrl: './accordion-header.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .card.disabled {
      opacity: 0.5;
    }
  `]
})
export class NgbdAccordionHeader {
  disabled = false;
}

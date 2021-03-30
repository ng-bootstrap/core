import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'a[ngbdFragment]',
  host: {
    '[class.title-fragment]': 'true',
    '[attr.id]': 'fragment'
  }
})
export class NgbdFragment {
  @Input() fragment: string;
}

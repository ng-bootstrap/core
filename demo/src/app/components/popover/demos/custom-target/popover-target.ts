import {Component, HostListener, ViewChild} from '@angular/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-popover-target',
  templateUrl: './popover-target.html'
})
export class NgbdPopoverTarget {
  @ViewChild(NgbPopover, {static: false}) popover: NgbPopover;

  @HostListener('mouseover', ['$event.target'])
  onMouseOver(el: HTMLAnchorElement) {
    if (el.dataset.description) {
      if (this.popover.isOpen() && this.popover.target !== el) {
        this.popover.close();
      }
      this.popover.target = el;
      this.popover.open({text: el.dataset.description, href: el.href});
    }
  }
}

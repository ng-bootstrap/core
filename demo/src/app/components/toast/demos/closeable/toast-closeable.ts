import {Component} from '@angular/core';

@Component({selector: 'ngbd-toast-closeable', templateUrl: './toast-closeable.html'})

export class NgbdToastCloseable {
  show = true;

  close() {
    this.show = false;
    setTimeout(() => this.show = true, 3000);
  }
}
